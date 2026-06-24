// src/app/checkout/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext"; 
import { Banknote, Truck, Store, CreditCard, CheckCircle } from "lucide-react";
import { validateLuhn, getCardType } from "@/utils/cardUtils";
import CreditCardForm from "@/components/CreditCardForm";
import CheckoutSummary from "@/components/CheckoutSummary";
import { CHILE_DATA } from "@/data/regiones";

interface SavedCard {
  id: string;
  brand: "visa" | "mastercard" | "amex" | "unknown";
  lastFour: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user } = useUser(); 

  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">("delivery");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash">("card");

  // Estado para la casilla de autocompletar
  const [useProfileData, setUseProfileData] = useState(false);

  // Estados de Dirección
  const [address, setAddress] = useState("");
  const [apt, setApt] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [availableComunas, setAvailableComunas] = useState<string[]>([]);
  
  // Estados de Nombre
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Estados de Correo
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);

  // Estados de Tarjeta y Gestión
  const [savedCards, setSavedCards] = useState<SavedCard[]>([]);
  const [isAddingNewCard, setIsAddingNewCard] = useState(true);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardBrand, setCardBrand] = useState<"visa" | "mastercard" | "amex" | "unknown">("unknown");
  const [isCardValid, setIsCardValid] = useState<boolean | null>(null);

  const nameRegex = /^[a-zA-ZÀ-ÿ\s]*$/;

  // Lógica de Autocompletado
  const handleAutofillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setUseProfileData(isChecked);

    if (isChecked && user) {
      // Si marca la casilla, llenamos los datos con la info de la cuenta
      setFirstName(user.name || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setIsEmailValid(true); // Asumimos que el correo de la cuenta es válido
    } else {
      // Si desmarca la casilla, limpiamos para que pueda escribir otros datos
      setFirstName("");
      setLastName("");
      setEmail("");
      setIsEmailValid(null);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (nameRegex.test(e.target.value)) setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (nameRegex.test(e.target.value)) setLastName(e.target.value);
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(value === "" ? null : emailRegex.test(value));
  };

  // --- LÓGICA FINAL DE PAGO CONEXIÓN A MONGODB ---
  const handlePayment = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Validaciones
    if (!firstName || !lastName || !email || !emailRegex.test(email)) {
      alert("Por favor, completa tus datos de contacto correctamente.");
      return;
    }
    if (deliveryMethod === "delivery" && (!address || !selectedRegion)) {
      alert("Por favor, completa tu dirección de envío y región.");
      return;
    }
    if (paymentMethod === "card" && savedCards.length === 0) {
      alert("Por favor, agrega una tarjeta de crédito válida.");
      return;
    }

    const orderId = `ELZ-${Math.floor(100000 + Math.random() * 900000)}`;
    const shippingCost = deliveryMethod === "delivery" ? 3100 : 0; 
    const finalTotal = totalPrice + shippingCost;

    const orderData = {
      orderId,
      userId: user ? user.id : undefined,
      customer: {
        name: `${firstName} ${lastName}`,
        email: email,
      },
      delivery: {
        method: deliveryMethod,
        address: deliveryMethod === "delivery" ? `${address} ${apt}, ${selectedRegion}` : "Retiro en tienda",
      },
      payment: {
        method: paymentMethod,
        cardInfo: paymentMethod === "card" && savedCards.length > 0 
          ? `${savedCards[0].brand} terminada en ${savedCards[0].lastFour}` 
          : "Efectivo",
      },
      items: cartItems,
      total: finalTotal,
      date: new Date().toLocaleDateString(),
    };

    try {
      // 1. ENVIAMOS LOS DATOS A MONGODB A TRAVÉS DE LA API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Error al guardar en la base de datos");
      }

      // 2. GUARDAMOS EN SESSION STORAGE PARA LA PÁGINA SUCCESS
      sessionStorage.setItem("lastOrder", JSON.stringify(orderData));

      // 3. REDIRIGIMOS
      router.push(`/checkout/success`);

      // 4. LIMPIAMOS EL CARRITO
      setTimeout(() => {
        clearCart();
      }, 100);

    } catch (error) {
      console.error("Error en el proceso de pago:", error);
      alert("Hubo un problema al procesar tu pedido. Por favor, revisa tu conexión e intenta de nuevo.");
    }
  };

  const handleSaveCard = () => {
    if (isCardValid && cardNumber.length > 0 && cardName && cardExpiry) {
      const newCard: SavedCard = {
        id: Date.now().toString(),
        brand: cardBrand,
        lastFour: cardNumber.replace(/\s/g, "").slice(-4),
      };
      setSavedCards([newCard]);
      setIsAddingNewCard(false);
    } else {
      alert("Por favor, ingresa una tarjeta válida");
    }
  };

  useEffect(() => {
    if (Array.isArray(CHILE_DATA)) {
      const regionData = CHILE_DATA.find((r) => r.region === selectedRegion);
      setAvailableComunas(regionData ? regionData.comunas : []);
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (deliveryMethod === "delivery") {
      setPaymentMethod("card");
    }
  }, [deliveryMethod]);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const maxLength = cardBrand === "amex" ? 15 : 16;
    const trimmed = rawValue.substring(0, maxLength);
    const brand = getCardType(trimmed);
    setCardBrand(brand);
    const parts = [];
    for (let i = 0; i < trimmed.length; i += 4) parts.push(trimmed.substring(i, i + 4));
    setCardNumber(parts.join(" "));
    setIsCardValid(trimmed.length === maxLength ? validateLuhn(trimmed) : null);
  };

  const handleCardBlur = () => {
    const clean = cardNumber.replace(/\s+/g, "");
    if (clean.length >= 13) setIsCardValid(validateLuhn(clean));
    else if (clean.length > 0) setIsCardValid(false);
  };

  const handleExpiryChange = (value: string, type: 'month' | 'year') => {
    const [month, year] = cardExpiry.split('/');
    if (type === 'month') setCardExpiry(`${value}/${year || ''}`);
    else setCardExpiry(`${month || ''}/${value}`);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, "");
    const maxDigits = cardBrand === "amex" ? 4 : 3;
    setCardCvv(input.substring(0, maxDigits));
  };

  const handleCardNameChange = (value: string) => {
    if (nameRegex.test(value)) setCardName(value);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
        <Link href="/" className="bg-black text-white px-8 py-4 rounded-md font-bold hover:bg-gray-800 transition">Volver a la tienda</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans text-gray-800">
      <div className="w-full lg:w-[55%] xl:w-[60%] bg-white p-6 lg:p-12 xl:pl-[15%] pt-10">
        <div className="mb-8 flex justify-center lg:justify-start">
           <Image src="/Logo_Elizee_6.webp" alt="Elizze Logo" width={140} height={50} className="object-contain" />
        </div>

        <section className="mb-10">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-xl font-bold">Contacto</h2>
          </div>
          
          {/* CASILLA DE AUTOCOMPLETADO SÓLO PARA USUARIOS LOGUEADOS */}
          {user && (
            <label className="flex items-center gap-2 mb-4 cursor-pointer w-max">
              <input 
                type="checkbox" 
                checked={useProfileData}
                onChange={handleAutofillChange}
                className="w-4 h-4 accent-black cursor-pointer"
              />
              <span className="text-sm text-gray-600 hover:text-black transition-colors select-none">
                Autocompletar con mis datos de cuenta
              </span>
            </label>
          )}

          <input 
             type="email" 
             value={email}
             onChange={(e) => {
               setEmail(e.target.value);
               if (useProfileData) setUseProfileData(false); // Desmarca si edita manual
             }}
             onBlur={handleEmailBlur}
             placeholder="Correo electrónico" 
             className={`w-full border rounded-md p-3 text-sm focus:ring-2 outline-none mb-3 ${
                isEmailValid === false ? "border-red-400 focus:ring-red-200" : "border-gray-300 focus:ring-black"
             }`} 
          />
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Entrega</h2>
          <div className="bg-gray-100 p-1 rounded-lg flex mb-6">
            <button onClick={() => setDeliveryMethod("delivery")} className={`flex-1 py-3 rounded-md text-sm font-semibold transition ${deliveryMethod === "delivery" ? "bg-white shadow-sm" : "text-gray-500"}`}><Truck className="w-4 h-4 inline-block mr-2" /> Envío</button>
            <button onClick={() => setDeliveryMethod("pickup")} className={`flex-1 py-3 rounded-md text-sm font-semibold transition ${deliveryMethod === "pickup" ? "bg-white shadow-sm" : "text-gray-500"}`}><Store className="w-4 h-4 inline-block mr-2" /> Retiro</button>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <input 
              type="text" 
              value={firstName} 
              onChange={(e) => {
                handleNameChange(e);
                if (useProfileData) setUseProfileData(false);
              }} 
              placeholder="Nombre" 
              className="w-full border border-gray-300 rounded-md p-3 text-sm outline-none focus:ring-1 focus:ring-black focus:border-black" 
            />
            <input 
              type="text" 
              value={lastName} 
              onChange={(e) => {
                handleLastNameChange(e);
                if (useProfileData) setUseProfileData(false);
              }} 
              placeholder="Apellidos" 
              className="w-full border border-gray-300 rounded-md p-3 text-sm outline-none focus:ring-1 focus:ring-black focus:border-black" 
            />
          </div>

          {deliveryMethod === "delivery" ? (
            <div className="space-y-3 animate-in fade-in duration-300">
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Dirección" className="w-full border border-gray-300 rounded-md p-3 text-sm outline-none focus:ring-1 focus:ring-black focus:border-black" />
              <input type="text" value={apt} onChange={(e) => setApt(e.target.value)} placeholder="Casa, apartamento, etc. (opcional)" className="w-full border border-gray-300 rounded-md p-3 text-sm outline-none focus:ring-1 focus:ring-black focus:border-black" />
              <div className="grid grid-cols-2 gap-3">
                <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} className="w-full border border-gray-300 rounded-md p-3 text-sm bg-white focus:ring-1 focus:ring-black focus:border-black outline-none">
                  <option value="">Región</option>
                  {CHILE_DATA.map(r => <option key={r.region} value={r.region}>{r.region}</option>)}
                </select>
                <select disabled={!selectedRegion} className="w-full border border-gray-300 rounded-md p-3 text-sm bg-white disabled:bg-gray-100 focus:ring-1 focus:ring-black focus:border-black outline-none">
                  <option value="">Comuna</option>
                  {availableComunas.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          ) : (
            <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
              <p className="text-sm font-semibold">Retira en nuestra tienda matriz</p>
              <p className="text-sm text-gray-500 mt-1">Av. Providencia 1234, Local 5, Santiago.</p>
            </div>
          )}
        </section>

        <section className="mb-10 pb-10">
          <h2 className="text-xl font-bold mb-2">Pago</h2>
          <div className="border border-gray-300 rounded-md overflow-hidden bg-white">
            <label className={`flex items-center p-4 cursor-pointer ${paymentMethod === "card" ? "bg-gray-50 border-b border-gray-300" : ""}`}>
              <input type="radio" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} className="mr-4 accent-black" />
              <div className="flex-1 flex justify-between">
                <span>Tarjeta de crédito o débito</span>
                <CreditCard className="w-5 h-5 text-gray-500" />
              </div>
            </label>
            
            {paymentMethod === "card" && (
              isAddingNewCard ? (
                <CreditCardForm
                  cardNumber={cardNumber} cardBrand={cardBrand} isCardValid={isCardValid}
                  cardExpiry={cardExpiry} cardCvv={cardCvv} cardName={cardName}
                  onCardNumberChange={handleCardNumberChange} onCardBlur={handleCardBlur}
                  onExpiryChange={handleExpiryChange} onCvvChange={handleCvvChange}
                  onNameChange={handleCardNameChange} onSave={handleSaveCard}
                />
              ) : (
                <div className="p-4 flex justify-between items-center bg-gray-50 border-t border-gray-300 animate-in fade-in">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-sm font-semibold capitalize">{savedCards[0].brand} •••• {savedCards[0].lastFour}</p>
                  </div>
                  <button onClick={() => setIsAddingNewCard(true)} className="text-sm text-gray-500 underline">Cambiar</button>
                </div>
              )
            )}

            {deliveryMethod === "pickup" && (
              <label className={`flex items-center p-4 cursor-pointer border-t border-gray-300 ${paymentMethod === "cash" ? "bg-gray-50" : "bg-white"}`}>
                <input type="radio" checked={paymentMethod === "cash"} onChange={() => setPaymentMethod("cash")} className="mr-4 accent-black" />
                <span>Efectivo al retirar en tienda</span>
                <Banknote className="w-5 h-5 text-gray-500 ml-auto" />
              </label>
            )}
          </div>
        </section>
      </div>

      <CheckoutSummary deliveryMethod={deliveryMethod} onPayment={handlePayment} />
    </div>
  );
}
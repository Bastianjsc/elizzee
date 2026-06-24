// src/components/CheckoutSummary.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
// 1. Importamos el contexto del usuario
import { useUser } from "@/context/UserContext"; 

interface CheckoutSummaryProps {
  deliveryMethod: "delivery" | "pickup";
  onPayment: () => void; 
}

export default function CheckoutSummary({ deliveryMethod, onPayment }: CheckoutSummaryProps) {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalPrice,
  } = useCart();

  // 2. Extraemos el usuario para saber si hay sesión activa
  const { user } = useUser();

  const formatPrice = (amount: number) => amount.toLocaleString("es-CL");

  // Cálculos
  const originalTotal = cartItems.reduce((acc, item) => acc + item.price * item.cartQuantity, 0);
  const savings = originalTotal - totalPrice;
  const shippingCost = deliveryMethod === "delivery" ? 3100 : 0; 
  const finalTotal = totalPrice + shippingCost;

  return (
    <div className="w-full lg:w-[45%] xl:w-[40%] bg-[#F5F5F5] border-l border-gray-200">
      <div className="lg:sticky lg:top-[130px] lg:h-[calc(100vh-130px)] flex flex-col w-full px-6 lg:px-12 xl:pr-[15%]">
        
        <div className="pt-8 w-full max-w-md mx-auto lg:mx-0 flex-shrink-0 z-10 bg-[#F5F5F5] pb-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-10">
            Resumen de tu pedido
          </h2>
        </div>

        <div className="overflow-y-auto flex-1 custom-scrollbar w-full pb-12 pr-2 pt-2 -mt-2">
          <div className="max-w-md mx-auto lg:mx-0 w-full">
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="relative w-16 h-16 bg-white border border-gray-200 rounded-lg flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover rounded-lg p-1" />
                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full z-10">
                      {item.cartQuantity}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-sm font-semibold">{item.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center border border-gray-300 rounded bg-white h-6">
                        <button onClick={() => decreaseQuantity(item.id)} className="w-6 flex justify-center text-gray-500 hover:text-black">-</button>
                        <span className="text-[10px] w-4 text-center">{item.cartQuantity}</span>
                        <button onClick={() => increaseQuantity(item.id)} disabled={item.cartQuantity >= item.stock} className={`w-6 flex justify-center text-gray-500 hover:text-black ${item.cartQuantity >= item.stock && "opacity-30"}`}>+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} title="Eliminar producto">
                        <Image src="/basura.png" alt="Eliminar" width={18} height={18} className="object-contain opacity-60 hover:opacity-100 transition-opacity" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold">${formatPrice((item.discountPrice || item.price) * item.cartQuantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full h-px bg-gray-300 my-6"></div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${formatPrice(totalPrice)}</span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>Descuentos aplicados</span>
                  <span className="font-semibold">-${formatPrice(savings)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {deliveryMethod === "delivery" ? "Envío ⓘ" : "Retiro en tienda"}
                </span>
                <span className="font-semibold">
                  {deliveryMethod === "delivery" ? `$${formatPrice(shippingCost)}` : "Gratis"}
                </span>
              </div>
            </div>

            <div className="w-full h-px bg-gray-300 my-6"></div>

            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-bold">Total</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-gray-500 font-bold">CLP</span>
                <span className="text-2xl font-bold">${formatPrice(finalTotal)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={onPayment}
                className="w-full bg-black text-white py-4 rounded-md font-bold text-sm hover:bg-gray-800 transition"
              >
                {/* 3. Condición para cambiar el texto del botón */}
                {user ? "Pagar ahora" : "Comprar como invitado"}
              </button>

              <Link href="/" className="block text-center w-full bg-transparent text-blue-600 py-3 text-sm hover:underline transition">
                &lt; Volver a la tienda
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// src/components/CreditCardForm.tsx
"use client";

import React from "react";
import Image from "next/image";
import { Lock, HelpCircle } from "lucide-react";

interface CreditCardFormProps {
  cardNumber: string;
  cardBrand: "visa" | "mastercard" | "amex" | "unknown";
  isCardValid: boolean | null;
  cardExpiry: string; // Formato esperado "MM/AA"
  cardCvv: string;
  cardName: string;
  onCardNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCardBlur: () => void;
  onExpiryChange: (value: string, type: 'month' | 'year') => void;
  onCvvChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNameChange: (value: string) => void;
  onSave: () => void; // NUEVA PROP: Función que se ejecuta al guardar
}

export default function CreditCardForm({
  cardNumber, cardBrand, isCardValid, cardExpiry, cardCvv, cardName,
  onCardNumberChange, onCardBlur, onExpiryChange, onCvvChange, onNameChange,
  onSave // Recibimos la nueva función
}: CreditCardFormProps) {
  
  // Dividimos la fecha actual para los selectores
  const [month, year] = cardExpiry.split('/');

  return (
    <div className="p-4 bg-gray-50 animate-in fade-in slide-in-from-top-2 duration-300 space-y-4">
      {/* Número de Tarjeta */}
      <div>
        <div className="relative">
          <input 
            type="text" 
            value={cardNumber}
            onChange={onCardNumberChange}
            onBlur={onCardBlur}
            placeholder="Número de tarjeta" 
            autoComplete="new-password"
            className={`w-full border rounded-md p-3 text-sm focus:ring-2 focus:outline-none pr-14 bg-white transition-colors ${
              isCardValid === false ? "border-red-400 focus:ring-red-200" : "border-gray-300 focus:ring-black"
            }`} 
          />
          <div className="absolute right-3 top-2.5 w-8 h-6 flex items-center justify-center">
            {cardBrand === "visa" && <Image src="/visa_card.png" alt="Visa" width={32} height={24} />}
            {cardBrand === "mastercard" && <Image src="/master_card.png" alt="Mastercard" width={32} height={24} />}
            {cardBrand === "amex" && <Image src="/amex_card.png" alt="Amex" width={32} height={24} />}
            {cardBrand === "unknown" && <Lock className="w-4 h-4 text-gray-400" />}
          </div>
        </div>
        {isCardValid === false && <p className="text-xs text-red-500 mt-1.5 font-medium ml-1">Tarjeta inválida</p>}
      </div>

      {/* Fecha y CVV con Desplegables */}
      <div className="grid grid-cols-2 gap-4">
        <div className="grid grid-cols-2 gap-2">
            <select 
              value={month || ""}
              onChange={(e) => onExpiryChange(e.target.value, 'month')}
              className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-black outline-none bg-white"
            >
              <option value="" disabled>MM</option>
              {Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')).map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>

            <select 
              value={year || ""}
              onChange={(e) => onExpiryChange(e.target.value, 'year')}
              className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-black outline-none bg-white"
            >
              <option value="" disabled>AA</option>
              {Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() + i).toString().slice(-2)).map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
        </div>

        <div className="relative">
          <input 
            type="text" value={cardCvv} onChange={onCvvChange}
            placeholder={cardBrand === "amex" ? "CVV (4)" : "CVV (3)"}
            autoComplete="new-password"
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-black focus:outline-none pr-10 bg-white" 
          />
          <HelpCircle className="w-4 h-4 text-gray-400 absolute right-3 top-3.5 cursor-help" />
        </div>
      </div>

      {/* Nombre Titular */}
      <input 
        type="text" value={cardName} onChange={(e) => onNameChange(e.target.value)}
        placeholder="Nombre del titular" autoComplete="new-password"
        className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-black focus:outline-none bg-white" 
      />

      <div className="pt-2">
        <button 
          type="button" 
          onClick={onSave} // CONECTADO
          className="w-full bg-black text-white px-6 py-3 rounded-md text-sm font-bold hover:bg-gray-800 transition"
        >
          Agregar tarjeta
        </button>
      </div>
    </div>
  );
}
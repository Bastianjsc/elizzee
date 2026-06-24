// src/components/CartSidebar.tsx
"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link"; // <-- AGREGA ESTA LÍNEA EXACTA AQUÍ
import { useCart } from "@/context/CartContext";

export default function CartSidebar() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart, 
    totalPrice,
  } = useCart();

  const formatPrice = (amount: number) => amount.toLocaleString("es-CL");

  // Calculamos el total original sin ofertas
  const originalTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.cartQuantity,
    0
  );

  // Calculamos el ahorro total
  const savings = originalTotal - totalPrice;

  // Efecto para bloquear el scroll de la página de fondo
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  return (
    <>
      {/* Fondo oscuro desenfocado con opacidad suavizada (bg-black/30) */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Panel Lateral con altura fija en viewport h-[100dvh] para asegurar el layout */}
      <div
        className={`fixed top-0 right-0 h-[100dvh] w-full sm:w-[450px] bg-[#FAFAFA] z-50 shadow-2xl flex flex-col transform transition-transform duration-500 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Cabecera del Carrito */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-xl uppercase tracking-widest font-bold">Tu Carrito</h2>
          <button
            onClick={closeCart}
            className="text-gray-400 hover:text-black text-3xl transition-colors cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Contenedor de Productos con min-h-0 para forzar el scroll independiente */}
        <div className="flex-1 overflow-y-auto min-h-0 p-6 space-y-6">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-6">
                <div className="relative w-24 h-32 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs uppercase font-bold tracking-widest mb-1">
                      {item.name}
                    </h3>
                    
                    {item.discountPrice ? (
                      <div className="flex items-center gap-2">
                        <p className="text-gray-400 text-[11px] line-through">
                          ${formatPrice(item.price)}
                        </p>
                        <p className="text-black font-bold text-sm">
                          ${formatPrice(item.discountPrice)}
                        </p>
                      </div>
                    ) : (
                      <p className="text-black font-bold text-sm">
                        ${formatPrice(item.price)}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-gray-200 rounded-sm bg-white">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-bold">
                        {item.cartQuantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        disabled={item.cartQuantity >= item.stock}
                        className={`w-8 h-8 flex items-center justify-center transition ${
                          item.cartQuantity >= item.stock
                            ? "opacity-30 cursor-not-allowed"
                            : "hover:bg-gray-100 cursor-pointer"
                        }`}
                      >
                        +
                      </button>
                    </div>

                    {/* Botón de eliminación mediante imagen basura.png */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="hover:scale-110 transition-transform cursor-pointer focus:outline-none"
                      title="Eliminar producto"
                    >
                      <Image 
                        src="/basura.png" 
                        alt="Eliminar" 
                        width={20} 
                        height={20} 
                        className="object-contain opacity-60 hover:opacity-100 transition-opacity" 
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <p className="text-gray-400 uppercase tracking-widest text-sm">
                Tu carrito está vacío.
              </p>
              <button
                onClick={closeCart}
                className="border-b border-black pb-1 text-xs uppercase font-bold tracking-[0.2em] hover:text-gray-600 transition cursor-pointer"
              >
                Empezar a comprar
              </button>
            </div>
          )}
        </div>

        {/* Sección de Totales y Botones de Acción */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-gray-50 border-t border-gray-200 flex-shrink-0">
            
            {savings > 0 ? (
              <>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs uppercase tracking-widest text-gray-500">Subtotal</span>
                  <span className="text-sm text-gray-500 line-through">${formatPrice(originalTotal)}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs uppercase tracking-widest font-bold text-[#905459]">Descuento</span>
                  <span className="text-sm font-bold text-[#905459]">-${formatPrice(savings)}</span>
                </div>
                <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-200">
                  <span className="text-sm uppercase tracking-widest font-bold text-black">Total a pagar</span>
                  <span className="text-xl font-bold text-black">${formatPrice(totalPrice)}</span>
                </div>
              </>
            ) : (
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm uppercase tracking-widest font-bold text-black">Total</span>
                <span className="text-xl font-bold text-black">${formatPrice(totalPrice)}</span>
              </div>
            )}

            {/* Fila de botones apilados según diseño */}
            <div className="flex flex-col gap-3">
              {/* NUEVO: Lo convertimos en un Link que lleva a /checkout y cierra el sidebar */}
              <Link 
                href="/checkout"
                onClick={closeCart}
                className="w-full bg-black text-white py-4 uppercase tracking-widest text-sm font-bold hover:bg-gray-800 transition text-center rounded-md"
              >
                Finalizar Compra
              </Link>
              
              <button 
                onClick={closeCart}
                className="w-full bg-white text-black border border-gray-300 py-4 uppercase tracking-widest text-sm font-bold hover:bg-gray-50 transition cursor-pointer rounded-md"
              >
                Seguir comprando
              </button>
            </div>

          </div>
        )}
      </div>
    </>
  );
}
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Carrito() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useCart();

  const formatPrice = (amount: number) => {
    return amount.toLocaleString("es-CL");
  };

  const validateCart = () => {
    if (cartItems.length === 0) {
      alert("El carrito está vacío. Agrega productos antes de continuar.");
      return;
    }

    const hasInvalidQuantity = cartItems.some((item) => item.quantity <= 0);

    if (hasInvalidQuantity) {
      alert("Existen productos con cantidades inválidas.");
      return;
    }

    alert("Carrito validado correctamente.");
  };

  const total = cartItems.reduce(
    (accumulator, item) => accumulator + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (accumulator, item) => accumulator + item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-light tracking-widest uppercase mb-4">
            Carrito de Compras
          </h1>

          <p className="text-gray-500 text-sm font-serif italic">
            Revisa, modifica o elimina los productos antes de finalizar tu compra.
          </p>

          <div className="w-12 h-[1px] bg-black mt-6 mx-auto" />
        </div>

        {cartItems.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr_auto] gap-5 border border-gray-200 p-4 rounded-2xl items-center"
                >
                  <div className="relative w-[100px] h-[130px] md:w-[120px] md:h-[150px] bg-gray-100 rounded-xl overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h2 className="text-sm uppercase tracking-widest font-bold mb-2">
                      {item.name}
                    </h2>

                    <p className="text-gray-500 text-sm mb-4">
                      Precio unitario: ${formatPrice(item.price)}
                    </p>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-9 h-9 border border-gray-300 hover:bg-black hover:text-white transition"
                      >
                        -
                      </button>

                      <span className="w-8 text-center font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="w-9 h-9 border border-gray-300 hover:bg-black hover:text-white transition"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-4">
                    <p className="font-bold">
                      Subtotal: ${formatPrice(item.price * item.quantity)}
                    </p>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs uppercase tracking-widest text-red-600 font-bold hover:underline"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <aside className="border border-gray-200 rounded-2xl p-6 h-fit">
              <h3 className="text-sm uppercase tracking-[0.3em] font-bold mb-6">
                Resumen
              </h3>

              <div className="flex justify-between border-b border-gray-200 pb-4 mb-4">
                <span className="text-gray-600">Productos</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex justify-between text-lg font-bold mb-8">
                <span>Total</span>
                <span>${formatPrice(total)}</span>
              </div>

              <button
                onClick={validateCart}
                className="w-full bg-black text-white py-4 uppercase tracking-widest text-sm font-bold hover:bg-gray-800 transition mb-4"
              >
                Validar carrito
              </button>

              <Link
                href="/"
                className="block text-center border border-black py-4 uppercase tracking-widest text-xs font-bold hover:bg-black hover:text-white transition"
              >
                Seguir comprando
              </Link>
            </aside>
          </div>
        ) : (
          <div className="text-center py-20 border border-gray-200 rounded-2xl">
            <p className="text-gray-500 uppercase tracking-widest text-sm mb-8">
              Tu carrito está vacío.
            </p>

            <Link
              href="/"
              className="inline-block border-b border-black pb-1 text-xs uppercase font-bold tracking-[0.2em] hover:text-gray-600 transition"
            >
              Volver a comprar
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
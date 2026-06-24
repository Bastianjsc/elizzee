// src/app/rastreo/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, Package, MapPin, CreditCard, Calendar, Clock } from "lucide-react";

export default function RastreoPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const formatPrice = (amount: number) => amount.toLocaleString("es-CL");

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setIsLoading(true);
    setError("");
    setOrder(null);

    try {
      const response = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al buscar el pedido");
      }

      setOrder(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Cabecera */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-light tracking-widest uppercase mb-4">
            Rastrear Pedido
          </h1>
          <p className="text-gray-500 text-sm font-serif italic">
            Ingresa tu código de compra (Ej: ELZ-123456) para conocer el estado y los detalles de tu pedido.
          </p>
          <div className="w-12 h-[1px] bg-black mx-auto mt-6" />
        </div>

        {/* Buscador */}
        <form onSubmit={handleTrackOrder} className="relative max-w-lg mx-auto mb-16">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="ELZ-000000"
            className="w-full border-b-2 border-gray-300 bg-transparent py-4 pl-4 pr-12 text-lg uppercase tracking-widest outline-none focus:border-black transition-colors placeholder:text-gray-300"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-black transition-colors disabled:opacity-50 cursor-pointer"
          >
            <Search className="w-6 h-6" />
          </button>
        </form>

        {/* Mensajes de Estado */}
        {isLoading && (
          <div className="text-center text-gray-500 tracking-widest uppercase text-sm animate-pulse">
            Buscando tu pedido en el sistema...
          </div>
        )}

        {error && (
          <div className="text-center text-red-600 tracking-widest text-sm bg-red-50 py-4 rounded-lg">
            {error}
          </div>
        )}

        {/* Resultados del Pedido */}
        {order && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-10 animate-in fade-in duration-500">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-6 mb-6 gap-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Orden</p>
                <p className="text-xl font-bold">{order.orderId}</p>
              </div>
              <div className="bg-black text-white px-4 py-2 rounded-full text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {order.status || "Pendiente"}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-sm text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Package className="w-4 h-4" /> Cliente
                </h3>
                <p className="font-semibold">{order.customer.name}</p>
                <p className="text-sm text-gray-500">{order.customer.email}</p>
              </div>

              <div>
                <h3 className="text-sm text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Entrega
                </h3>
                <p className="font-semibold capitalize">{order.delivery.method === "delivery" ? "Despacho a domicilio" : "Retiro en Tienda"}</p>
                <p className="text-sm text-gray-500">{order.delivery.address}</p>
              </div>

              <div>
                <h3 className="text-sm text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" /> Pago
                </h3>
                <p className="font-semibold capitalize">{order.payment.method === "card" ? "Tarjeta" : "Efectivo"}</p>
                <p className="text-sm text-gray-500">{order.payment.cardInfo}</p>
              </div>

              <div>
                <h3 className="text-sm text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Fecha
                </h3>
                <p className="font-semibold">
                  {new Date(order.createdAt).toLocaleDateString("es-CL", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Productos ({order.items.length})</h3>
              <div className="space-y-4">
                {order.items.map((item: any, index: number) => (
                  <div key={index} className="flex items-center gap-4 border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                    <div className="relative w-12 h-12 bg-white rounded border border-gray-200 flex-shrink-0">
                       <Image src={item.image} alt={item.name} fill className="object-cover p-1" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">Cant: {item.cartQuantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">${formatPrice((item.discountPrice || item.price) * item.cartQuantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
                <span className="font-bold text-gray-500 uppercase tracking-widest text-sm">
                  {order.payment.method === "cash" ? "Pago Pendiente" : "Total Pagado"}
                </span>
                <span className={`font-bold text-xl ${order.payment.method === "cash" ? "text-orange-600" : "text-black"}`}>
                  ${formatPrice(order.total)}
                </span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
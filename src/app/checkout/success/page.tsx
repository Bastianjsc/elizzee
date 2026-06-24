// src/app/checkout/success/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Package, CreditCard, Mail, MapPin } from "lucide-react";

interface OrderData {
  orderId: string;
  customer: {
    name: string;
    email: string;
  };
  delivery: {
    method: "delivery" | "pickup";
    address: string;
  };
  payment: {
    method: "card" | "cash";
    cardInfo: string;
  };
  items: any[];
  total: number;
  date: string;
}

export default function SuccessPage() {
  const router = useRouter();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const formatPrice = (amount: number) => amount.toLocaleString("es-CL");

  useEffect(() => {
    // 1. Recuperamos los datos del sessionStorage
    const savedOrder = sessionStorage.getItem("lastOrder");
    
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
      setIsLoading(false);
      // ELIMINAMOS la línea de sessionStorage.removeItem("lastOrder") 
      // para que el Strict Mode de React no nos borre el dato en el doble renderizado.
    } else {
      // 2. Si realmente no hay datos, lo devolvemos al inicio
      router.push("/");
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-medium">Cargando detalles de tu compra...</p>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Header / Logo */}
      <div className="mb-8">
        <Image src="/Logo_Elizee_6.webp" alt="Elizze Logo" width={140} height={50} className="object-contain" />
      </div>

      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Sección de Éxito Superior */}
        <div className="bg-black p-8 text-center text-white">
          <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-400" />
          <h1 className="text-2xl font-bold mb-2">¡Gracias por tu compra, {order.customer.name.split(" ")[0]}!</h1>
          <p className="text-gray-300 text-sm">
            Tu pedido ha sido confirmado y está en proceso.
          </p>
        </div>

        <div className="p-8">
          {/* Tarjetas de Información Rápida */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-2 text-gray-500">
                <Package className="w-5 h-5" />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Detalles del Pedido</h3>
              </div>
              <p className="font-bold text-lg">{order.orderId}</p>
              <p className="text-sm text-gray-600 mt-1">{order.date}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-2 text-gray-500">
                <CreditCard className="w-5 h-5" />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Pago</h3>
              </div>
              <p className="font-bold capitalize">{order.payment.method === "card" ? "Tarjeta de Crédito/Débito" : "Efectivo"}</p>
              <p className="text-sm text-gray-600 mt-1">{order.payment.cardInfo}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-2 text-gray-500">
                <Mail className="w-5 h-5" />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Contacto</h3>
              </div>
              <p className="font-bold truncate">{order.customer.email}</p>
              <p className="text-sm text-gray-600 mt-1">Recibirás tu boleta aquí.</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-2 text-gray-500">
                <MapPin className="w-5 h-5" />
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  {order.delivery.method === "delivery" ? "Dirección de Envío" : "Punto de Retiro"}
                </h3>
              </div>
              <p className="font-bold line-clamp-2">{order.delivery.address}</p>
            </div>
          </div>

          {/* Resumen de Productos */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-lg font-bold mb-4">Resumen de Productos</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="relative w-16 h-16 bg-white border border-gray-200 rounded-lg flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover rounded-lg p-1" />
                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full z-10">
                      {item.cartQuantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold">{item.name}</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">${formatPrice((item.discountPrice || item.price) * item.cartQuantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* --- SECCIÓN DEL TOTAL MODIFICADA --- */}
            <div className="border-t border-gray-200 mt-6 pt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-gray-600">
                {/* Condición para cambiar el texto según el método de pago */}
                {order.payment.method === "cash" ? "Pago Pendiente" : "Monto Pagado"}
              </span>
              <span className={`text-2xl font-bold ${order.payment.method === "cash" ? "text-[#F05A28]" : "text-black"}`}>
                ${formatPrice(order.total)}
              </span>
            </div>
            {/* ------------------------------------ */}

          </div>

        </div>
      </div>

      {/* Botón Volver */}
      <div className="mt-8">
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-black text-black font-bold rounded-lg hover:bg-black hover:text-white transition-colors duration-300"
        >
          Volver a la tienda
        </Link>
      </div>

    </div>
  );
}
// src/app/PedidoUser/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import Image from "next/image";
import { Package, Calendar, CreditCard, ChevronRight, X, MapPin, Clock, CheckCircle } from "lucide-react";

// 1. Definimos las interfaces de TypeScript (Documentación de la estructura de datos)
interface OrderItem {
  id?: string;
  name: string;
  quantity?: number;
  cantidad?: number;
  price?: number;
  precio?: number;
  image?: string;
}

interface OrderData {
  _id: string;
  orderId: string;
  createdAt: string;
  total: number;
  status: string;
  items: OrderItem[];
  customer: {
    name: string;
    email: string;
  };
  delivery: {
    method: string;
    address: string;
  };
  payment: {
    method: string;
    cardInfo: string;
  };
}

export default function PedidoUserPage() {
  // 2. Variables de estado
  const { user, isLoading: isUserLoading } = useUser();
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);

  // 3. Efecto para obtener los pedidos del usuario cuando el componente se carga
  useEffect(() => {
    if (!isUserLoading && user) {
      const fetchOrders = async () => {
        try {
          const res = await fetch(`/api/orders/user/${user.id}`);
          if (res.ok) {
            const data = await res.json();
            setOrders(data);
          }
        } catch (error) {
          console.error("Error cargando pedidos:", error);
        } finally {
          setIsLoadingOrders(false);
        }
      };
      fetchOrders();
    } else if (!isUserLoading && !user) {
      setIsLoadingOrders(false);
    }
  }, [user, isUserLoading]);

  // 4. Efecto para bloquear el scroll de la página cuando el modal está abierto
  useEffect(() => {
    if (selectedOrder) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedOrder]);

  // 5. Pantallas de carga y de "No Autorizado"
  if (isUserLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#FAFAFA]">
        <p className="text-xs uppercase tracking-widest text-gray-500 animate-pulse">Cargando perfil...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#FAFAFA] px-6 text-center">
        <h1 className="text-2xl font-light uppercase tracking-widest mb-4">Acceso Denegado</h1>
        <p className="text-gray-500 mb-8 text-sm">Debes iniciar sesión para ver tu historial de compras.</p>
        <Link href="/" className="bg-black text-white px-10 py-3 uppercase text-xs font-bold tracking-widest hover:bg-gray-800 transition-colors">
          Volver al inicio
        </Link>
      </div>
    );
  }

  // 6. Renderizado principal de la página
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12 px-6">
      <div className="max-w-[1000px] mx-auto">
        
        <header className="mb-12 border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-light uppercase tracking-widest mb-2">Mis Pedidos</h1>
          <p className="text-sm text-gray-500">Historial de compras de {user.name} {user.lastName}</p>
        </header>

        {isLoadingOrders ? (
          <div className="flex justify-center py-20">
            <p className="text-xs uppercase tracking-widest text-gray-500 animate-pulse">Buscando tus pedidos...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white p-12 text-center border border-gray-200 rounded-sm">
            <Package className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <h2 className="text-lg font-light uppercase tracking-widest mb-2">Aún no tienes pedidos</h2>
            <p className="text-sm text-gray-500 mb-6">Explora nuestra colección de alta costura y haz tu primera compra.</p>
            <Link href="/esmaltes" className="inline-block border-b border-black pb-1 text-[10px] uppercase font-bold tracking-widest hover:text-gray-500 hover:border-gray-500 transition-colors">
              Ir a la tienda
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white border border-gray-200 p-6 rounded-sm hover:shadow-md transition-shadow group">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 pb-4 mb-4">
                  
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">
                      Orden
                    </span>
                    <span className="text-lg font-bold tracking-wider">{order.orderId}</span>
                  </div>

                  <div className="flex flex-wrap gap-4 md:gap-8">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString('es-CL')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-bold text-black">
                        ${order.total.toLocaleString('es-CL')}
                      </span>
                    </div>
                    <div>
                      <span className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full ${
                        order.status === 'pendiente' ? 'bg-orange-100 text-orange-700' : 
                        order.status === 'completado' ? 'bg-green-100 text-green-700' : 
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {order.items.length} {order.items.length === 1 ? 'producto' : 'productos'} • Envío vía {order.delivery.method === "delivery" ? "Despacho" : "Retiro"}
                  </div>
                  
                  <button 
                    onClick={() => setSelectedOrder(order)}
                    className="cursor-pointer flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold text-black group-hover:text-gray-500 transition-colors border-none bg-transparent"
                  >
                    Ver Estado <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- MODAL DE RESUMEN DEL PEDIDO --- */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 md:p-10 rounded-xl shadow-2xl max-w-3xl w-full relative max-h-[90vh] overflow-y-auto">
            
            <button 
              onClick={() => setSelectedOrder(null)} 
              className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors cursor-pointer border-none bg-transparent"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Cabecera del Modal */}
            <div className="flex justify-between items-start mb-10 pr-8">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">
                  Orden
                </span>
                <span className="text-2xl font-bold tracking-wider">{selectedOrder.orderId}</span>
              </div>
              
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                selectedOrder.status === 'pendiente' ? 'bg-black text-white' : 'bg-green-600 text-white'
              }`}>
                {selectedOrder.status === 'pendiente' ? <Clock className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  {selectedOrder.status}
                </span>
              </div>
            </div>

            {/* Grid de 4 columnas (Datos) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 mb-10">
              
              {/* Cliente */}
              <div>
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Package className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Cliente</span>
                </div>
                <p className="font-bold text-sm capitalize">{selectedOrder.customer.name}</p>
                <p className="text-sm text-gray-500">{selectedOrder.customer.email}</p>
              </div>

              {/* Entrega */}
              <div>
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Entrega</span>
                </div>
                <p className="font-bold text-sm capitalize">
                  {selectedOrder.delivery.method === "pickup" ? "Retiro En Tienda" : "Despacho a Domicilio"}
                </p>
                <p className="text-sm text-gray-500">{selectedOrder.delivery.address}</p>
              </div>

              {/* Pago */}
              <div>
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <CreditCard className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Pago</span>
                </div>
                <p className="font-bold text-sm capitalize">
                  {selectedOrder.payment.method === "cash" ? "Efectivo" : "Tarjeta de Crédito/Débito"}
                </p>
                <p className="text-sm text-gray-500 capitalize">{selectedOrder.payment.cardInfo}</p>
              </div>

              {/* Fecha */}
              <div>
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Fecha</span>
                </div>
                <p className="font-bold text-sm">
                  {new Date(selectedOrder.createdAt).toLocaleDateString('es-CL', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* Recuadro de Productos */}
            <div className="bg-gray-50 rounded-xl p-6 md:p-8">
              <h3 className="text-[11px] font-bold uppercase tracking-widest mb-6 text-black">
                Productos ({selectedOrder.items.length})
              </h3>
              
              <div className="space-y-4 mb-6">
                {selectedOrder.items.map((item, index) => {
                  const itemQty = item.quantity || item.cantidad || 1;
                  const itemPrice = item.price || item.precio || 0;

                  return (
                    <div key={index} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 relative">
                          {item.image ? (
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-pink-100 text-pink-300">
                              <Package className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-gray-800">{item.name}</p>
                          <p className="text-[11px] text-gray-500 uppercase tracking-widest mt-1">
                            Cant: {itemQty}
                          </p>
                        </div>
                      </div>
                      <div className="font-bold text-sm">
                        ${(itemPrice * itemQty).toLocaleString('es-CL')}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 7. Lógica modificada para el estado de pago */}
              <div className="flex justify-between items-center border-t border-gray-200 pt-6">
                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                  {/* Evaluamos directamente el método de pago */}
                  {selectedOrder.payment.method === 'cash' ? 'Pago Pendiente' : 'Monto Pagado'}
                </span>
                <span className={`text-2xl font-bold ${
                  selectedOrder.payment.method === 'cash' ? 'text-[#F05A28]' : 'text-green-600'
                }`}>
                  ${selectedOrder.total.toLocaleString('es-CL')}
                </span>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
"use client";

import React, { useState } from "react";
import { MapPin, Mail, Phone, ArrowRight } from "lucide-react";

export default function ContactoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white w-full text-black font-sans">
      <div className="pt-16 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto">
        
        {/* ENCABEZADO DE LA PÁGINA */}
        <div className="flex flex-col items-center mb-16 text-center">
          <h1 className="text-3xl md:text-5xl font-light tracking-widest uppercase mb-4">
            Servicio al Cliente
          </h1>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl font-serif italic leading-relaxed">
            Estamos aquí para asistirte. Si tienes dudas sobre tus pedidos, 
            nuestros productos o deseas información para ventas al mayor, 
            no dudes en contactarnos.
          </p>
          <div className="w-12 h-[1px] bg-black mt-8" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* COLUMNA IZQUIERDA: Información de Contacto */}
          <div className="flex flex-col gap-10">
            <div>
              <h2 className="text-xl md:text-2xl font-light uppercase tracking-widest mb-8">
                Dirección Física
              </h2>
              <div className="flex items-start gap-4 mb-6 group">
                <MapPin className="w-5 h-5 mt-1 text-gray-400 group-hover:text-black transition-colors" />
                <div>
                  <h3 className="text-sm font-bold tracking-widest uppercase mb-1">
                    Inversiones Elizzee Chile SpA
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Cerro El Plomo 5931, Oficina 503<br />
                    7561160 Las Condes<br />
                    Región Metropolitana, Chile
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-gray-200" />

            <div>
              <h2 className="text-xl md:text-2xl font-light uppercase tracking-widest mb-8">
                Contacto Directo
              </h2>
              
              <div className="flex items-start gap-4 mb-6 group">
                <Mail className="w-5 h-5 mt-1 text-gray-400 group-hover:text-black transition-colors" />
                <div>
                  <h3 className="text-sm font-bold tracking-widest uppercase mb-1">
                    Venta al Detalle
                  </h3>
                  <a href="mailto:ventas@elizzee.com" className="text-gray-600 text-sm hover:text-black transition-colors">
                    ventas@elizzee.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-6 group">
                <Mail className="w-5 h-5 mt-1 text-gray-400 group-hover:text-black transition-colors" />
                <div>
                  <h3 className="text-sm font-bold tracking-widest uppercase mb-1">
                    Venta al por Mayor
                  </h3>
                  <a href="mailto:comercial@elizzee.com" className="text-gray-600 text-sm hover:text-black transition-colors">
                    comercial@elizzee.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <Phone className="w-5 h-5 mt-1 text-gray-400 group-hover:text-black transition-colors" />
                <div>
                  <h3 className="text-sm font-bold tracking-widest uppercase mb-1">
                    Atención Telefónica
                  </h3>
                  <a href="tel:+56953906875" className="text-gray-600 text-sm hover:text-black transition-colors">
                    +56 9 5390 6875
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: Formulario */}
          <div className="bg-gray-50/50 p-8 md:p-12 border border-gray-100">
            <h2 className="text-xl md:text-2xl font-light uppercase tracking-widest mb-8 text-center">
              Envíanos un mensaje
            </h2>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center text-center py-12 animate-fade-in-down">
                <div className="w-16 h-16 border border-black rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl text-black">✓</span>
                </div>
                <h3 className="text-lg font-bold tracking-widest uppercase mb-2">Mensaje Enviado</h3>
                <p className="text-gray-600 text-sm font-serif italic mb-4">
                  Gracias por escribirnos. Nuestro equipo se pondrá en contacto contigo a la brevedad.
                </p>
                
                {/* AQUÍ ESTÁ EL TEXTO AÑADIDO PARA LA SIMULACIÓN ACADÉMICA */}
                <p className="text-gray-400 text-[10px] uppercase tracking-widest max-w-sm leading-relaxed border-t border-gray-200 pt-4 mt-2">
                  Simulación académica: en un sistema real este formulario sería enviado al correo de servicio al cliente.
                </p>

                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 border-b border-black pb-1 text-xs uppercase font-bold tracking-[0.2em] hover:text-gray-500 hover:border-gray-500 transition-colors cursor-pointer bg-transparent"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <input 
                    type="text" 
                    placeholder="Nombre *" 
                    required
                    className="w-full bg-transparent border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                  <input 
                    type="text" 
                    placeholder="Apellido *" 
                    required
                    className="w-full bg-transparent border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <input 
                    type="email" 
                    placeholder="Correo electrónico *" 
                    required
                    className="w-full bg-transparent border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                  <input 
                    type="tel" 
                    placeholder="Número de teléfono *" 
                    required
                    className="w-full bg-transparent border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <input 
                  type="text" 
                  placeholder="Asunto *" 
                  required
                  className="w-full bg-transparent border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                />

                <input 
                  type="text" 
                  placeholder="Número de Orden de Compra (Opcional)" 
                  className="w-full bg-transparent border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                />

                <textarea 
                  placeholder="Detalles de su consulta *" 
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                ></textarea>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="mt-4 flex items-center justify-center gap-3 bg-black text-white px-8 py-4 text-xs uppercase font-bold tracking-[0.2em] hover:bg-gray-900 transition-colors duration-300 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                  {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
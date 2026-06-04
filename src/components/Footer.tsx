"use client";

import React from "react";
import { ChevronUp } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-black text-white py-12 px-6 md:px-12 relative w-full font-serif">
      
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row lg:justify-between gap-10 items-start lg:pr-24">
        
        {/* COLUMNA 1: Logo y Copyright */}
        <div className="flex flex-col items-start gap-4">
          <div className="w-[120px] mb-2">
            <Image 
              src="/portada_elizee.webp" 
              alt="Elizze Logo" 
              width={120}
              height={50}
              className="w-full h-auto object-contain brightness-0 invert" 
            />
          </div>
          <p className="text-xs text-gray-400 font-sans tracking-wide whitespace-nowrap">
            © 2026 ELIZZEÈ, Tecnología de Next.js
          </p>
        </div>

        {/* COLUMNA 2: Links de interés */}
        <div className="flex flex-col items-start gap-3">
          <h4 className="text-sm font-bold tracking-widest uppercase mb-2">Links de interés</h4>
          <a href="#" className="text-xs md:text-sm text-gray-300 hover:text-white underline underline-offset-4 decoration-1 transition-colors">
            Información de Contacto
          </a>
          <a href="#" className="text-xs md:text-sm text-gray-300 hover:text-white underline underline-offset-4 decoration-1 transition-colors">
            Política de Privacidad
          </a>
        </div>

        {/* COLUMNA 3: Más Políticas */}
        <div className="flex flex-col items-start gap-3 lg:pt-9">
          <a href="#" className="text-xs md:text-sm text-gray-300 hover:text-white underline underline-offset-4 decoration-1 transition-colors">
            Política de Envíos
          </a>
          <a href="#" className="text-xs md:text-sm text-gray-300 hover:text-white underline underline-offset-4 decoration-1 transition-colors">
            Cambios, Devoluciones y Reembolsos
          </a>
          <a href="#" className="text-xs md:text-sm text-gray-300 hover:text-white underline underline-offset-4 decoration-1 transition-colors">
            Términos y Condiciones del Servicio
          </a>
        </div>

        {/* COLUMNA 4: Redes Sociales */}
        <div className="flex flex-col items-start lg:items-center gap-3">
          <h4 className="text-sm font-bold tracking-widest uppercase mb-2">¡Síguenos!</h4>
          <div className="flex gap-5">
            <a href="#" className="hover:scale-110 transition-transform text-white mt-1">
              <Image src="/ig.webp" alt="Instagram" width={20} height={20} className="w-5 h-5 object-contain brightness-0 invert" />
            </a>
            <a href="#" className="hover:scale-110 transition-transform text-white">
              <Image src="/tiktok.webp" alt="TikTok" width={28} height={28} className="w-7 h-7 object-contain brightness-0 invert" /> 
            </a>
            <a href="#" className="hover:scale-110 transition-transform text-white">
              <Image src="/wtpp.webp" alt="WhatsApp" width={24} height={24} className="w-6 h-6 object-contain brightness-0 invert mt-1" />
            </a>
          </div>
        </div>

        {/* COLUMNA 5: Métodos de Pago */}
        <div className="flex flex-col items-start lg:items-center gap-4">
          <h4 className="text-sm font-bold tracking-widest uppercase mb-2">Métodos de Pago</h4>
          
          <div className="flex items-center gap-4">
            <div className="text-xs text-gray-400 border-r border-gray-600 pr-4 leading-tight text-right">
              Paga con<br/>tu Banco
            </div>
            
            <Image src="/mercado.png" alt="Mercado Pago" width={60} height={28} className="h-7 w-auto object-contain brightness-0 invert" />
            <Image src="/visa.webp" alt="Visa" width={40} height={20} className="h-5 w-auto object-contain brightness-0 invert" />
            <Image src="/master.png" alt="Mastercard" width={50} height={28} className="h-7 w-auto object-contain brightness-0 invert" />
            <Image src="/transfer.png" alt="Transferencia" width={40} height={32} className="h-8 w-auto object-contain brightness-0 invert" />
          </div>
        </div>

      </div>

      {/* Botón Volver Arriba */}
      <div className="absolute right-6 bottom-10 hidden md:block">
        <button 
          onClick={scrollToTop}
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-lg group focus:outline-none"
          aria-label="Volver arriba"
        >
          <ChevronUp className="w-6 h-6 text-black group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>

      <div className="mt-10 flex justify-center md:hidden">
        <button 
          onClick={scrollToTop}
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
        >
          <ChevronUp className="w-6 h-6 text-black" />
        </button>
      </div>
    </footer>
  );
}
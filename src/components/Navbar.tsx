"use client";

import React, { useState } from "react";
import { Search, ShoppingBag, Mail, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
// 1. Importamos usePathname de la navegación moderna de Next.js
import { usePathname } from "next/navigation";

// 2. Diccionario de rutas (Principio DRY para no repetir código HTML)
const NAV_LINKS = [
  { name: "Esmaltes de Uñas", href: "/esmaltes" },
  { name: "Base y Brillo de Uñas", href: "/brillo" },
  { name: "Lámparas UV/LED", href: "/lamparas" },
  { name: "Colecciones", href: "/colecciones" },
  { name: "Arma tu kit", href: "/kit" },
  { name: "Ofertas", href: "/ofertas", isSpecial: true }, // Etiqueta especial para pintarla de rojo
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // 3. Capturamos la URL actual en la que estamos navegando
  const pathname = usePathname();

  return (
    <header className="pt-4 w-full border-b border-gray-200 bg-white sticky top-0 z-50">
      
      {/* Fila Superior: Grid de 3 columnas (Sin cambios) */}
      <div className="max-w-[1440px] mx-auto px-6 h-20 grid grid-cols-3 items-center">
        
        {/* 1. Izquierda: Logo e Iniciar Sesión */}
        <div className="flex justify-start">
          <div className="flex flex-col items-start gap-4">
            <Link href="/" className="relative cursor-pointer transition-transform hover:scale-105 block">
              <Image
                src="/Logo_Elizee_6.webp" 
                alt="Elizze Logo" 
                width={145} 
                height={50}
                className="w-[145px] h-auto object-contain"
              />
            </Link>
            
            <button className="relative z-30 cursor-pointer text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 hover:text-black transition-all duration-300 pl-1 bg-transparent border-none outline-none focus:outline-none block group">
              <span className="cursor-pointer">Iniciar Sesión</span>
            </button>
          </div>
        </div>

        {/* 2. Centro: Buscador */}
        <div className="flex justify-center mb-10">
          <div className="relative w-full max-w-md hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="w-full border border-black px-10 py-2 rounded-sm text-sm focus:ring-1 focus:ring-gray-400 outline-none"
            />
          </div>
        </div>

        {/* 3. Derecha: Contacto, Carrito y Botón Menú */}
        <div className="flex justify-end items-center gap-4 md:gap-8">
          <div className="flex flex-col items-end gap-3">
            <button className="flex items-center gap-3 cursor-pointer group bg-transparent border-none focus:outline-none">
              <span className="text-[13px] font-bold uppercase tracking-widest text-black group-hover:text-gray-600 transition-colors">
                Carrito
              </span>
              <ShoppingBag className="w-5 h-5 text-black stroke-[1.5] group-hover:scale-110 transition-transform" />
            </button>

            <button className="hidden md:flex items-center gap-3 cursor-pointer group bg-transparent border-none focus:outline-none">
              <span className="text-[13px] font-bold uppercase tracking-widest text-black group-hover:text-gray-600 transition-colors">
                Contacto
              </span>
              <Mail className="w-5 h-5 text-black stroke-[1.5] group-hover:scale-110 transition-transform" />
            </button>
          </div>

          <button 
            className="md:hidden p-2 cursor-pointer bg-transparent border-none focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-7 h-7 text-black" /> : <Menu className="w-7 h-7 text-black" />}
          </button>
        </div>
      </div>

      {/* Menú de Navegación */}
      <nav className={`
        ${isOpen ? "flex" : "hidden"} 
        md:flex w-full bg-white transition-all duration-300 ease-in-out px-4
      `}>
        <ul className="
          flex flex-col items-center w-full py-6 gap-y-6
          md:flex-row md:flex-wrap md:justify-center md:gap-x-4 lg:gap-x-8 xl:gap-x-12 md:py-4
          text-[10px] lg:text-[11px] xl:text-[12px] font-medium uppercase tracking-widest
          border-t md:border-none max-w-[1440px] mx-auto
        ">
          
          {/* 4. Mapeamos nuestras rutas */}
          {NAV_LINKS.map((link) => {
            // Verificamos si la ruta actual coincide con el href de este enlace
            const isActive = pathname === link.href;

            // Clases base que tienen todos
            const baseClasses = "cursor-pointer transition-all block underline-offset-4 decoration-1";
            
            // Si es un enlace normal (Esmaltes, Lámparas, etc.)
            const normalClasses = isActive 
              ? "text-black underline" // Estado Activo: Fijo negro y subrayado
              : "text-gray-800 hover:text-black hover:underline"; // Estado Normal
            
            // Si es el enlace especial de (Ofertas)
            const specialClasses = isActive
              ? "text-red-900 underline font-bold" // Estado Activo Ofertas
              : "text-red-700 font-bold hover:text-red-900 hover:underline"; // Estado Normal Ofertas

            return (
              <li key={link.href} className="whitespace-nowrap">
                <Link 
                  href={link.href} 
                  className={`${baseClasses} ${link.isSpecial ? specialClasses : normalClasses}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}

        </ul>
      </nav>
    </header>
  );
}
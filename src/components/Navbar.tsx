"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, ShoppingBag, Mail, Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext"; 
import LoginForm from "@/components/LoginForm"; 
import Logout from "@/components/Logout"; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const router = useRouter();
  const { openCart, totalItems } = useCart();
  const { user } = useUser(); 

  // Verificar si hay sesión admin al cargar y escuchar cambios
  useEffect(() => {
    const checkAdminStatus = () => {
      setIsAdminLoggedIn(!!localStorage.getItem("elizee_admin"));
    };
    
    checkAdminStatus();
    window.addEventListener("adminStatusChanged", checkAdminStatus);
    
    return () => {
      window.removeEventListener("adminStatusChanged", checkAdminStatus);
    };
  }, []);

  // Construcción dinámica de los enlaces de navegación
  const navLinks = [
    { name: "Esmaltes de Uñas", href: "/esmaltes" },
    { name: "Base y Brillo de Uñas", href: "/brillo" },
    { name: "Lámparas UV/LED", href: "/lamparas" },
    { name: "Colecciones", href: "/colecciones" },
    user 
      ? { name: "Mis Pedidos", href: "/PedidoUser", isBold: true } 
      : { name: "Rastrear Pedido", href: "/Pedido" },
    { name: "Ofertas", href: "/ofertas", isSpecial: true },
  ];

  // Si es administrador, agregamos "Administración" al final de la lista
  if (isAdminLoggedIn) {
    navLinks.push({ name: "Administración", href: "/admin", isAdmin: true });
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.trim().length >= 2) {
        try {
          const res = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
          if (res.ok) {
            const data = await res.json();
            setSuggestions(data);
            setShowSuggestions(true);
          }
        } catch (error) {
          console.error("Error obteniendo sugerencias:", error);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setShowSuggestions(false);
      router.push(`/buscar?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <>
      <header className="shadow-md pt-4 w-full border-b border-gray-200 bg-[#FAFAFA] sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-6 h-20 grid grid-cols-3 items-center relative z-30">
          
          {/* 1. Izquierda: Logo y Sesión */}
          <div className="flex justify-start relative z-30">
            <div className="flex flex-col items-start">
              <button 
                onClick={() => router.push("/")}
                className="relative cursor-pointer transition-transform hover:scale-105 block mb-3 bg-transparent border-none"
              >
                <Image
                  src="/Logo_Elizee_6.webp" 
                  alt="Elizze Logo" 
                  width={145} 
                  height={50}
                  className="w-[145px] h-auto object-contain"
                />
              </button>
              
              <div className="flex items-center gap-3 pl-1">
                {user ? (
                  <div className="relative" ref={menuRef}>
                    <button 
                      type="button"
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} 
                      className="cursor-pointer text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500 hover:text-black transition-colors bg-transparent border-none outline-none focus:outline-none"
                    >
                      {user.name} {user.lastName}
                    </button>
                    <Logout isOpen={isUserMenuOpen} onClose={() => setIsUserMenuOpen(false)} />
                  </div>
                ) : (
                  <button 
                    onClick={() => setIsLoginOpen(true)}
                    className="cursor-pointer text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 hover:text-black transition-all duration-300 bg-transparent border-none outline-none focus:outline-none"
                  >
                    Iniciar Sesión
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 2. Centro: Buscador */}
          <div className="flex justify-center relative">
            <div className="relative w-full max-w-md hidden sm:block" ref={searchRef}>
              <form onSubmit={handleSearchSubmit}>
                <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer p-0">
                  <Search className="text-gray-400 w-4 h-4 hover:text-black transition-colors" />
                </button>
                <input 
                  type="text" 
                  placeholder="Buscar..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
                  autoComplete="off"
                  className="w-full border border-black px-10 py-2 rounded-sm text-sm focus:ring-1 focus:ring-gray-400 outline-none"
                />
              </form>

              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 shadow-xl rounded-sm z-50 overflow-hidden">
                  {suggestions.map((product) => (
                    <button
                      key={product._id}
                      type="button"
                      onClick={() => { 
                        setShowSuggestions(false); 
                        setSearchTerm(product.name);
                        router.push(`/buscar?q=${encodeURIComponent(product.name)}`);
                      }}
                      className="flex items-center gap-4 p-3 w-full text-left hover:bg-gray-50 border-b border-gray-100 last:border-none transition-colors cursor-pointer bg-white"
                    >
                      <div className="w-10 h-10 relative bg-gray-100 rounded-sm flex-shrink-0">
                        <Image src={product.image} alt={product.name} fill className="object-contain p-1" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-gray-900 tracking-wide uppercase">{product.name}</span>
                        <span className="text-[11px] text-gray-500 capitalize font-serif italic">{product.category}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 3. Derecha: Carrito y Contacto */}
          <div className="flex justify-end items-center gap-4 md:gap-8">
            <div className="flex flex-col items-end gap-3">
              <button 
                onClick={() => { if (pathname !== "/checkout") openCart(); }}
                className={`flex items-center gap-3 group bg-transparent border-none focus:outline-none ${pathname === "/checkout" ? "cursor-default" : "cursor-pointer"}`}
              >
                <span className="text-[13px] font-bold uppercase tracking-widest text-black group-hover:text-gray-600 transition-colors">Carrito</span>
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 text-black stroke-[1.5] group-hover:scale-110 transition-transform" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </div>
              </button>

              <button
                onClick={() => router.push("/contacto")}
                className="hidden md:flex items-center gap-3 cursor-pointer group bg-transparent border-none outline-none focus:outline-none"
              >
                <span className="text-[13px] font-bold uppercase tracking-widest text-black group-hover:text-gray-600 transition-colors">Contacto</span>
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
        <nav className={`${isOpen ? "flex" : "hidden"} md:flex w-full bg-[#FAFAFA] transition-all duration-300 ease-in-out px-4 relative z-20`}>
          <ul className="flex flex-col items-center w-full py-6 gap-y-2 md:flex-row md:flex-wrap md:justify-center md:gap-x-4 lg:gap-x-8 md:py-2 text-[10px] lg:text-[11px] font-medium uppercase tracking-widest border-t md:border-none max-w-[1440px] mx-auto">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              
              const baseClasses = "relative z-20 cursor-pointer transition-all inline-block underline-offset-4 decoration-1 bg-transparent border-none py-3 px-3";
              
              // Clases normales
              let normalClasses = isActive ? "text-black underline font-bold" : "text-gray-800 hover:text-black hover:underline"; 
              if (link.isBold) normalClasses = "text-black font-bold hover:underline decoration-2";
              
              // Clases para "Ofertas"
              const specialClasses = isActive ? "text-red-900 underline font-bold" : "text-red-700 font-bold hover:text-red-900 hover:underline"; 
              
              // Clases exclusivas para "Panel de Admin"
              const adminClasses = isActive ? "text-black font-bold underline decoration-2" : "text-black font-bold hover:underline decoration-2";

              const finalClasses = link.isAdmin 
                ? adminClasses 
                : (link.isSpecial ? specialClasses : normalClasses);

              return (
                <li key={link.href} className="whitespace-nowrap">
                  <button 
                    onClick={() => {
                      setIsOpen(false);
                      router.push(link.href);
                    }}
                    className={`${baseClasses} ${finalClasses}`}
                  >
                    {link.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      <LoginForm isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
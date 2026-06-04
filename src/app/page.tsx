"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard"; 
import PreguntasFrecuentes from "@/components/Preguntas_Frecuentes"; 
import Image from "next/image";
import Link from "next/link";

// 1. Importamos todas las bases de datos simuladas
import { ESMALTES_DATA } from "@/data/esmaltes";
import { BASE_BRILLO_DATA } from "@/data/baseBrillo";
import { LAMPARAS_DATA } from "@/data/lamparas";
import { COLECCIONES_DATA } from "@/data/colecciones";
import { ProductoBase } from "@/data/tipos";

// 2. Unimos todo y filtramos solo 4 productos en oferta
const ALL_PRODUCTS: ProductoBase[] = [
  ...ESMALTES_DATA,
  ...BASE_BRILLO_DATA,
  ...LAMPARAS_DATA,
  ...COLECCIONES_DATA,
];

const OFERTAS_DESTACADAS = ALL_PRODUCTS
  .filter((product) => product.discountPrice !== undefined)
  .slice(0, 4); // El slice(0, 4) corta la lista para devolver exactamente 4 elementos

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 2;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-white font-sans">
      
      {/* SECTION: HERO & SLIDER */}
      <section className="relative w-full h-[75vh] overflow-hidden">
        
        {/* --- DIAPOSITIVA 1: PORTADA PRINCIPAL --- */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === 0 ? "opacity-100 z-20" : "opacity-0 z-10"}`}>
          <Image
            src="/fondo_2.png"
            alt="Fondo Elizzeè Cosmética"
            fill
            className="absolute inset-0 object-cover"
          />
          <div className="absolute inset-0 bg-black/60 z-10" />

          <div className="relative z-20 max-w-[1440px] mx-auto px-6 md:px-12 h-full flex flex-col items-center justify-center text-center text-white">
            <Image
              src="/portada_elizee.webp" 
              alt="Elizze Logo" 
              width={350}
              height={140}
              className="object-contain mb-8 w-[250px] md:w-[350px] h-auto drop-shadow-lg"
            />
            <p className="text-white/90 text-xl md:text-2xl font-light max-w-2xl italic drop-shadow-md">
              &quot;La alta costura del color diseñada para manos de lujo&quot;
            </p>
            <Link 
              href="/esmaltes"
              className="inline-block cursor-pointer mt-12 bg-white text-black px-12 py-4 uppercase text-sm font-extrabold tracking-widest hover:scale-105 transition-all duration-300"
            >
              Comprar ahora
            </Link>
          </div>
        </div>

        {/* --- DIAPOSITIVA 2: SOBRE NOSOTROS --- */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === 1 ? "opacity-100 z-20" : "opacity-0 z-10"}`}>
          <Image
            src="/corazon.png"
            alt="Sobre Nosotros"
            fill
            className="absolute inset-0 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 z-10" />

          <div className="relative z-20 max-w-[1440px] mx-auto px-6 md:px-12 h-full flex flex-col items-center justify-center text-center text-white">
            <h2 className="text-3xl md:text-5xl font-light tracking-[0.2em] uppercase mb-6 drop-shadow-md">
              Conozca sobre nosotros
            </h2>
            <div className="w-20 h-[1px] bg-white/60 mb-8" />
            <p className="text-lg md:text-xl font-light text-white/90 italic max-w-2xl mb-10 leading-relaxed drop-shadow-md">
              En Elizzeè, la cosmética profesional de uñas nace de la búsqueda de la perfección. 
              Cada detalle está diseñado para manos que exigen lujo y distinción.
            </p>
            <button className="bg-white text-black px-12 py-4 uppercase text-sm font-extrabold tracking-widest hover:scale-105 transition-all duration-300 cursor-pointer">
              Nuestra Visión
            </button>
          </div>
        </div>

        {/* ELEMENTOS DE UI PERSISTENTES */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-16 items-start text-white/70 uppercase text-xs font-medium tracking-widest">
          <span className="[writing-mode:vertical-lr] rotate-180 hover:text-white cursor-pointer transition-colors whitespace-nowrap">Instagram</span>
          <span className="[writing-mode:vertical-lr] rotate-180 hover:text-white cursor-pointer transition-colors whitespace-nowrap">Facebook</span>
          <span className="[writing-mode:vertical-lr] rotate-180 hover:text-white cursor-pointer transition-colors whitespace-nowrap">Tiktok</span>
        </div>

        {/* CONTROLES DEL SLIDER */}
        <div className="absolute bottom-10 left-0 w-full px-6 md:px-12 z-30 flex items-center justify-center text-white">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCurrentSlide(0)}
              aria-label="Ir a la primera diapositiva"
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-500 hover:bg-white border border-white/50 ${currentSlide === 0 ? "bg-white scale-125" : "bg-transparent"}`} 
            />
            <button 
              onClick={() => setCurrentSlide(1)}
              aria-label="Ir a la segunda diapositiva"
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-500 hover:bg-white border border-white/50 ${currentSlide === 1 ? "bg-white scale-125" : "bg-transparent"}`} 
            />
          </div>
        </div>
      </section>

      {/* --- SECTION: PRODUCTOS EN OFERTA --- */}
      <section className="py-24 px-6 md:px-12 max-w-[1440px] mx-auto bg-white text-black">
        <div className="flex flex-col items-center mb-16 text-center">
          {/* Títulos actualizados al enfoque de negocio */}
          <h2 className="text-xs uppercase tracking-[0.5em] text-gray-400 mb-4 font-bold">Colección Premium</h2>
          <h3 className="text-3xl md:text-4xl font-light tracking-widest uppercase">Oportunidades Únicas</h3>
          <div className="w-12 h-[1px] bg-black mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {OFERTAS_DESTACADAS.map((product) => (
            <ProductCard 
              // Le pasamos la información completa para que el modal funcione perfectamente aquí también
              key={`${product.category}-${product.id}`}
              name={product.name}
              price={product.price}
              discountPrice={product.discountPrice}
              image={product.image}
              description={product.description}
              details={(product as any).details}
            />
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link 
            href="/ofertas" 
            className="inline-block border-b border-black pb-2 text-xs uppercase font-bold tracking-[0.3em] hover:text-gray-500 hover:border-gray-500 transition-colors cursor-pointer bg-transparent"
          >
            Explorar todas las ofertas
          </Link>
        </div>
        
        <PreguntasFrecuentes/>
      </section>

    </main>
  );
}
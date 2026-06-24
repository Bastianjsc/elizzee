// src/app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard"; 
import PreguntasFrecuentes from "@/components/Preguntas_Frecuentes"; 
import Image from "next/image";
import Link from "next/link";
import { ProductoBase } from "@/data/tipos";

export default function Home() {
  // --- ESTADOS PARA EL SLIDER ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 2;

  // --- NUEVOS ESTADOS PARA MONGODB ---
  const [featuredOffers, setFeaturedOffers] = useState<ProductoBase[]>([]);
  const [isLoadingOffers, setIsLoadingOffers] = useState(true);

  // --- EFECTO DEL SLIDER AUTOMÁTICO ---
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // --- EFECTO PARA TRAER LOS DATOS DE LA API ---
  useEffect(() => {
    const fetchFeaturedOffers = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }
        const data: ProductoBase[] = await response.json();
        
        // Filtramos los que tienen descuento y tomamos solo los primeros 4
        const offers = data
          .filter((product) => product.discountPrice !== undefined && product.discountPrice !== null)
          .slice(0, 4);

        setFeaturedOffers(offers);
      } catch (error) {
        console.error("Error cargando ofertas desde MongoDB:", error);
      } finally {
        setIsLoadingOffers(false);
      }
    };

    fetchFeaturedOffers();
  }, []);

  return (
    <main className="min-h-screen bg-[#FAFAFA] font-sans">
      
      {/* SECTION: HERO & SLIDER */}
      <section className="relative w-full h-[75vh] overflow-hidden">
        
        {/* --- DIAPOSITIVA 1: PORTADA PRINCIPAL --- */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === 0 ? "opacity-100 z-20" : "opacity-0 z-10"}`}>
          <Image
            src="/fondo_2.png"
            alt="Fondo Elizzeè Cosmética"
            fill
            className="absolute inset-0 object-cover"
            priority // Ayuda a que la primera imagen cargue súper rápido
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
              className="inline-block cursor-pointer mt-12 bg-[#FAFAFA] text-black px-12 py-4 uppercase text-sm font-extrabold tracking-widest hover:scale-105 transition-all duration-300"
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
      <section className="pt-24 pb-12 px-6 md:px-12 max-w-[1440px] mx-auto bg-[#FAFAFA] text-black">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-xs uppercase tracking-[0.5em] text-gray-400 mb-4 font-bold">Colección Premium</h2>
          <h3 className="text-3xl md:text-4xl font-light tracking-widest uppercase">Oportunidades Únicas</h3>
          <div className="w-12 h-[1px] bg-black mt-6" />
        </div>

        {isLoadingOffers ? (
          <div className="w-full flex justify-center py-12">
            <p className="text-gray-500 tracking-widest uppercase text-sm font-light animate-pulse">
              Cargando oportunidades únicas...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredOffers.map((product) => (
              <ProductCard 
                key={`${product.category}-${product.id}`}
                id={product.id}                
                category={product.category}     
                stock={product.stock}
                name={product.name}
                price={product.price}
                discountPrice={product.discountPrice}
                image={product.image}
                description={product.description}
                
                line={(product as any).line}
                colorFamily={(product as any).colorFamily}
                finish={(product as any).finish}
                size={(product as any).size}
                type={(product as any).type}
                quantity={(product as any).quantity}
                includes={(product as any).includes}
                details={product.details}
              />
            ))}
          </div>
        )}

        <div className="mt-20 text-center">
          <Link 
            href="/ofertas" 
            className="inline-block border-b border-black pb-2 text-xs uppercase font-bold tracking-[0.3em] hover:text-gray-500 hover:border-gray-500 transition-colors cursor-pointer bg-transparent"
          >
            Explorar todas las ofertas
          </Link>
        </div>
      </section>

      {/* --- SECTION: NUESTRO PROPÓSITO --- */}
      <section className="w-full bg-white py-16 md:py-24 px-6 md:px-12 font-sans border-t border-gray-100">
        <div className="max-w-[1440px] mx-auto">
          
          <h2 className="text-3xl md:text-4xl font-light text-center mb-10 md:mb-16 text-black tracking-widest uppercase">
            Nuestro propósito
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            
            <div className="relative w-full aspect-[4/3] md:aspect-[16/11] bg-gray-50 overflow-hidden group">
              <Image
                src="/fondo_3.webp"
                alt="Nuestro propósito - Elizzeè"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
              />
            </div>

            <div className="flex flex-col items-start gap-6 max-w-lg mx-auto lg:mx-0">
              <h3 className="text-2xl md:text-3xl font-light leading-snug text-black">
                Descubre una nueva forma de cuidar y embellecer tus uñas
              </h3>
              
              <p className="text-sm md:text-base text-gray-600 font-serif leading-relaxed">
                Diseñados para cuidar tus uñas en cada aplicación, nuestros esmaltes combinan color, facilidad y un acabado impecable, para que puedas disfrutar de un esmaltado bonito sin comprometer su bienestar. Su formato peel-off permite retirar el color de manera simple y sin acetona, ayudando a proteger tus uñas del daño y manteniéndolas cuidadas, sanas y listas para tu próximo momento de color.
              </p>

              <Link
                href="/nuestra-historia"
                className="mt-4 bg-black text-white px-10 py-4 text-xs md:text-sm uppercase font-bold tracking-[0.2em] hover:bg-gray-800 transition-colors duration-300 inline-block text-center"
              >
                Nuestra Historia
              </Link>
            </div>
            
          </div>
        </div>
      </section>

      {/* --- SECTION: PREGUNTAS FRECUENTES --- */}
      <section className="pb-24 bg-[#FAFAFA]">
        <PreguntasFrecuentes/>
      </section>

    </main>
  );
}
import React from "react";
import Image from "next/image";

export default function NuestraHistoriaPage() {
  return (
    <div className="min-h-screen bg-white w-full text-black font-sans">
      <div className="pt-16 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto">
        
        {/* ENCABEZADO */}
        <div className="flex flex-col items-center mb-16 text-center">
          <h1 className="text-3xl md:text-5xl font-light tracking-widest uppercase mb-4 text-balance">
            Nuestra Historia
          </h1>
          <div className="w-12 h-[1px] bg-black mt-8" />
        </div>

        {/* CONTENIDO EDITORIAL (Grid de 2 columnas) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-[1100px] mx-auto">
          
          {/* COLUMNA IZQUIERDA: Imagen */}
          <div className="w-full relative aspect-[4/5] bg-gray-50 flex items-center justify-center overflow-hidden">
            <Image
              src="/corazon.png"
              alt="Corazón Elizzeè"
              fill
              priority
              className="object-cover hover:scale-105 transition-transform duration-1000"
            />
          </div>

          {/* COLUMNA DERECHA: Textos */}
          <div className="flex flex-col gap-6 text-sm md:text-base text-gray-600 font-serif leading-relaxed">
            <p>
              En Santiago de Chile, durante el año 2023, comenzó a tomar forma una visión compartida por cinco personas que creían en una misma idea: la belleza más auténtica no siempre está en lo elaborado, sino en aquello que se siente simple, puro y cuidadosamente pensado.
            </p>
            
            <p>
              Desde sus primeros pasos, <span className="font-sans font-bold tracking-widest text-black">ELIZZEÈ</span> fue concebida como una marca inspirada en la elegancia de lo esencial. Una propuesta que mira el cuidado personal desde la calma, la pulcritud y la consciencia, rescatando el valor de esos pequeños gestos cotidianos que nos hacen sentir bien.
            </p>
            
            {/* Cita Destacada */}
            <blockquote className="border-l-[1px] border-black pl-6 my-6 font-sans text-lg md:text-xl font-light text-black tracking-wide leading-snug">
              Creamos cosas que funcionan mejor y duran más. Nuestros productos resuelven problemas reales con un diseño limpio y materiales honestos.
            </blockquote>

            <p>
              En septiembre de 2025, esa visión se convirtió oficialmente en una marca, dando inicio a nuestra primera línea de esmaltes peel off, desarrollados con una fórmula desarrollada en Alemania y elaborada en Estados Unidos, pensados para transformar la forma de cuidar las uñas: más fácil, más limpia y más delicada, sin complicaciones y sin dañarlas. ¡Pero este es solo el comienzo!
            </p>
            
            <p>
              <span className="font-sans font-bold tracking-widest text-black">ELIZZEÈ</span> proyecta su camino hacia un universo más amplio de cuidado personal, con la convicción de que cada persona merece sentirse cómoda, cuidada y en armonía con su propia piel. Una historia que recién comienza, pero que nace con un propósito claro: elevar lo simple y convertirlo en una experiencia de bienestar.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
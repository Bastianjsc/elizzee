// src/data/colecciones.ts
import { Coleccion } from "./tipos";

export const COLECCIONES_DATA: Coleccion[] = [
  {
    id: 1,
    name: "Café Allure",
    price: 85000,
    image: "/cafe_allure.webp",
    description:
      "Una armonía perfecta de tonos café y nudes otoñales. Diseñada para reflejar calidez, elegancia y sofisticación en tus manos.",
    category: "colecciones",
    quantity: "3 Esmaltes",
    includes: ["Naturale", "Chocolate Chic", "Brillo Profesional"],

    details: {
      Incluye: "3 esmaltes: Naturale, Chocolate Chic y Brillo Profesional",
    },
  },

  {
    id: 2,
    name: "Spark Icon",
    price: 45000,
    discountPrice: 39990,
    image: "/spark_icon.webp",
    description:
      "El dúo icónico para quienes aman destacar. Combina un color sólido de alta cobertura con destellos de glitter premium.",
    category: "colecciones",
    quantity: "2 Esmaltes",
    includes: ["Angel Pink", "Barbie Shine"],

    details: {
      Incluye: "2 esmaltes: Angel Pink y Barbie Shine",
    },
  },
];

/*


// src/components/ProductCard.tsx
import React from "react";
import Image from "next/image";

interface ProductCardProps {
  name: string;
  price: number;
  discountPrice?: number; // Nueva propiedad opcional
  image: string;
}

export default function ProductCard({ name, price, discountPrice, image }: ProductCardProps) {
  return (
    <div className="flex flex-col">
      {/* Contenedor de Imagen con bordes redondeados y efecto hover }
      <div className="group relative aspect-[3/4] overflow-hidden bg-gray-50 mb-6 cursor-pointer rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-500">
        
        {/* Etiqueta flotante de Oferta (Se muestra solo si existe discountPrice) }
        {discountPrice && (
          <div className="absolute top-3 left-3 z-10 bg-white/95 px-3 py-1 text-[9px] uppercase tracking-widest font-bold text-black rounded-sm shadow-sm">
            Oferta
          </div>
        )}

        <Image 
          src={image} 
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-all duration-700"
        />
        {/* Barra de añadir al carrito que sube al hacer hover }
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-black/90 text-white text-center text-[10px] uppercase font-bold tracking-widest">
          Ver detalle
        </div>
      </div>

      {/* Información del Producto }
      <div className="text-center flex flex-col items-center">
        <h4 className="text-[13px] uppercase font-bold tracking-widest mb-2">
          {name}
        </h4>
        
        {/* Lógica de Precios Condicional }
        <div className="flex flex-col items-center gap-0.5">
          {discountPrice ? (
            <>
              {/* Precio original tachado y en gris claro }
              <span className="text-xs font-medium text-gray-400 line-through">
                ${price.toFixed(2)}
              </span>
              {/* Precio de oferta destacado }
              <span className="text-sm font-bold text-black">
                ${discountPrice.toFixed(2)}
              </span>
            </>
          ) : (
            /* Si no hay oferta, muestra el precio normal centrado 
            <span className="text-sm font-bold text-gray-900 mt-4">
              ${price.toFixed(2)}
            </span>
          )}
        </div>
        
        {/* Botón Ver Detalle }
        <button className="mt-4 text-[9px] uppercase tracking-[0.2em] font-bold border-b border-black/10 pb-1 hover:border-black cursor-pointer transition-all duration-300 bg-transparent outline-none">
          Añadir al Carrito
        </button>
      </div>
    </div>
  );
}

*/
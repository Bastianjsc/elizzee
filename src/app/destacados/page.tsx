"use client";

import React from "react";
import ProductCard from "@/components/ProductCard";

// Ya no necesitamos los atributos de línea, color y tamaño para los filtros
const DESTACADOS_PRODUCTS = [
  {
    id: 1,
    name: "Angel Pink",
    price: 25.0,
    image: "/angel_pink.webp",
  },
  {
    id: 2,
    name: "Uva Antique",
    price: 18.5,
    image: "/uva_antique.webp",
  },
  {
    id: 3,
    name: "Merlot Luxury",
    price: 120.0,
    image: "/merlot.webp",
  },
  {
    id: 4,
    name: "Brillo Profesional",
    price: 30.0,
    image: "/brillo_de_unas.webp",
  },
];

export default function DestacadosPage() {
  return (
    <div className="min-h-screen bg-white w-full text-black">
      <div className="pt-12 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto">
        
        {/* ENCABEZADO DE LA PÁGINA */}
        <div className="flex flex-col items-center mb-16 text-center">
          <h1 className="text-3xl md:text-4xl font-light tracking-widest uppercase mb-4">
            Productos Destacados
          </h1>

          <p className="text-gray-500 text-sm max-w-2xl font-serif italic">
            Nuestra selección exclusiva. Los favoritos de Elizzeè reunidos en un 
            solo lugar para garantizar una manicura de lujo.
          </p>

          <div className="w-12 h-[1px] bg-black mt-6" />
        </div>

        {/* GRILLA DE PRODUCTOS DIRECTA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {DESTACADOS_PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
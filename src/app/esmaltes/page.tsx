// src/app/esmaltes/page.tsx (o la ruta donde tengas esta página)
"use client";

import React, { useState } from "react";
import ProductCard from "@/components/ProductCard";
import FiltrosProductos from "@/components/FiltrosProductos";
// Importamos la base de datos simulada y el tipo de dato
import { ESMALTES_DATA } from "@/data/esmaltes";
import { Esmalte } from "@/data/tipos";

export default function EsmaltesPage() {
  // 1. Estados (La memoria de la página) actualizados a los nuevos filtros
  const [lineFilter, setLineFilter] = useState("Todos");
  const [colorFamilyFilter, setColorFamilyFilter] = useState("Todos");
  const [finishFilter, setFinishFilter] = useState("Todos");
  const [sizeFilter, setSizeFilter] = useState("Todos");
  const [priceRangeFilter, setPriceRangeFilter] = useState("Todos");
  const [sortBy, setSortBy] = useState("destacados");

  // 2. Función para resetear todo a su estado original
  const clearFilters = () => {
    setLineFilter("Todos");
    setColorFamilyFilter("Todos");
    setFinishFilter("Todos");
    setSizeFilter("Todos");
    setPriceRangeFilter("Todos");
    setSortBy("destacados");
  };

  // 3. El Embudo: Filtrar productos de la base de datos importada
  let filteredProducts = ESMALTES_DATA.filter((product: Esmalte) => {
    // Filtros directos (Si es "Todos", pasa siempre)
    const matchLine = lineFilter === "Todos" || product.line === lineFilter;
    const matchColorFamily = colorFamilyFilter === "Todos" || product.colorFamily === colorFamilyFilter;
    const matchFinish = finishFilter === "Todos" || product.finish === finishFilter;
    const matchSize = sizeFilter === "Todos" || product.size === sizeFilter;

    // Lógica para el Rango de Precio
    let matchPrice = true; // Por defecto pasa
    if (priceRangeFilter !== "Todos") {
      // Tomamos el precio de oferta si existe, sino el precio normal
      const currentPrice = product.discountPrice || product.price;

      if (priceRangeFilter === "0-10000") {
        matchPrice = currentPrice <= 10000;
      } else if (priceRangeFilter === "10000-20000") {
        matchPrice = currentPrice > 10000 && currentPrice <= 20000;
      } else if (priceRangeFilter === "20000-50000") {
        matchPrice = currentPrice > 20000 && currentPrice <= 50000;
      } else if (priceRangeFilter === "50000-plus") {
        matchPrice = currentPrice > 50000;
      }
    }

    // El producto debe cumplir TODAS las condiciones para pasar el filtro
    return matchLine && matchColorFamily && matchFinish && matchSize && matchPrice;
  });

  // 4. Ordenamiento (Sorting)
  // Usamos un spread operator [...] para crear una copia de la lista antes de ordenarla y no mutar el original
  filteredProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.discountPrice || a.price;
    const priceB = b.discountPrice || b.price;

    if (sortBy === "precio-menor") {
      return priceA - priceB;
    }
    if (sortBy === "precio-mayor") {
      return priceB - priceA;
    }
    if (sortBy === "tamano-mayor") {
      // Como los tamaños son "15ml" o "30ml", los convertimos a números enteros para poder restarlos
      const numSizeA = parseInt(a.size);
      const numSizeB = parseInt(b.size);
      return numSizeB - numSizeA; 
    }
    // Si es "destacados", lo dejamos tal como viene de la base de datos
    return 0;
  });

  return (
    <div className="min-h-screen bg-white w-full text-black">
      <div className="pt-12 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="flex flex-col items-center mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-light tracking-widest uppercase mb-4">
            Esmaltes de Uñas
          </h1>

          <p className="text-gray-500 text-sm max-w-2xl font-serif italic">
            Descubre nuestra colección completa. La alta costura del color diseñada
            para manos de lujo.
          </p>

          <div className="w-12 h-[1px] bg-black mt-6" />
        </div>

        {/* Pasamos los estados correctos al nuevo componente de Filtros */}
        <FiltrosProductos
          tipoCategoria="esmaltes"
          lineFilter={lineFilter}
          setLineFilter={setLineFilter}
          colorFamilyFilter={colorFamilyFilter}
          setColorFamilyFilter={setColorFamilyFilter}
          finishFilter={finishFilter}
          setFinishFilter={setFinishFilter}
          sizeFilter={sizeFilter}
          setSizeFilter={setSizeFilter}
          priceRangeFilter={priceRangeFilter}
          setPriceRangeFilter={setPriceRangeFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          clearFilters={clearFilters}
        />

{filteredProducts.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {filteredProducts.map((product) => (
      <ProductCard
      key={product.id}
      name={product.name}
      price={product.price}
      discountPrice={product.discountPrice}
      image={product.image}
      description={product.description}
      details={product.details}
    />
    ))}
  </div>
) : (
  <div className="text-center py-20 flex flex-col items-center">
    <p className="text-gray-500 uppercase tracking-widest text-sm mb-6">
      No se encontraron productos con estas características.
    </p>

    <button
      onClick={clearFilters}
      className="border-b border-black pb-1 text-xs uppercase font-bold tracking-[0.2em] cursor-pointer hover:text-gray-600 transition-colors bg-transparent outline-none"
    >
      Limpiar búsqueda
    </button>
  </div>
)}
      </div>
    </div>
  );
}
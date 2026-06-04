// src/app/base-brillo/page.tsx (Ajusta la ruta según tu proyecto)
"use client";

import React, { useState } from "react";
import ProductCard from "@/components/ProductCard";
import FiltrosProductos from "@/components/FiltrosProductos";
// Importamos la base de datos simulada y su esquema
import { BASE_BRILLO_DATA } from "@/data/baseBrillo";
import { BaseBrillo } from "@/data/tipos";

export default function BrilloPage() {
  // 1. Estados: Solo dejamos los que realmente le importan a esta categoría
  const [typeFilter, setTypeFilter] = useState("Todos");
  const [sizeFilter, setSizeFilter] = useState("Todos");
  const [priceRangeFilter, setPriceRangeFilter] = useState("Todos");
  const [sortBy, setSortBy] = useState("destacados");

  // 2. Función para resetear
  const clearFilters = () => {
    setTypeFilter("Todos");
    setSizeFilter("Todos");
    setPriceRangeFilter("Todos");
    setSortBy("destacados");
  };

  // 3. El Embudo: Lógica de filtrado
  let filteredProducts = BASE_BRILLO_DATA.filter((product: BaseBrillo) => {
    const matchType = typeFilter === "Todos" || product.type === typeFilter;
    const matchSize = sizeFilter === "Todos" || product.size === sizeFilter;

    // Lógica para el Rango de Precio
    let matchPrice = true;
    if (priceRangeFilter !== "Todos") {
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

    return matchType && matchSize && matchPrice;
  });

  // 4. Ordenamiento (Sorting)
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
      const numSizeA = parseInt(a.size);
      const numSizeB = parseInt(b.size);
      return numSizeB - numSizeA;
    }
    return 0; // "destacados"
  });

  return (
    <div className="min-h-screen bg-white w-full text-black">
      <div className="pt-12 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto">

        <div className="flex flex-col items-center mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-light tracking-widest uppercase mb-4">
            Base y Brillo de Uñas
          </h1>

          <p className="text-gray-500 text-sm max-w-2xl font-serif italic">
            El secreto para una manicura duradera y un acabado perfecto.
            Protege tu uña natural y sella tu color con calidad profesional.
          </p>

          <div className="w-12 h-[1px] bg-black mt-6" />
        </div>

        {/* Solo pasamos las props que Base y Brillo necesita */}
        <FiltrosProductos
          tipoCategoria="base-brillo"
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
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
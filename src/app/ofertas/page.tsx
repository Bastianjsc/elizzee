// src/app/ofertas/page.tsx
"use client";

import React, { useState } from "react";
import ProductCard from "@/components/ProductCard";
import FiltrosProductos from "@/components/FiltrosProductos";

// Importamos TODAS las bases de datos y el molde general
import { ESMALTES_DATA } from "@/data/esmaltes";
import { BASE_BRILLO_DATA } from "@/data/baseBrillo";
import { LAMPARAS_DATA } from "@/data/lamparas";
import { COLECCIONES_DATA } from "@/data/colecciones";
import { ProductoBase } from "@/data/tipos";

// 1. Unimos todo el catálogo en una sola gran lista
const ALL_PRODUCTS: ProductoBase[] = [
  ...ESMALTES_DATA,
  ...BASE_BRILLO_DATA,
  ...LAMPARAS_DATA,
  ...COLECCIONES_DATA,
];

// 2. Filtramos INICIALMENTE solo los que tienen descuento
const OFERTAS_PRODUCTS = ALL_PRODUCTS.filter(
  (product) => product.discountPrice !== undefined
);

export default function OfertasPage() {
  // 3. Estados: Solo Rango de Precio y Orden
  const [priceRangeFilter, setPriceRangeFilter] = useState("Todos");
  const [sortBy, setSortBy] = useState("destacados");

  // Función para resetear
  const clearFilters = () => {
    setPriceRangeFilter("Todos");
    setSortBy("destacados");
  };

  // 4. El Embudo: Lógica de filtrado de precios
  let filteredProducts = OFERTAS_PRODUCTS.filter((product) => {
    let matchPrice = true;
    
    if (priceRangeFilter !== "Todos") {
      // Usamos discountPrice de forma segura porque ya filtramos los que no tienen
      const currentPrice = product.discountPrice as number;

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

    return matchPrice;
  });

  // 5. Ordenamiento (Sorting)
  filteredProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.discountPrice as number;
    const priceB = b.discountPrice as number;

    if (sortBy === "precio-menor") {
      return priceA - priceB;
    }
    if (sortBy === "precio-mayor") {
      return priceB - priceA;
    }
    return 0; // "destacados"
  });

  return (
    <div className="min-h-screen bg-white w-full text-black">
      <div className="pt-12 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <h1 className="text-3xl md:text-4xl font-light tracking-widest uppercase mb-4 text-red-700">
            Ofertas Especiales
          </h1>

          <p className="text-gray-500 text-sm max-w-2xl font-serif italic">
            Descubre nuestros productos con descuentos exclusivos. La misma
            calidad de alta costura para tus manos, a precios irresistibles por
            tiempo limitado.
          </p>

          <div className="w-12 h-[1px] bg-red-700 mt-6" />
        </div>

        {/* Solo le enviamos lo necesario al componente de filtros */}
        <FiltrosProductos
          tipoCategoria="ofertas"
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
                key={`${product.category}-${product.id}`}
                name={product.name}
                price={product.price}
                discountPrice={product.discountPrice}
                image={product.image}
                // ¡AQUÍ ESTÁ LA SOLUCIÓN! Le pasamos los datos que faltaban
                description={product.description}
                details={(product as any).details} // Usamos 'any' por si TS no reconoce 'details' en ProductoBase
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 flex flex-col items-center">
            <p className="text-gray-500 uppercase tracking-widest text-sm mb-6">
              No se encontraron ofertas con estas características.
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
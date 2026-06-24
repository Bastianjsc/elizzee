"use client";

import React, { useState } from "react";
import ProductCard from "@/components/ProductCard";
import FiltrosProductos from "@/components/FiltrosProductos";

const ARMA_TU_KIT_PRODUCTS = [
  {
    id: 1,
    name: "KIT Pro",
    price: 120.0,
    image: "/KitPro.webp",
    size: "Grande",
    kitType: "Kit Pro",
  },
  {
    id: 2,
    name: "KIT Duo",
    price: 85.0,
    image: "/KitDuo.webp",
    size: "Mediano",
    kitType: "Kit Duo",
  },
  {
    id: 3,
    name: "KIT Básico",
    price: 45.0,
    image: "/KitBasico.webp",
    size: "Pequeño",
    kitType: "Kit Básico",
  },
];

export default function ArmaTuKitPage() {
  const [typeFilter, setTypeFilter] = useState("Todos");
  const [sizeFilter, setSizeFilter] = useState("Todos");
  const [maxPrice, setMaxPrice] = useState("Todos");

  const clearFilters = () => {
    setTypeFilter("Todos");
    setSizeFilter("Todos");
    setMaxPrice("Todos");
  };

  const filteredProducts = ARMA_TU_KIT_PRODUCTS.filter((product) => {
    const matchType =
      typeFilter === "Todos" || product.kitType === typeFilter;

    const matchSize =
      sizeFilter === "Todos" || product.size === sizeFilter;

    const matchPrice =
      maxPrice === "Todos" || product.price <= Number(maxPrice);

    return matchType && matchSize && matchPrice;
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] w-full text-black">
      <div className="pt-12 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="flex flex-col items-center mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-light tracking-widest uppercase mb-4">
            Arma tu Kit
          </h1>

          <p className="text-gray-500 text-sm max-w-2xl font-serif italic">
            Selecciona tus favoritos y crea el set perfecto. Combina esmaltes,
            bases y herramientas profesionales a tu medida.
          </p>

          <div className="w-12 h-[1px] bg-black mt-6" />
        </div>

        <FiltrosProductos
          tipoCategoria="kit"
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          sizeFilter={sizeFilter}
          setSizeFilter={setSizeFilter}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          clearFilters={clearFilters}
        />

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
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
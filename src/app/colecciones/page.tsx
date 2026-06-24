// src/app/colecciones/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import FiltrosProductos from "@/components/FiltrosProductos";
import { Coleccion } from "@/data/tipos";

export default function ColeccionesPage() {
  // --- NUEVOS ESTADOS PARA MONGODB ---
  const [products, setProducts] = useState<Coleccion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- Estados de Filtros ---
  const [quantityFilter, setQuantityFilter] = useState("Todos");
  const [priceRangeFilter, setPriceRangeFilter] = useState("Todos");
  const [sortBy, setSortBy] = useState("destacados");

  // --- EFECTO PARA TRAER LOS DATOS DE LA API ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }
        const data = await response.json();
        
        setProducts(data);
      } catch (error) {
        console.error("Error cargando productos desde MongoDB:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Función para resetear
  const clearFilters = () => {
    setQuantityFilter("Todos");
    setPriceRangeFilter("Todos");
    setSortBy("destacados");
  };

  // --- EL EMBUDO DE FILTRADO ---
  let filteredProducts = products.filter((product: Coleccion) => {
    // PRIMERO: Asegurarnos de que solo muestre la categoría "colecciones"
    if (product.category !== "colecciones") return false;

    // SEGUNDO: Filtros específicos
    const matchQuantity = quantityFilter === "Todos" || product.quantity === quantityFilter;

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

    return matchQuantity && matchPrice;
  });

  // --- ORDENAMIENTO (Sorting) ---
  filteredProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.discountPrice || a.price;
    const priceB = b.discountPrice || b.price;

    if (sortBy === "precio-menor") {
      return priceA - priceB;
    }
    if (sortBy === "precio-mayor") {
      return priceB - priceA;
    }
    // No agregamos "tamano-mayor" porque las colecciones no manejan tamaño en ml.
    return 0; // "destacados"
  });

  // --- PANTALLA DE CARGA ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] w-full flex items-center justify-center text-black">
        <p className="text-gray-500 tracking-widest uppercase text-sm font-light animate-pulse">
          Cargando colecciones exclusivas...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] w-full text-black">
      <div className="pt-12 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="flex flex-col items-center mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-light tracking-widest uppercase mb-4">
            Nuestras Colecciones
          </h1>

          <p className="text-gray-500 text-sm max-w-2xl font-serif italic">
            Descubre nuestras colecciones exclusivas. Combinaciones perfectas
            diseñadas con estilo y nivel de cuidado profesional.
          </p>

          <div className="w-12 h-[1px] bg-black mt-6" />
        </div>

        <FiltrosProductos
          tipoCategoria="colecciones"
          quantityFilter={quantityFilter}
          setQuantityFilter={setQuantityFilter}
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
                id={product.id}                
                category={product.category}     
                stock={product.stock}
                name={product.name}
                price={product.price}
                discountPrice={product.discountPrice}
                image={product.image}
                description={product.description}
                quantity={product.quantity}
                includes={product.includes}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 flex flex-col items-center">
            <p className="text-gray-500 uppercase tracking-widest text-sm mb-6">
              No se encontraron colecciones con estas características.
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
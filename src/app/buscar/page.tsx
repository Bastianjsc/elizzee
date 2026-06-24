import React from "react";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { SearchX } from "lucide-react";

export const dynamic = "force-dynamic";

async function getSearchResults(query: string) {
  if (!query) return [];

  try {
    await connectToDatabase();
    
    // Usamos una expresión regular (RegExp) para ignorar mayúsculas y minúsculas ('i')
    const regex = new RegExp(query, "i");

    // Buscamos productos donde la palabra coincida con el nombre, descripción o categoría
    const rawProducts = await mongoose.connection.db
      ?.collection("products")
      .find({
        $or: [
          { name: { $regex: regex } },
          { description: { $regex: regex } },
          { category: { $regex: regex } },
          { colorFamily: { $regex: regex } }
        ]
      })
      .toArray();

    if (rawProducts) {
      return rawProducts.map((p) => ({
        ...p,
        _id: p._id.toString(), // Convertimos ObjectId a string para Next.js
      }));
    }
  } catch (error) {
    console.error("Error en la búsqueda:", error);
  }
  return [];
}

// CAMBIO APLICADO AQUÍ: searchParams ahora es una Promesa
export default async function BuscarPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  // Esperamos a que Next.js procese la URL antes de extraer la 'q'
  const params = await searchParams;
  const query = params?.q || "";
  
  const products = await getSearchResults(query);

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans pt-12 pb-24 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        
        <div className="flex flex-col items-center text-center mb-16">
          <h1 className="text-2xl md:text-4xl font-light tracking-widest uppercase mb-4">
            Resultados de búsqueda
          </h1>
          <p className="text-gray-500 font-serif italic text-sm md:text-base">
            {query 
              ? `Mostrando resultados para "${query}"` 
              : "Ingresa un término en la barra superior para buscar."}
          </p>
          <div className="w-12 h-[1px] bg-black mt-6" />
        </div>

        {!query ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <SearchX className="w-16 h-16 mb-4 opacity-50" />
            <p className="tracking-widest uppercase text-sm">Escribe algo para buscar</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product: any) => (
              <ProductCard
                key={product._id}
                id={product.id}
                category={product.category}
                stock={product.stock}
                name={product.name}
                price={product.price}
                discountPrice={product.discountPrice}
                image={product.image}
                description={product.description}
                line={product.line}
                colorFamily={product.colorFamily}
                finish={product.finish}
                size={product.size}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <SearchX className="w-16 h-16 mb-6 text-gray-300" />
            <h2 className="text-xl font-light tracking-widest uppercase mb-2">
              No se encontraron productos
            </h2>
            <p className="text-gray-500 font-serif italic text-sm mb-8">
              No tenemos resultados que coincidan con &quot;{query}&quot;. Intenta con otras palabras como &quot;rosado&quot;, &quot;lámpara&quot; o &quot;brillo&quot;.
            </p>
            <Link 
              href="/esmaltes" 
              className="bg-black text-white px-8 py-4 text-xs uppercase font-bold tracking-[0.2em] hover:bg-gray-800 transition-colors"
            >
              Ver todos los productos
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";

async function getRandomProduct() {
  try {
    await connectToDatabase();
    const randomProducts = await mongoose.connection.db
      ?.collection("products")
      .aggregate([{ $sample: { size: 1 } }])
      .toArray();

    if (randomProducts && randomProducts.length > 0) {
      const product = randomProducts[0];
      product._id = product._id.toString(); 
      return product;
    }
  } catch (error) {
    console.error("Error al conectar con MongoDB en NotFound:", error);
  }
  return null;
}

export default async function NotFound() {
  const dbProduct = await getRandomProduct();

  const fallbackProduct = {
    name: "Angel Pink",
    price: 14990,
    category: "esmaltes",
    image: "/angel_pink.webp",
    description: "Un rosa tierno y angelical de alta costura, ideal para manicuras elegantes y sofisticadas."
  };

  const product = dbProduct || fallbackProduct;

  return (
    <div className="min-h-screen bg-white text-black font-sans w-full flex items-center justify-center p-6 md:p-12 lg:p-24">
      <div className="max-w-[1440px] mx-auto w-full grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* COLUMNA IZQUIERDA: Imagen */}
        <div className="w-full h-full relative aspect-square md:aspect-auto min-h-[350px] md:min-h-[500px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            className="object-contain"
          />
        </div>

        {/* COLUMNA DERECHA: Contenido */}
        <div className="flex flex-col items-start gap-12">
          
          {/* Mensaje de Error */}
          <div className="flex flex-col items-start gap-6 max-w-2xl">
            {/* CAMBIO AQUÍ: font-bold para ERROR 404 */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-widest mb-2 uppercase">
              ERROR 404
            </h1>
            <p className="text-xl md:text-2xl font-light leading-relaxed">
              Como un esmalte de mala calidad, esta página se ha despegado :(
            </p>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              No pudimos encontrar la URL solicitada. Mientras tanto, te invitamos a 
              conocer uno de nuestros productos recomendados.
            </p>
          </div>

          {/* Ficha del Producto */}
          <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-8 border-y border-gray-200 py-10">
            <div className="w-28 h-28 relative aspect-square bg-gray-50 flex items-center justify-center flex-shrink-0">
              <Image
                src={product.image}
                alt={`${product.name} miniatura`}
                width={100}
                height={100}
                style={{ width: "auto", height: "auto" }}
                className="object-contain"
              />
            </div>
            
            <div className="flex flex-col items-start gap-1 flex-1">
              <h2 className="text-xl md:text-2xl font-semibold uppercase tracking-widest leading-snug">
                {product.name}
              </h2>
              <span className="text-gray-500 text-sm md:text-base capitalize">
                {product.line ? `Línea ${product.line}` : product.category}
              </span>
              <p className="mt-2 text-xl md:text-2xl font-medium text-gray-900">
                {product.price.toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                  minimumFractionDigits: 0
                })}
              </p>
            </div>
          </div>

          {/* Descripción */}
          <div className="flex flex-col items-start gap-12 max-w-3xl">
            <p className="text-sm md:text-base leading-relaxed text-gray-700">
              {product.description}
            </p>
            
            <Link
              href="/"
              className="group flex items-center gap-4 bg-black text-white px-8 py-4 text-sm md:text-base uppercase font-bold tracking-[0.2em] hover:bg-gray-800 transition-colors duration-300 rounded-full"
            >
              Vuelve al Inicio
              <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
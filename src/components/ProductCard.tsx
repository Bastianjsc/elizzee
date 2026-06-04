"use client";

import React, { useState } from "react";
import Image from "next/image";
import CardDetalle from "./CardDetalle";

interface ProductCardProps {
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  description?: string;

  details?: Record<string, string>;
}

export default function ProductCard({
  name,
  price,
  discountPrice,
  image,
  description,
  details,
}: ProductCardProps) {

  console.log("DETAILS PRODUCTCARD:", details);

  const [isDetalleOpen, setIsDetalleOpen] = useState(false);

  const formatPrice = (amount: number) => {
    return amount.toLocaleString("es-CL");
  };

  return (
    <>
      <div className="flex flex-col">

        <div
          onClick={() => setIsDetalleOpen(true)}
          className="group relative aspect-[3/4] overflow-hidden bg-gray-50 mb-6 cursor-pointer rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-500"
        >

          {discountPrice && (
            <div className="absolute top-3 left-3 z-10 bg-white px-3 py-1 text-[9px] uppercase tracking-widest font-bold rounded-sm">
              Oferta
            </div>
          )}

          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-all duration-700"
          />

          <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-black/90 text-white text-center text-[10px] uppercase font-bold tracking-widest">
            Ver detalle
          </div>

        </div>

        <div className="text-center">

          <h4 className="text-[13px] uppercase font-bold tracking-widest mb-2">
            {name}
          </h4>

          {discountPrice ? (
            <>
              <div className="line-through text-gray-400 text-xs">
                ${formatPrice(price)}
              </div>

              <div className="font-bold">
                ${formatPrice(discountPrice)}
              </div>
            </>
          ) : (
            <div className="font-bold">
              ${formatPrice(price)}
            </div>
          )}

        </div>
      </div>

      {isDetalleOpen && (
        
        <CardDetalle
          onClose={() => setIsDetalleOpen(false)}
          name={name}
          price={price}
          discountPrice={discountPrice}
          image={image}
          description={description}
          details={details}
        />
      )}
    </>
  );
}
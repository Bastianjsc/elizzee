// src/components/ProductCard.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import CardDetalle from "./CardDetalle";
import { useCart, ProductoBase } from "@/context/CartContext";

interface ProductCardProps {
  id: number;
  category: ProductoBase["category"];
  stock: number;

  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  description?: string;

  line?: string;
  colorFamily?: string;
  finish?: string;
  size?: string;
  type?: string;
  quantity?: string;
  includes?: string[];
  details?: Record<string, string>;
}

export default function ProductCard({
  id,
  category,
  stock,
  name,
  price,
  discountPrice,
  image,
  description,
  line,
  colorFamily,
  finish,
  size,
  type,
  quantity,
  includes,
  details,
}: ProductCardProps) {
  const [isDetalleOpen, setIsDetalleOpen] = useState(false);

  const { addToCart } = useCart();

  const formatPrice = (amount?: number) => {
    if (amount === undefined || amount === null || isNaN(amount)) {
      return "0";
    }

    return amount.toLocaleString("es-CL");
  };

  const addProductToCart = () => {
    const productToAdd = {
      id,
      category,
      stock,
      name,
      price,
      discountPrice,
      image,
      description: description || "",
      line,
      colorFamily,
      finish,
      size,
      type,
      quantity,
      includes,
      details,
    } as ProductoBase;

    addToCart(productToAdd);
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    addProductToCart();
  };

  return (
    <>
      <div className="flex flex-col h-full">
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

        <div className="text-center flex flex-col flex-grow justify-between">
          <div>
            <h4 className="text-[13px] uppercase font-bold tracking-widest mb-2">
              {name}
            </h4>

            {discountPrice ? (
              <>
                <div className="line-through text-gray-400 text-xs">
                  ${formatPrice(price)}
                </div>

                <div className="font-bold mb-4">
                  ${formatPrice(discountPrice)}
                </div>
              </>
            ) : (
              <div className="font-bold mb-4">${formatPrice(price)}</div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={stock <= 0}
            className={`
              mt-auto
              w-full
              border
              py-3
              text-[10px]
              uppercase
              tracking-widest
              font-bold
              transition-colors
              duration-300
              ${
                stock > 0
                  ? "border-black text-black hover:bg-black hover:text-white cursor-pointer"
                  : "border-gray-300 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            {stock > 0 ? "Añadir al carrito" : "Sin stock"}
          </button>
        </div>
      </div>

      {isDetalleOpen && (
        <CardDetalle
          onClose={() => setIsDetalleOpen(false)}
          id={id}
          category={category}
          stock={stock}
          name={name}
          price={price}
          discountPrice={discountPrice}
          image={image}
          description={description}
          line={line}
          colorFamily={colorFamily}
          finish={finish}
          size={size}
          type={type}
          quantity={quantity}
          includes={includes}
          details={details}
          onAddToCart={addProductToCart}
        />
      )}
    </>
  );
}
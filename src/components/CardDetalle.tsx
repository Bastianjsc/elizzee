// src/components/CardDetalle.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductoBase } from "@/context/CartContext";

interface CardDetalleProps {
  onClose: () => void;

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

  onAddToCart?: () => void;
}

export default function CardDetalle({
  onClose,
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
  onAddToCart,
}: CardDetalleProps) {
  const [addedMessage, setAddedMessage] = useState(false);

  const formatPrice = (amount?: number) => {
    if (amount === undefined || amount === null || isNaN(amount)) {
      return "0";
    }

    return amount.toLocaleString("es-CL");
  };

  const buildDetailsList = () => {
    const list: { label: string; value: string }[] = [];

    list.push({ label: "Categoría", value: category });
    list.push({ label: "Stock", value: String(stock) });

    if (line) list.push({ label: "Línea", value: line });
    if (colorFamily) list.push({ label: "Color", value: colorFamily });
    if (finish) list.push({ label: "Acabado", value: finish });
    if (type) list.push({ label: "Tipo", value: type });
    if (size) list.push({ label: "Tamaño", value: size });
    if (quantity) list.push({ label: "Cantidad", value: quantity });

    if (includes && includes.length > 0) {
      list.push({ label: "Incluye", value: includes.join(", ") });
    }

    if (details) {
      Object.entries(details).forEach(([key, value]) => {
        list.push({ label: key, value });
      });
    }

    return list;
  };

  const productDetails = buildDetailsList();

  const handleAddToCart = () => {
    if (stock <= 0) {
      return;
    }

    if (onAddToCart) {
      onAddToCart();
    }

    setAddedMessage(true);

    setTimeout(() => {
      setAddedMessage(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#FAFAFA] rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-3xl text-gray-500 hover:text-black transition cursor-pointer"
        >
          ×
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative h-[400px] md:h-[650px] bg-gray-100">
            <Image src={image} alt={name} fill className="object-cover" />
          </div>

          <div className="p-8 md:p-10 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest mb-4">
              {name}
            </h2>

            <div className="mb-6">
              {discountPrice ? (
                <div className="flex items-center gap-4">
                  <span className="text-gray-400 line-through text-lg">
                    ${formatPrice(price)}
                  </span>

                  <span className="text-2xl font-bold text-black">
                    ${formatPrice(discountPrice)}
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-black">
                  ${formatPrice(price)}
                </span>
              )}
            </div>

            {description && (
              <p className="text-gray-600 leading-relaxed mb-8">
                {description}
              </p>
            )}

            {productDetails.length > 0 && (
              <div className="space-y-3 border-t border-gray-200 pt-6">
                <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400 mb-4">
                  Detalles del producto
                </h3>

                {productDetails.map((detail, index) => (
                  <div
                    key={index}
                    className="flex justify-between gap-4 border-b border-gray-100 pb-2"
                  >
                    <span className="font-semibold text-gray-800">
                      {detail.label}
                    </span>

                    <span className="text-gray-600 text-right">
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={handleAddToCart}
              disabled={stock <= 0}
              className={`
                mt-10
                py-4
                uppercase
                tracking-widest
                text-sm
                font-bold
                transition
                ${
                  stock > 0
                    ? "bg-black text-white hover:bg-gray-800 cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }
              `}
            >
              {stock > 0 ? "Añadir al carrito" : "Sin stock"}
            </button>

            {addedMessage && (
              <p className="mt-4 text-center text-sm font-semibold text-green-700 uppercase tracking-widest">
                Producto agregado al carrito
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
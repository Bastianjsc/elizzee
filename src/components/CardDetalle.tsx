// src/components/CardDetalle.tsx
"use client";

import Image from "next/image";

interface CardDetalleProps {
  onClose: () => void;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  description?: string;

  details?: Record<string, string>;
}

export default function CardDetalle({
  onClose,
  name,
  price,
  discountPrice,
  image,
  description,
  details,
}: CardDetalleProps) {

  const formatPrice = (amount: number) => {
    return amount.toLocaleString("es-CL");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">

      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full overflow-hidden relative">

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-3xl text-gray-500 hover:text-black transition cursor-pointer"
        >
          ×
        </button>

        <div className="grid md:grid-cols-2">

          {/* Imagen */}
          <div className="relative h-[400px] md:h-[650px] bg-gray-100">

            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
            />

          </div>

          {/* Información */}
          <div className="p-8 md:p-10 flex flex-col justify-center">

            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest mb-4">
              {name}
            </h2>

            {/* Precio */}
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

            {/* Descripción */}
            {description && (
              <p className="text-gray-600 leading-relaxed mb-8">
                {description}
              </p>
            )}

            {/* Características dinámicas */}
            {details && (
              <div className="space-y-3 border-t border-gray-200 pt-6">

                <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400 mb-4">
                  Detalles del producto
                </h3>

                {Object.entries(details).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between gap-4 border-b border-gray-100 pb-2"
                  >
                    <span className="font-semibold text-gray-800">
                      {key}
                    </span>

                    <span className="text-gray-600">
                      {value}
                    </span>
                  </div>
                ))}

              </div>
            )}

            {/* Botón carrito */}
            <button
              className="
                mt-10
                bg-black
                text-white
                py-4
                uppercase
                tracking-widest
                text-sm
                font-bold
                hover:bg-gray-800
                transition
                cursor-pointer
              "
            >
              Añadir al carrito
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
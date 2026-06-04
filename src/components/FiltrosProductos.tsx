// src/components/FiltrosProductos.tsx
import React from "react";

type TipoCategoria =
  | "esmaltes"
  | "base-brillo"
  | "lamparas"
  | "colecciones"
  | "kit"
  | "ofertas";

interface FiltrosProductosProps {
  tipoCategoria: TipoCategoria;

  // Esmaltes
  lineFilter?: string;
  setLineFilter?: (value: string) => void;
  colorFamilyFilter?: string;
  setColorFamilyFilter?: (value: string) => void;
  finishFilter?: string;
  setFinishFilter?: (value: string) => void;

  // Base y Brillo
  typeFilter?: string;
  setTypeFilter?: (value: string) => void;

  // Colecciones
  quantityFilter?: string;
  setQuantityFilter?: (value: string) => void;

  // Tamaño (Aplica a casi todos menos Colecciones/Ofertas)
  sizeFilter?: string;
  setSizeFilter?: (value: string) => void;

  // Precios y Ordenamiento
  priceRangeFilter: string;
  setPriceRangeFilter: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;

  clearFilters: () => void;
}

export default function FiltrosProductos({
  tipoCategoria,
  lineFilter = "Todos",
  setLineFilter,
  colorFamilyFilter = "Todos",
  setColorFamilyFilter,
  finishFilter = "Todos",
  setFinishFilter,
  typeFilter = "Todos",
  setTypeFilter,
  sizeFilter = "Todos",
  setSizeFilter,
  quantityFilter = "Todos",
  setQuantityFilter,
  priceRangeFilter,
  setPriceRangeFilter,
  sortBy,
  setSortBy,
  clearFilters,
}: FiltrosProductosProps) {
  // Función auxiliar para saber si debemos mostrar el filtro de tamaño
  const showSizeFilter =
    tipoCategoria !== "colecciones" && tipoCategoria !== "ofertas" && tipoCategoria !== "kit";

  return (
    <div className="mb-12 border border-gray-200 p-6 rounded-sm">
      <h4 className="text-sm uppercase tracking-[0.3em] font-bold mb-6 text-center">
        Filtros y Orden
      </h4>

      {/* Usamos flex-wrap para que se adapte mejor a la cantidad de filtros dinámicos */}
      <div className="flex flex-wrap gap-4 items-center justify-center">
        
        {/* --- FILTROS DE ESMALTES --- */}
        {tipoCategoria === "esmaltes" && (
          <>
            <select
              value={lineFilter}
              onChange={(e) => setLineFilter?.(e.target.value)}
              className="border border-gray-300 p-3 text-sm bg-white min-w-[160px]"
            >
              <option value="Todos">Línea</option>
              <option value="Basica">Línea básica</option>
              <option value="Premium">Línea premium</option>
            </select>

            <select
              value={colorFamilyFilter}
              onChange={(e) => setColorFamilyFilter?.(e.target.value)}
              className="border border-gray-300 p-3 text-sm bg-white min-w-[160px]"
            >
              <option value="Todos">Color</option>
              <option value="Nudes y Neutros">Nudes y Neutros</option>
              <option value="Rojos y Vinos">Rojos y Vinos</option>
              <option value="Rosados">Rosados</option>
              <option value="Tonos Oscuros">Tonos Oscuros</option>
              <option value="Pasteles">Pasteles</option>
              <option value="Vibrantes">Vibrantes</option>
            </select>

            <select
              value={finishFilter}
              onChange={(e) => setFinishFilter?.(e.target.value)}
              className="border border-gray-300 p-3 text-sm bg-white min-w-[160px]"
            >
              <option value="Todos">Acabado</option>
              <option value="Con Glitter">Con Glitter</option>
              <option value="Sin Glitter">Sin Glitter</option>
            </select>
          </>
        )}

        {/* --- FILTROS DE BASE Y BRILLO --- */}
        {tipoCategoria === "base-brillo" && (
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter?.(e.target.value)}
            className="border border-gray-300 p-3 text-sm bg-white min-w-[160px]"
          >
            <option value="Todos">Tipo</option>
            <option value="Base">Base</option>
            <option value="Brillo">Brillo</option>
            <option value="Fortalecedor">Fortalecedor</option>
          </select>
        )}

        {/* --- FILTROS DE COLECCIONES --- */}
        {tipoCategoria === "colecciones" && (
          <select
            value={quantityFilter}
            onChange={(e) => setQuantityFilter?.(e.target.value)}
            className="border border-gray-300 p-3 text-sm bg-white min-w-[160px]"
          >
            <option value="Todos">Tamaño Pack</option>
            <option value="2 Esmaltes">2 Esmaltes</option>
            <option value="3 Esmaltes">3 Esmaltes</option>
            <option value="4 Esmaltes">4 Esmaltes</option>
            <option value="Set Completo">Set Completo</option>
          </select>
        )}

        {/* --- FILTRO DE TAMAÑO (Dinámico) --- */}
        {showSizeFilter && setSizeFilter && (
          <select
            value={sizeFilter}
            onChange={(e) => setSizeFilter(e.target.value)}
            className="border border-gray-300 p-3 text-sm bg-white min-w-[160px]"
          >
            {tipoCategoria === "lamparas" ? (
              <>
                <option value="Todos">Tamaño</option>
                <option value="Mini">Mini</option>
                <option value="Mediana">Mediana</option>
                <option value="Profesional">Profesional</option>
              </>
            ) : (
              <>
                <option value="Todos">Tamaño</option>
                <option value="15ml">15ml</option>
                <option value="30ml">30ml</option>
              </>
            )}
          </select>
        )}

        {/* --- RANGOS DE PRECIO --- */}
        <select
          value={priceRangeFilter}
          onChange={(e) => setPriceRangeFilter(e.target.value)}
          className="border border-gray-300 p-3 text-sm bg-white min-w-[160px]"
        >
          <option value="Todos">Cualquier Precio</option>
          <option value="0-10000">Hasta $10.000</option>
          <option value="10000-20000">$10.000 - $20.000</option>
          <option value="20000-50000">$20.000 - $50.000</option>
          <option value="50000-plus">Más de $50.000</option>
        </select>

        {/* --- ORDENAMIENTO --- */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 p-3 text-sm bg-white min-w-[160px] font-semibold"
        >
          <option value="destacados">Ordenar por</option>
          <option value="precio-menor">Precio: Menor a Mayor</option>
          <option value="precio-mayor">Precio: Mayor a Menor</option>
          {showSizeFilter && <option value="tamano-mayor">Tamaño: Mayor a Menor</option>}
        </select>

        {/* --- BOTÓN LIMPIAR --- */}
        <button
          onClick={clearFilters}
          className="border border-black p-3 text-xs uppercase tracking-[0.2em] font-bold hover:bg-black hover:text-white transition-colors cursor-pointer min-w-[120px]"
        >
          Limpiar
        </button>
      </div>
    </div>
  );
}
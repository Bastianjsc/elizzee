

// 1. EL ESQUEMA PADRE
export interface ProductoBase {
  id: number;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  description: string;

  category:
    | "esmaltes"
    | "base-brillo"
    | "lamparas"
    | "colecciones"
    | "kit";

  details?: Record<string, string>;
}

// 2. ESQUEMA ESPECÍFICO PARA ESMALTES
export interface Esmalte extends ProductoBase {
  line: "Basica" | "Premium";
  colorFamily: "Nudes y Neutros" | "Rojos y Vinos" | "Rosados" | "Tonos Oscuros" | "Pasteles" | "Vibrantes";
  finish: "Con Glitter" | "Sin Glitter"; 
  size: "15ml" | "30ml";
}

// 3. ESQUEMA ESPECÍFICO PARA BASE Y BRILLO
export interface BaseBrillo extends ProductoBase {
  type: "Base" | "Brillo" | "Fortalecedor";
  size: "15ml" | "30ml";
}

// 4. ESQUEMA ESPECÍFICO PARA LÁMPARAS
export interface Lampara extends ProductoBase {
  size: "Mini" | "Mediana" | "Profesional";
}

// 5. ESQUEMA ESPECÍFICO PARA COLECCIONES (PACKS)
export interface Coleccion extends ProductoBase {
  // Guardamos la cantidad como un texto que coincida exactamente con tus filtros actuales
  quantity: "2 Esmaltes" | "3 Esmaltes" | "4 Esmaltes" | "Set Completo";
  
  // Un campo extra por si en el futuro quieres mostrar qué incluye en la tarjeta
  includes?: string[]; // Ej: ["Esmalte Fucsia", "Esmalte Brillo", "Base Fortalecedora"]
}
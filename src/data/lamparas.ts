// src/data/lamparas.ts
import { Lampara } from "./tipos";

export const LAMPARAS_DATA: Lampara[] = [
  {
    id: 1,
    name: "Lámpara UV-LED Mini",
    price: 20000,
    image: "/Lampara2.webp", // Ajusta la ruta a como tengas tus imágenes en la carpeta public
    description: "Diseño compacto y portátil. Perfecta para viajes o retoques rápidos con un curado uniforme.",
    category: "lamparas",
    size: "Mini",
    details: {
      Potencia: "48W",
      Tipo: "UV/LED",
      Temporizador: "30s / 60s / 90s",
      Garantía: "12 meses"
    }

  },
  {
    id: 2,
    name: "Lámpara UV-LED Mediana",
    price: 30000,
    discountPrice: 24990, // Le agregamos una oferta simulada para probar la lógica de descuentos
    image: "/Lampara1.webp",
    description: "Equilibrio ideal entre tamaño y potencia. Ideal para uso doméstico frecuente con resultados profesionales.",
    category: "lamparas",
    size: "Mediana",
    details: {
      Potencia: "48W",
      Tipo: "UV/LED",
      Temporizador: "30s / 60s / 90s",
      Garantía: "12 meses"
    }
  },
  {
    id: 3,
    name: "Lámpara UV-LED Profesional",
    price: 60000,
    image: "/Lampara1.webp",
    description: "Alta potencia y curado ultra rápido. Diseño ergonómico pensado para salones y uso continuo.",
    category: "lamparas",
    size: "Profesional",
    details: {
      Potencia: "48W",
      Tipo: "UV/LED",
      Temporizador: "30s / 60s / 90s",
      Garantía: "12 meses"
    }
  }
];
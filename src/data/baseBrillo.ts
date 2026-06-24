// src/data/baseBrillo.ts
import { BaseBrillo } from "./tipos";

export const BASE_BRILLO_DATA: BaseBrillo[] = [
  {
    id: 1,
    name: "Base Fortalecedora",
    price: 10990, 
    image: "/brillo_de_unas.webp",
    description: "Protege tu uña natural, previene el quiebre y crea el lienzo perfecto para el color.",
    stock: 5,
    category: "base-brillo",
    type: "Fortalecedor", 
    size: "15ml",
    details: {
      "Color": "Transparente",
      "Característica": "Ayuda a evitar uñas quebradizas, aporta fuerza a tus uñas",
    }
  },
  {
    id: 2,
    name: "Base Profesional",
    price: 13990, 
    image: "/brillo_de_unas.webp",
    description: "Tu color con un acabado cristalino duradero y de nivel profesional.",
    stock: 2,
    category: "base-brillo",
    type: "Base",
    size: "15ml",
    details: {
      "Color": "Transparente",
      "Característica": "Ayuda a una duración de un esmalte profesional",
    }
  },
  {
    id: 3,
    name: "Brillo Premium",
    price: 15990, 
    discountPrice: 10990, 
    image: "/brillo_de_unas.webp",
    description: "Nuestra fórmula premium que ofrece un brillo extremo resistente a rayones hasta por 3 semanas.",
    stock: 1,
    category: "base-brillo",
    type: "Brillo",
    size: "30ml",
    details: {
      "Color": "Transparente",
      "Característica": "Evita imperfecciones en el esmalte y su desprendimiento antes de tiempo",
    }
  }
];
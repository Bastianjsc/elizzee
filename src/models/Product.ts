// src/models/Product.ts
import mongoose, { Schema, Document } from 'mongoose';

// 1. Interfaz de TypeScript para Mongoose
export interface IProduct extends Document {
  id: number; // Mantenemos tu ID numérico original para no romper el frontend
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  description: string;
  stock: number;
  category: "esmaltes" | "base-brillo" | "lamparas" | "colecciones" | "kit";
  
  // Campos específicos de variantes (Opcionales)
  line?: string;
  colorFamily?: string;
  finish?: string;
  size?: string;
  type?: string;
  quantity?: string;
  includes?: string[];
  details?: Record<string, string>;
}

// 2. Esquema de Mongoose
const ProductSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number, required: false },
  image: { type: String, required: true }, // Aquí guardaremos la ruta tipo "/angel_pink.webp"
  description: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  category: { 
    type: String, 
    required: true,
    enum: ["esmaltes", "base-brillo", "lamparas", "colecciones", "kit"]
  },
  
  // Campos condicionales (no requeridos, se llenan según la categoría)
  line: { type: String },
  colorFamily: { type: String },
  finish: { type: String },
  size: { type: String },
  type: { type: String },
  quantity: { type: String },
  includes: [{ type: String }], // Array de strings
  details: { type: Map, of: String } // Objeto clave-valor
}, 
{ 
  timestamps: true // Añade createdAt y updatedAt automáticamente
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
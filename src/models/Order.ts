// src/models/Order.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  orderId: string;
  userId?: string; // <-- NUEVO: Guardaremos el ID del usuario aquí (opcional)
  customer: {
    name: string;
    email: string;
  };
  delivery: {
    method: string;
    address: string;
  };
  payment: {
    method: string;
    cardInfo: string;
  };
  items: any[];
  total: number;
  status: string;
  createdAt: Date;
}

const OrderSchema: Schema = new Schema({
  orderId: { type: String, required: true, unique: true },
  userId: { type: String, required: false }, // <-- NUEVO
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  delivery: {
    method: { type: String, required: true },
    address: { type: String, required: true },
  },
  payment: {
    method: { type: String, required: true },
    cardInfo: { type: String, required: false },
  },
  items: { type: Array, required: true },
  total: { type: Number, required: true },
  status: { type: String, default: 'pendiente' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
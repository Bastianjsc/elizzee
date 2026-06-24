// src/app/api/track/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Order from '@/models/Order';

export async function POST(request: Request) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json({ error: 'Por favor ingresa un código de pedido' }, { status: 400 });
    }

    // 1. Conectamos a la BD
    await connectToDatabase();

    // 2. Buscamos el pedido exacto. Usamos trim() por si el usuario copió un espacio por accidente
    const order = await Order.findOne({ orderId: orderId.trim() });

    // 3. Si no existe, devolvemos un error 404
    if (!order) {
      return NextResponse.json({ error: 'No encontramos ningún pedido con ese código' }, { status: 404 });
    }

    // 4. Si existe, lo devolvemos con éxito
    return NextResponse.json(order, { status: 200 });

  } catch (error) {
    console.error("Error al buscar el pedido:", error);
    return NextResponse.json({ error: 'Hubo un error al buscar el pedido' }, { status: 500 });
  }
}
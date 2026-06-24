// src/app/api/orders/user/[userId]/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Order from '@/models/Order';

export async function GET(
  request: Request,
  context: any // Usamos any para evitar conflictos de tipos con diferentes versiones de Next.js
) {
  try {
    await connectToDatabase();
    
    // 1. Extraemos el ID de forma ultra-segura directamente desde la URL
    const url = new URL(request.url);
    const userIdFromUrl = url.pathname.split('/').pop();
    
    // 2. Nos aseguramos de tener el ID (ya sea por params o por la URL)
    const userId = context.params?.userId || userIdFromUrl;

    // 3. CANDADO DE SEGURIDAD: Si no hay ID, no buscamos nada.
    if (!userId || userId === 'undefined' || userId === 'null') {
      return NextResponse.json([], { status: 200 }); // Devolvemos un array vacío
    }
    
    // 4. Buscamos estrictamente los pedidos que coincidan con ESE userId
    const orders = await Order.find({ userId: userId }).sort({ createdAt: -1 });
    
    return NextResponse.json(orders, { status: 200 });
    
  } catch (error) {
    console.error("Error al obtener pedidos del usuario:", error);
    return NextResponse.json({ error: 'Error al obtener los pedidos' }, { status: 500 });
  }
}
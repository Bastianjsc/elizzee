// src/app/api/orders/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Order from '@/models/Order';

export async function POST(request: Request) {
  try {
    // 1. Recibimos la información que nos envía el formulario de checkout
    const body = await request.json();
    
    // 2. Abrimos la conexión con tu MongoDB local
    await connectToDatabase();
    
    // 3. Creamos un nuevo "Pedido" usando el modelo y los datos recibidos
    const newOrder = new Order(body);
    
    // 4. Lo guardamos permanentemente en la base de datos
    await newOrder.save();
    
    // 5. Le avisamos al frontend que todo fue un éxito
    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
    
  } catch (error) {
    console.error("Error al guardar el pedido en la Base de Datos:", error);
    return NextResponse.json(
      { success: false, error: 'Hubo un problema al guardar el pedido' }, 
      { status: 500 }
    );
  }
}
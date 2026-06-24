import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    await connectToDatabase();
    
    // Traemos a todos los usuarios, pero EXCLUIMOS la contraseña por seguridad
    const users = await mongoose.connection.db
      ?.collection("users")
      .find({})
      .project({ password: 0 })
      .toArray();

    return NextResponse.json(users || []);
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectToDatabase();
    const { id, role } = await request.json();

    if (!id || !role) {
      return NextResponse.json({ error: "Faltan datos requeridos" }, { status: 400 });
    }

    // Actualizamos el rol del usuario en la base de datos
    await mongoose.connection.db
      ?.collection("users")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { role: role } }
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error actualizando rol de usuario:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  // Si no hay texto o es menor a 2 letras, no buscamos nada
  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  try {
    await connectToDatabase();
    const regex = new RegExp(query, "i");

    // Buscamos coincidencias rápidas limitando a 5 resultados
    const products = await mongoose.connection.db
      ?.collection("products")
      .find({
        $or: [
          { name: { $regex: regex } },
          { category: { $regex: regex } }
        ]
      })
      .limit(5)
      .project({ _id: 1, name: 1, category: 1, image: 1 }) // Solo traemos datos ligeros
      .toArray();

    return NextResponse.json(products || []);
  } catch (error) {
    console.error("Error al buscar sugerencias:", error);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
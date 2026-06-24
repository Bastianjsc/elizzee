// src/app/api/auth/forgot-password/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "El correo electrónico es obligatorio" },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return NextResponse.json(
        { error: "No existe un usuario registrado con este correo" },
        { status: 404 }
      );
    }

    // Genera un token aleatorio para restablecer la contraseña
    const resetToken = crypto.randomBytes(32).toString("hex");

    // El token expirará en 15 minutos
    const resetTokenExpires = new Date(Date.now() + 15 * 60 * 1000);

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpires;

    await user.save();

    // En un sistema real este enlace se enviaría por correo.
    // Para la Solemne lo mostramos en pantalla como simulación funcional.
    const resetLink = `/nueva-contrasena?token=${resetToken}`;

    return NextResponse.json(
      {
        message: "Solicitud de restablecimiento generada correctamente",
        resetLink,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en forgot-password:", error);

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
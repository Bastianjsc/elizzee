import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { name, lastName, email, password } = await request.json();

    // Verificación simple
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'Este correo ya está registrado' }, { status: 400 });
    }

    // Crear usuario (¡Recuerda encriptar la contraseña con bcrypt antes de esto!)
    const newUser = await User.create({ name, lastName, email, password });

    return NextResponse.json({ message: 'Usuario creado con éxito' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al registrar usuario' }, { status: 500 });
  }
}
// src/app/restablecer-contrasena/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function RestablecerContrasenaPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resetLink, setResetLink] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    setResetLink("");
    setError("");

    if (!email.trim()) {
      setError("Debes ingresar tu correo electrónico.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "No se pudo generar la solicitud.");
        return;
      }

      setMessage(
        "Se generó correctamente la solicitud de restablecimiento de contraseña."
      );

      setResetLink(data.resetLink);
    } catch (error) {
      console.error("Error al solicitar restablecimiento:", error);
      setError("Ocurrió un error al procesar la solicitud.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-black flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-sm p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-light uppercase tracking-widest mb-4">
            Restablecer contraseña
          </h1>

          <p className="text-gray-500 text-sm font-serif italic">
            Ingresa tu correo electrónico para generar una solicitud de
            recuperación.
          </p>

          <div className="w-12 h-[1px] bg-black mt-6 mx-auto" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-gray-600 mb-2">
              Correo electrónico
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center font-semibold">
              {error}
            </p>
          )}

          {message && (
            <p className="text-green-700 text-sm text-center font-semibold">
              {message}
            </p>
          )}

          {resetLink && (
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-center">
              <p className="text-xs text-gray-500 mb-3">
                Simulación académica: en un sistema real este enlace sería
                enviado al correo del usuario.
              </p>

              <Link
                href={resetLink}
                className="inline-block bg-black text-white px-5 py-3 text-xs uppercase tracking-widest font-bold hover:bg-gray-800 transition"
              >
                Ir a crear nueva contraseña
              </Link>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full
              py-4
              uppercase
              tracking-widest
              text-sm
              font-bold
              transition
              ${
                isLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800 cursor-pointer"
              }
            `}
          >
            {isLoading ? "Procesando..." : "Enviar solicitud"}
          </button>
        </form>

        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-xs uppercase tracking-widest font-bold border-b border-black pb-1 hover:text-gray-600 transition"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
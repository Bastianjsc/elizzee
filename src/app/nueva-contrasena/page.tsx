// src/app/nueva-contrasena/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function NuevaContrasenaPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!token) {
      setError("El enlace de restablecimiento no es válido.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError("Debes completar ambos campos de contraseña.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (newPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "No se pudo restablecer la contraseña.");
        return;
      }

      setMessage("Contraseña restablecida correctamente.");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error al restablecer contraseña:", error);
      setError("Ocurrió un error al restablecer la contraseña.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-black flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-sm p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-light uppercase tracking-widest mb-4">
            Nueva contraseña
          </h1>

          <p className="text-gray-500 text-sm font-serif italic">
            Ingresa y confirma tu nueva contraseña para finalizar el proceso.
          </p>

          <div className="w-12 h-[1px] bg-black mt-6 mx-auto" />
        </div>

        {!token && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-xl mb-6">
            <p className="text-red-600 text-sm text-center font-semibold">
              El enlace de restablecimiento no contiene un token válido.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-gray-600 mb-2">
              Nueva contraseña
            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-gray-600 mb-2">
              Confirmar contraseña
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repite la nueva contraseña"
              className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center font-semibold">
              {error}
            </p>
          )}

          {message && (
            <div className="bg-green-50 border border-green-200 p-4 rounded-xl text-center">
              <p className="text-green-700 text-sm font-semibold mb-4">
                {message}
              </p>

              <Link
                href="/"
                className="inline-block bg-black text-white px-5 py-3 text-xs uppercase tracking-widest font-bold hover:bg-gray-800 transition"
              >
                Volver al inicio
              </Link>
            </div>
          )}

          {!message && (
            <button
              type="submit"
              disabled={isLoading || !token}
              className={`
                w-full
                py-4
                uppercase
                tracking-widest
                text-sm
                font-bold
                transition
                ${
                  isLoading || !token
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800 cursor-pointer"
                }
              `}
            >
              {isLoading ? "Actualizando..." : "Restablecer contraseña"}
            </button>
          )}
        </form>

        <div className="text-center mt-8">
          <Link
            href="/restablecer-contrasena"
            className="text-xs uppercase tracking-widest font-bold border-b border-black pb-1 hover:text-gray-600 transition"
          >
            Solicitar nuevo enlace
          </Link>
        </div>
      </div>
    </div>
  );
}
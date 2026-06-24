"use client";

import React, { useState } from "react";
import Link from "next/link";
import RegistroForm from "./RegistroForm";
import { useUser } from "@/context/UserContext";

interface LoginFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginForm({ isOpen, onClose }: LoginFormProps) {
  // Ahora solo tenemos login y register
  const [view, setView] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useUser();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Error al iniciar sesión");
      
      login(data.user);

      // Verificamos si el usuario que acaba de iniciar sesión es un administrador en Mongo
      if (data.user.role === "admin") {
        localStorage.setItem("elizee_admin", "true");
        window.dispatchEvent(new Event("adminStatusChanged")); // Actualiza el botón de la Navbar
      }

      onClose(); // Cerramos el modal
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full relative">
        <button
          onClick={() => { onClose(); setView("login"); }}
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
        >
          ✕
        </button>

        <h2 className="text-2xl font-light uppercase tracking-widest mb-6 text-center">
          {view === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
        </h2>

        {view === "login" && (
          <form className="space-y-4" onSubmit={handleLogin}>
            {error && (
              <p className="text-[10px] text-red-600 text-center uppercase tracking-widest">{error}</p>
            )}
            <div>
              <label className="block text-[10px] uppercase tracking-widest mb-1 text-gray-500">Email</label>
              <input type="email" required value={email}
                className="w-full border border-gray-300 p-2 outline-none focus:border-black"
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest mb-1 text-gray-500">Contraseña</label>
              <input type="password" required value={password}
                className="w-full border border-gray-300 p-2 outline-none focus:border-black"
                onChange={(e) => setPassword(e.target.value)} />
              <Link href="/restablecer-contrasena" onClick={onClose}
                className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black mt-2 underline block">
                Olvidé mi contraseña
              </Link>
            </div>
            <button type="submit" disabled={isLoading}
              className="w-full bg-black text-white py-3 uppercase text-sm font-bold tracking-widest mt-4 hover:bg-gray-800 transition-colors disabled:bg-gray-400">
              {isLoading ? "Ingresando..." : "Ingresar"}
            </button>
            <div className="text-center mt-4">
              <span className="text-[10px] uppercase tracking-widest text-gray-500">¿No tienes cuenta?</span>
              <button type="button" onClick={() => setView("register")}
                className="ml-2 text-[10px] font-bold uppercase tracking-widest underline underline-offset-4">
                Regístrate
              </button>
            </div>
          </form>
        )}

        {view === "register" && (
          <RegistroForm onBackToLogin={() => setView("login")} />
        )}
      </div>
    </div>
  );
}
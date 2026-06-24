// src/components/RegistroForm.tsx
import React, { useState } from 'react';

interface RegistroFormProps {
  onBackToLogin: () => void;
}

export default function RegistroForm({ onBackToLogin }: RegistroFormProps) {
  const [formData, setFormData] = useState({ name: '', lastName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al registrar');
      }

      alert("¡Registro exitoso! Ya puedes iniciar sesión.");
      onBackToLogin(); // Volvemos al login tras el éxito
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && <p className="text-[10px] text-red-600 text-center uppercase tracking-widest">{error}</p>}
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] uppercase tracking-widest mb-1 text-gray-500">Nombre</label>
          <input 
            required 
            type="text" 
            className="w-full border border-gray-300 p-2 outline-none focus:border-black" 
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-widest mb-1 text-gray-500">Apellido</label>
          <input 
            required 
            type="text" 
            className="w-full border border-gray-300 p-2 outline-none focus:border-black" 
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
          />
        </div>
      </div>
      <div>
        <label className="block text-[10px] uppercase tracking-widest mb-1 text-gray-500">Email</label>
        <input 
          required 
          type="email" 
          className="w-full border border-gray-300 p-2 outline-none focus:border-black" 
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
      </div>
      <div>
        <label className="block text-[10px] uppercase tracking-widest mb-1 text-gray-500">Contraseña</label>
        <input 
          required 
          type="password" 
          className="w-full border border-gray-300 p-2 outline-none focus:border-black" 
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
      </div>
      
      <button 
        disabled={isLoading}
        className="w-full bg-black text-white py-3 uppercase text-sm font-bold tracking-widest mt-4 hover:bg-gray-800 transition-colors disabled:bg-gray-400"
      >
        {isLoading ? "Registrando..." : "Registrarse"}
      </button>

      <div className="text-center mt-4">
        <span className="text-[10px] uppercase tracking-widest text-gray-500">¿Ya tienes cuenta? </span>
        <button 
          type="button"
          onClick={onBackToLogin}
          className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black underline underline-offset-4"
        >
          Inicia sesión
        </button>
      </div>
    </form>
  );
}
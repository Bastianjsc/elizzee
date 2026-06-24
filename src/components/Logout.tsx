import React from 'react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

interface LogoutProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Logout({ isOpen, onClose }: LogoutProps) {
  const { user, logout } = useUser();
  const router = useRouter(); // Inicializamos el enrutador

  // Si el menú no está abierto o no hay usuario, no mostramos nada
  if (!isOpen || !user) return null;

  const handleLogout = () => {
    // 1. Limpiamos la sesión normal en el contexto
    logout(); 
    
    // 2. Limpiamos los permisos de administrador (si los tuviera)
    localStorage.removeItem("elizee_admin");
    window.dispatchEvent(new Event("adminStatusChanged"));

    // 3. Cerramos el menú flotante
    onClose(); 

    // 4. Redirigimos a la página principal en todos los casos
    router.push("/");
  };

  return (
    <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 shadow-lg p-4 rounded-sm min-w-[200px] z-50">
      <div className="mb-4">
        <p className="text-[10px] font-bold text-black uppercase tracking-widest mb-1">
          {user.name} {user.lastName}
        </p>
        <p className="text-[10px] text-gray-500">
          {user.email}
        </p>
      </div>
      
      <button
        onClick={handleLogout}
        className="w-full bg-black text-white text-[10px] font-bold uppercase tracking-widest py-2 hover:bg-gray-800 transition-colors cursor-pointer"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}
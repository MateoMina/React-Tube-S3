// client/src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar el token del localStorage para cerrar sesión
    localStorage.removeItem('token');
    // Redirigir al usuario a la página de inicio de sesión o inicio
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li><Link to="/" className="text-white hover:text-gray-300">Inicio</Link></li>
        <li><Link to="/api/upload/all" className="text-white hover:text-gray-300">ReacTube</Link></li>
        <li><Link to="/upload" className="text-white hover:text-gray-300">Subir Archivo</Link></li>
        {!localStorage.getItem('token') ? (
          <>
            <li><Link to="/login" className="text-white hover:text-gray-300">Iniciar Sesión</Link></li>
            <li><Link to="/register" className="text-white hover:text-gray-300">Registrarse</Link></li>
          </>
        ) : (
          <li>
            <button onClick={handleLogout} className="text-white hover:text-gray-300">
              Cerrar Sesión
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

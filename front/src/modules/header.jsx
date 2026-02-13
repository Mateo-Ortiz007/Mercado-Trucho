import { useState } from "react";
import "../styles/header.css";

function Header({ cantidad, onCarrito, onSearch }) {
  const [usuario, setUsuario] = useState(() => {
    const user = localStorage.getItem("usuario");
    return user ? JSON.parse(user) : null;
  });

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  return (
    <header className="ml-header">
      <div className="logo">Mercado Trucho</div>

      <input
        type="text"
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Buscar productos , marcas y más"
      />

      <button className="cart-btn" onClick={onCarrito}>
        🛒 {cantidad}
      </button>

      {usuario ? (
        <>
          <span>Hola, {usuario.nombreDeUsuario}</span>
          <span>
            <a href="#" onClick={cerrarSesion}>
              Cerrar Sesion
            </a>
          </span>
        </>
      ) : (
        <>
          <span>
            <a href="/login">Iniciar Sesion</a>
          </span>
          <span>
            <a href="/register"> Registrarse</a>
          </span>
        </>
      )}
    </header>
  );
}

export default Header;

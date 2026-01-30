import "../styles/header.css";

function Header({ cantidad, onCarrito, onSearch }) {
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

      <span>
        <a href="">Iniciar Sesion</a>
      </span>
    </header>
  );
}

export default Header;

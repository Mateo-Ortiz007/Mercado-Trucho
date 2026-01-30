import "../styles/pruebas.css";

function ProductModal({ producto, onClose, onAdd }) {
  if (!producto) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <img
          src={`http://localhost:3000/uploads/${producto.imagen}`}
          alt={producto.nombre}
        />
        <h2>{producto.nombre}</h2>
        <p className="precio">${producto.precio}</p>

        <button onClick={onAdd}>Agregar al carrito</button>
      </div>
    </div>
  );
}

export default ProductModal;

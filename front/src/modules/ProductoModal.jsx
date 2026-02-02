import "../styles/home.css";

function ProductModal({ producto, onClose, onAdd }) {
  if (!producto) return null;

  return (
    <div className="product-overlay" onClick={onClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <img
          src={`http://localhost:3000/uploads/${producto.imagen}`}
          alt={producto.nombre}
        />
        <label>Nombre</label>
        <h2>{producto.nombre}</h2>
        <label>Precio</label>
        <p className="precio">${producto.precio}</p>
        <label>Stock</label>
        <p className="precio">{producto.unidades}</p>
        <label>Tipo</label>
        <p className="precio">{producto.tipo}</p>

        <button onClick={onAdd}>Agregar al carrito</button>
      </div>
    </div>
  );
}

export default ProductModal;

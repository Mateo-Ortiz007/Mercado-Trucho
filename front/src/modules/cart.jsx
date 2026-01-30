import "../styles/pruebas.css";

function Cart({ carrito, onClose }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal carrito" onClick={(e) => e.stopPropagation}>
        <h2>Carrito</h2>

        {carrito.length === 0 ? (
          <p>tu carrito esta vacio</p>
        ) : (
          carrito.map((p, i) => (
            <div key={i} className="carrito item">
              <img src={p.imagen} />
              <div>
                <p>{p.nombre}</p>
                <strong>${p.precio}</strong>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Cart;

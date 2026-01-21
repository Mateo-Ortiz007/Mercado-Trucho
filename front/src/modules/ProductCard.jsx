function ProductCard({ producto, onClick }) {
  return (
    <div className="card" onClick={() => onClick(producto)}>
      <img
        src={`http://localhost:3000/uploads/${producto.imagen}`}
        alt={producto.nombre}
        className="img-producto"
      />
      <h3>{producto.nombre}</h3>
      <p>${producto.precio}</p>
    </div>
  );
}

export default ProductCard;

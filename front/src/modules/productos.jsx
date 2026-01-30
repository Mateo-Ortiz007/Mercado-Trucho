import { useState, useEffect } from "react";
import "../styles/pruebas.css";
import Header from "./header";
import ProductCard from "./productCard";
import ProductModal from "./ProductoModal";

function Pruebas() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [open, setOpen] = useState(false);
  const [producto, setProducto] = useState(null);
  const [verCarrito, setVerCarrito] = useState(false);
  const [search, setSearch] = useState("");
  const [checkout, setCheckout] = useState(false);
  const [productos, setProductos] = useState([]);

  const [maxPrecio, setMaxPrecio] = useState(1000);
  const [carrito, setCarrito] = useState(() => {
    const saved = localStorage.getItem("carrito");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    fetch("http://localhost:3000/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data));
  }, []);

  const abrirModal = (p) => {
    setProducto(p);
    setOpen(true);
  };

  const cerrarModal = () => {
    setOpen(false);
    setProducto(null);
  };

  const agregarCarrito = async () => {
    const existe = carrito.find((i) => i.id === producto.id);

    if (existe) {
      await fetch(`http://localhost:3000/carrito/${producto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ delta: 1 }),
      });

      setCarrito(
        carrito.map((i) =>
          i.id === producto.id ? { ...i, qty: i.qty + 1 } : i,
        ),
      );
    } else {
      await fetch("http://localhost:3000/carrito", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...producto, qty: 1 }),
      });

      setCarrito([...carrito, { ...producto, qty: 1 }]);
    }

    cerrarModal();
  };

  const cambiarQty = async (id, delta) => {
    await fetch(`http://localhost:3000/carrito/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ delta }),
    });

    setCarrito(
      carrito
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    );
  };

  const total = carrito.reduce((s, p) => s + p.precio * p.qty, 0);
  const cantidad = carrito.reduce((s, p) => s + p.qty, 0);

  return (
    <>
      <Header
        cantidad={cantidad}
        onCarrito={() => setVerCarrito(!verCarrito)}
        onSearch={setSearch}
      />
      <div className="filtros">
        <label>Precio máximo:${maxPrecio}</label>
        <input
          type="range"
          min="1"
          max="1000"
          value={maxPrecio}
          onChange={(e) => setMaxPrecio(Number(e.target.value))}
        />
      </div>
      {/* PRODUCTOS */}
      {!verCarrito && !checkout && (
        <div className="container">
          {productos
            .filter(
              (p) =>
                p.nombre.toLowerCase().includes(search.toLowerCase()) &&
                p.precio <= maxPrecio,
            )
            .map((p) => (
              <ProductCard key={p.id} producto={p} onClick={abrirModal} />
            ))}
        </div>
      )}

      {/* CARRITO */}
      {verCarrito && !checkout && (
        <div className="carrito">
          <h2>Tu carrito</h2>
          {carrito.length === 0 && (
            <p className="carrito-vacio">Tu carrito está vacío</p>
          )}

          {carrito.map((p) => (
            <div className="item" key={p.id}>
              <img
                src={`http://localhost:3000/uploads/${p.imagen}`}
                className="img-carrito"
              />
              <span>{p.nombre}</span>

              <div className="qty">
                <button onClick={() => cambiarQty(p.id, -1)}>-</button>
                <span>{p.qty}</span>
                <button onClick={() => cambiarQty(p.id, 1)}>+</button>
              </div>

              <span>${p.precio * p.qty}</span>
            </div>
          ))}

          <h3>Total: ${total}</h3>

          <button
            className="btn-checkout"
            disabled={carrito.length === 0}
            onClick={() => setCheckout(true)}
          >
            Continuar compra
          </button>
        </div>
      )}

      {/* CHECKOUT */}
      {checkout && (
        <div className="checkout">
          <h2>Resumen de compra</h2>

          {carrito.map((p) => (
            <div key={p.id} className="checkout-item">
              <span>{p.nombre}</span>
              <span>
                {p.qty} x ${p.precio}
              </span>
            </div>
          ))}

          <h3>Total a pagar: ${total}</h3>

          <button
            className="btn-pagar"
            onClick={() => {
              alert("🎉 Compra realizada 🎉");
              setCarrito([]);
              setCheckout(false);
              setVerCarrito(false);
            }}
          >
            Pagar
          </button>
          <button
            className="btn-pagar"
            onClick={() => {
              setCheckout(false);
              setVerCarrito(false);
            }}
          >
            cancelar
          </button>
        </div>
      )}

      <ProductModal
        producto={open ? producto : null}
        onClose={cerrarModal}
        onAdd={agregarCarrito}
      />
    </>
  );
}

export default Pruebas;

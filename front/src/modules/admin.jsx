import { useState, useEffect } from "react";
import "../styles/admin.css";

function Admin() {
  const [productos, setProductos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [productoEdit, setProductoEdit] = useState(null);
  const [imagenFile, setImagenFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    tipo: "",
    precio: "",
    unidades: "",
  });
  const cargarProductos = async () => {
    const res = await fetch("http://localhost:3000/productos");
    const data = await res.json();
    setProductos(data);
  };

  // ================= LOAD =================
  useEffect(() => {
    cargarProductos();
  }, []);

  // ================= CREATE =================
  const crearProducto = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("nombre", form.nombre);
    data.append("tipo", form.tipo);
    data.append("precio", form.precio);
    data.append("unidades", form.unidades);
    data.append("imagen", imagenFile);

    await fetch("http://localhost:3000/productos", {
      method: "POST",
      body: data,
    });

    setForm({ nombre: "", tipo: "", precio: "", unidades: "" });
    setImagenFile(null);
    setPreview(null);
    cargarProductos();
  };

  // ================= OPEN MODAL =================
  const abrirModal = (p) => {
    setProductoEdit({ ...p });
    setPreview(`http://localhost:3000/uploads/${p.imagen}`);
    setImagenFile(null);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
    setProductoEdit(null);
    setImagenFile(null);
    setPreview(null);
  };

  // ================= UPDATE =================
  const guardarCambios = async () => {
    const data = new FormData();
    data.append("nombre", productoEdit.nombre);
    data.append("tipo", productoEdit.tipo);
    data.append("precio", productoEdit.precio);
    data.append("unidades", productoEdit.unidades);
    if (imagenFile) data.append("imagen", imagenFile);

    await fetch(`http://localhost:3000/productos/${productoEdit.id}`, {
      method: "PUT",
      body: data,
    });

    cerrarModal();
    cargarProductos();
  };

  // ================= DELETE =================
  const eliminarProducto = async (id) => {
    if (!confirm("¿Eliminar producto?")) return;
    await fetch(`http://localhost:3000/productos/${id}`, { method: "DELETE" });
    cargarProductos();
  };

  return (
    <div className="admin-page">
      {/* ===== FORM CREAR ===== */}
      <form className="admin-form" onSubmit={crearProducto}>
        <h2>Nuevo producto</h2>
        <label>Nombre</label>
        <input
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
        <label>Tipo</label>

        <input
          placeholder="Tipo"
          value={form.tipo}
          onChange={(e) => setForm({ ...form, tipo: e.target.value })}
        />
        <label>Precio</label>
        <input
          type="number"
          placeholder="Precio"
          value={form.precio}
          onChange={(e) => setForm({ ...form, precio: e.target.value })}
        />

        <label>Stock</label>

        <input
          type="number"
          placeholder="Stock"
          value={form.unidades}
          onChange={(e) => setForm({ ...form, unidades: e.target.value })}
        />
        <label>Imagen</label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setImagenFile(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
          }}
        />

        {preview && <img src={preview} className="preview-img" />}

        <button>Guardar</button>
        <button
          type="button"
          onClick={() => {
            setForm({
              nombre: "",
              tipo: "",
              unidades: "",
              precio: "",
            });
            setImagenFile(null);
            setPreview(null);
          }}
        >
          Cancelar
        </button>
      </form>

      {/* ===== LISTA ===== */}
      <div className="admin-list">
        {productos.map((p) => (
          <div className="admin-item" key={p.id}>
            <img src={`http://localhost:3000/uploads/${p.imagen}`} />
            <strong>{p.nombre}</strong>
            <p>${p.precio}</p>
            <p>Stock: {p.unidades}</p>

            <div className="actions">
              <button onClick={() => abrirModal(p)}>Editar</button>
              <button onClick={() => eliminarProducto(p.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      {/* ===== MODAL EDITAR ===== */}
      {modalOpen && productoEdit && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Editar producto</h3>
            <label>Nombre</label>
            <input
              value={productoEdit.nombre}
              onChange={(e) =>
                setProductoEdit({ ...productoEdit, nombre: e.target.value })
              }
            />

            <label>Tipo</label>

            <input
              value={productoEdit.tipo}
              onChange={(e) =>
                setProductoEdit({ ...productoEdit, tipo: e.target.value })
              }
            />

            <label>Precio</label>

            <input
              type="number"
              value={productoEdit.precio}
              onChange={(e) =>
                setProductoEdit({ ...productoEdit, precio: e.target.value })
              }
            />
            <label>Stock</label>

            <input
              type="number"
              value={productoEdit.unidades}
              onChange={(e) =>
                setProductoEdit({ ...productoEdit, unidades: e.target.value })
              }
            />

            <label>Imagen</label>

            <input
              type="file"
              onChange={(e) => {
                setImagenFile(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />

            {preview && <img src={preview} className="preview-img" />}

            <div className="modal-actions">
              <button onClick={cerrarModal}>Cancelar</button>
              <button onClick={guardarCambios}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;

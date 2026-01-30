import { useState, useEffect } from "react";
import "../styles/proveedores.css";

function Proveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [proveedoresToEdit, setProveedoresToEdit] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    empresa: "",
    tipodeproductos: "",
  });

  const cargarProveedores = async () => {
    const res = await fetch("http://localhost:3000/proveedores");
    const data = await res.json();
    setProveedores(data);
  };

  useEffect(() => {
    cargarProveedores();
  }, []);

  const crearProveedor = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:3000/proveedores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setForm({
      nombre: "",
      empresa: "",
      tipodeproductos: "",
    });

    cargarProveedores();
  };

  const abrirModal = (p) => {
    setProveedoresToEdit({ ...p });
    ({ ...p });
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
    setProveedoresToEdit(null);
  };

  const guardarCambios = async () => {
    await fetch(`http://localhost:3000/proveedores/${proveedoresToEdit.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(proveedoresToEdit),
    });

    cerrarModal();
    cargarProveedores();
  };

  const eliminarProveedor = async (id) => {
    if (!confirm("¿Eliminar producto?")) return;
    await fetch(`http://localhost:3000/proveedores/${id}`, {
      method: "DELETE",
    });
    cargarProveedores();
  };

  return (
    <div className="provider-page">
      <form className="provider-form" onSubmit={crearProveedor}>
        <h2>Nuevo proveedor</h2>
        <label>Nombre</label>
        <input
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
        <label>Empresa</label>

        <input
          placeholder="Empresa"
          value={form.empresa}
          onChange={(e) => setForm({ ...form, empresa: e.target.value })}
        />
        <label> Tipo de productos</label>
        <input
          placeholder="Tipo de productos"
          value={form.tipodeproductos}
          onChange={(e) =>
            setForm({ ...form, tipodeproductos: e.target.value })
          }
        />
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
          }}
        >
          Cancelar
        </button>
      </form>

      <div className="provider-list">
        {proveedores.map((p) => (
          <div className="provider-item" key={p.id}>
            <strong>{p.nombre}</strong>
            <h2>{p.empresa}</h2>
            <h2>{p.tipodeproductos}</h2>

            <div className="actions">
              <button onClick={() => abrirModal(p)}>Editar</button>
              <button onClick={() => eliminarProveedor(p.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
      {modalOpen && proveedoresToEdit && (
        <div className="provider-modal-overlay" onClick={cerrarModal}>
          <div className="provider-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Editar proveedor</h3>
            <label>Nombre</label>
            <input
              value={proveedoresToEdit.nombre}
              onChange={(e) =>
                setProveedoresToEdit({
                  ...proveedoresToEdit,
                  nombre: e.target.value,
                })
              }
            />
            <label>Empresa</label>
            <input
              value={proveedoresToEdit.empresa}
              onChange={(e) =>
                setProveedoresToEdit({
                  ...proveedoresToEdit,
                  empresa: e.target.value,
                })
              }
            />
            <label>Tipodeproductos</label>
            <input
              value={proveedoresToEdit.tipodeproductos}
              onChange={(e) =>
                setProveedoresToEdit({
                  ...proveedoresToEdit,
                  tipodeproductos: e.target.value,
                })
              }
            />
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

export default Proveedores;

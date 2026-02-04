import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombreDeUsuario: "",
    ApellidoDelUsuario: "",
    DocumentoDelUsuario: "",
    telefono: "",
    genero: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al registrar");
        return;
      }

      // ✅ registro correcto → login
      navigate("/login");
    } catch (err) {
      console.error(err).json;
      setError("Error de servidor");
    }
  };

  return (
    <div className="register-page">
      <form onSubmit={handleRegister} className="register-form">
        <h2>Registro</h2>

        <input
          name="nombreDeUsuario"
          placeholder="Nombre"
          onChange={handleChange}
          required
        />

        <input
          name="ApellidoDelUsuario"
          placeholder="Apellido"
          onChange={handleChange}
          required
        />

        <input
          name="DocumentoDelUsuario"
          placeholder="Cédula"
          onChange={handleChange}
          required
        />

        <input
          name="telefono"
          placeholder="Teléfono"
          onChange={handleChange}
          required
        />

        <select name="genero" onChange={handleChange} required>
          <option value="">Género</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>

        <input
          type="email"
          name="email"
          placeholder="Correo"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          required
        />

        {error && <p className="error">{error}</p>}

        <button>Registrarse</button>
      </form>
    </div>
  );
}

export default Register;

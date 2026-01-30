import { BrowserRouter, Routes, Route } from "react-router-dom";
import Productos from "./modules/productos";
import Admin from "../src/modules/admin";
import "./App.css";
import Proveedores from "./modules/proveedores";
import Login from "./modules/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Productos />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/proveedores" element={<Proveedores />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

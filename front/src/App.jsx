import { BrowserRouter, Routes, Route } from "react-router-dom";
import Productos from "./modules/productos";
import Proveedores from "./modules/proveedores";
import Login from "./modules/login";
import Register from "./modules/register";
import Homepage from "./modules/homepage";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Homepage />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/proveedores" element={<Proveedores />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

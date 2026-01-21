import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pruebas from "./modules/pruebas";
import Admin from "../src/modules/admin";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pruebas />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

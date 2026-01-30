import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import productosRoutes from "./routes/productos.js";
import proveedoresRoutes from "./routes/providers.js";
import usuariosRoutes from "./routes/usuarios.js"; // ✅ CORRECTO

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/productos", productosRoutes);
app.use("/proveedores", proveedoresRoutes);
app.use("/usuarios", usuariosRoutes);

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});

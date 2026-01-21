/* eslint-disable no-undef */
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import productosRoutes from "./routes/productos.js";

const app = express();

app.use(cors());
app.use(express.json());

// servir imágenes
app.use("/uploads", express.static("uploads"));

// rutas
app.use("/productos", productosRoutes);

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000/productos");
});

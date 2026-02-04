import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import productosRoutes from "./routes/productos.js";
import proveedoresRoutes from "./routes/providers.js";
import loginRoutes from "./routes/login.js";
import registerRoutes from "./routes/register.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/productos", productosRoutes);
app.use("/proveedores", proveedoresRoutes);
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});

import express from "express";
import { db } from "../db.js";
import bcrypt from "bcrypt";

const router = express.Router();

// GET: obtener todos los usuarios (sin password)
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, nombreDeUsuario, ApellidoDelUsuario, DocumentoDelUsuario, telefono, genero, email FROM usuarios",
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// POST: registrar usuario (con hash)
router.post("/", async (req, res) => {
  try {
    const {
      nombreDeUsuario,
      ApellidoDelUsuario,
      DocumentoDelUsuario,
      telefono,
      genero,
      email,
      password,
    } = req.body;

    const hash = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO usuarios 
      (nombreDeUsuario, ApellidoDelUsuario, DocumentoDelUsuario, telefono, genero, email, password)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        nombreDeUsuario,
        ApellidoDelUsuario,
        DocumentoDelUsuario,
        telefono,
        genero,
        email,
        hash,
      ],
    );

    res.json({ msg: "Usuario registrado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error al registrar" });
  }
});

export default router;

import express from "express";
import { upload } from "../config/multer.js";
import { db } from "../db.js";

const router = express.Router();

// GET
router.get("/", (req, res) => {
  db.query("SELECT * FROM productos", (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

// POST con imagen
router.post("/", upload.single("imagen"), (req, res) => {
  const { nombre, tipo, unidades, precio } = req.body;
  const imagen = req.file.filename;

  db.query(
    "INSERT INTO productos (nombre, tipo, unidades, precio, imagen) VALUES (?, ?, ?, ?, ?)",
    [nombre, tipo, unidades, precio, imagen],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId });
    },
  );
});

// PUT
router.put("/:id", upload.single("imagen"), (req, res) => {
  const { id } = req.params;
  const { nombre, tipo, unidades, precio } = req.body;
  const imagen = req.file?.filename;

  db.query(
    "UPDATE productos SET nombre=?, tipo=?, unidades=?, precio=?, imagen=? WHERE id=?",
    [nombre, tipo, unidades, precio, imagen, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ msg: "Producto actualizado" });
    },
  );
});

// DELETE
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM productos WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ msg: "Producto eliminado" });
  });
});

export default router;

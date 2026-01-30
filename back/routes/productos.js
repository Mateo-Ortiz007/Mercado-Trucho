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
  const imagen = req.file?.filename || null;

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

  let sql = `
    UPDATE productos 
    SET nombre=?, tipo=?, unidades=?, precio=?
  `;
  const values = [nombre, tipo, unidades, precio];

  // solo si viene imagen
  if (req.file) {
    sql += ", imagen=?";
    values.push(req.file.filename);
  }

  sql += " WHERE id=?";
  values.push(id);

  db.query(sql, values, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ msg: "Producto actualizado" });
  });
});

// DELETE
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM productos WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ msg: "Producto eliminado" });
  });
});

export default router;

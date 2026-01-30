import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  db.query("SELECT * FROM proveedores", (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

router.post("/", (req, res) => {
  const { nombre, empresa, tipodeproductos } = req.body;

  db.query(
    "INSERT INTO proveedores (nombre, empresa, tipodeproductos) VALUES (?, ?, ?)",
    [nombre, empresa, tipodeproductos],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId });
    },
  );
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, empresa, tipodeproductos } = req.body;

  db.query(
    "UPDATE proveedores SET nombre=?, empresa=?, tipodeproductos=? WHERE id=?",
    [nombre, empresa, tipodeproductos, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ msg: "Proveedor actualizado" });
    },
  );
});

router.delete("/:id", (req, res) => {
  db.query("DELETE FROM proveedores WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ msg: "Proveedor eliminado" });
  });
});

export default router;

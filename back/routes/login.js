import express from "express";
import { db } from "../db.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM usuarios WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: "Error del servidor" });
      }

      if (results.length === 0) {
        return res.status(401).json({ msg: "Usuario no existe" });
      }

      const user = results[0];

      try {
        const ok = await bcrypt.compare(password, user.password);

        if (!ok) {
          return res.status(401).json({ msg: "Contraseña incorrecta" });
        }

        res.json({
          msg: "Login correcto",
          userId: user.id,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al validar contraseña" });
      }
    },
  );
});

export default router;

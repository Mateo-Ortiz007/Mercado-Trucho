import express from "express";
import { db } from "../db.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM usuarios WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ msg: "Error servidor" });
      if (results.length === 0)
        return res.status(401).json({ msg: "Usuario no existe" });

      const user = results[0];

      // ✅ comparar password con hash
      const ok = await bcrypt.compare(password, user.password);

      if (!ok) {
        return res.status(401).json({ msg: "Contraseña incorrecta" });
      }

      res.json({
        msg: "Login correcto",
        userId: user.id,
      });
    },
  );
});

export default router;

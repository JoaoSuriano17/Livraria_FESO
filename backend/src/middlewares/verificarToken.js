const db = require("../db");
const jwt = require("jsonwebtoken");
const senhaTokenJWT = "senhaSecretissimaIFSP";

function verificarToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ msg: "Token inválido" });
  }

  jwt.verify(token, senhaTokenJWT, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ msg: "Token inválido" });
    }

    try {
      const r = await db.query("SELECT id FROM usuario WHERE id = $1", [
        decoded.data,
      ]);

      if (r.rows.length === 0) {
        return res.status(403).json({ msg: "Token inválido" });
      }

      req.user = decoded.data;
      next();
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  });
}

module.exports = verificarToken;
const express = require("express");
const router = express.Router();
const db = require("../db");

//GET - geral
router.get("/", async (req, res) => {
  const r = await db.query("SELECT * FROM usuario")
  if (r.rowCount == 0){
    return res.status(404).json({msg: "Não há usuários na base de dados!"})
  }

  res.status(200).json(r.rows)
});

//Get específico
router.get("/:id", async (req, res) => {
  let id = req.params.id

  const r = await db.query("SELECT * FROM usuario WHERE id=$1", [id])
  if (r.rowCount == 0){
    return res.status(404).json({msg: "Não há usuário com este id!"})
  }

  res.status(200).json(r.rows)
});

//Post - usuário = cadastro
router.post("/", async (req, res) => {

  const {
    nome, login, senha, img, autor, nacionalidade, ativo
  } = req.body || {};
  
  const r = await db.query("INSERT INTO usuario(nome, login, senha, img, autor, nacionalidade, ativo) VALUES ($1, $2, $3, $4, $5, &6, $",
    [nome, login, senha, img, autor, nacionalidade, ativo]
  )

  if (r.rowCount == 0){
    return res.status(404).json({msg: "Não foi possível adicionar este usuário!"})
  }

  res.status(200).json(r.rows)
});

module.exports = router;

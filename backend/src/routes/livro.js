const express = require("express");
const router = express.Router();
const db = require("../db");

//Get - geral
router.get("/", async (req, res) => {
  const r = await db.query("SELECT * FROM livro")
  if (r.rowCount == 0){
    return res.status(404).json({msg: "Não há livros nesta lista!"})
  }

  res.status(200).json(r.rows)
});

//Get - específico
router.get("/:id", async (req, res) => {
  let id = req.params.id

  const r = await db.query("SELECT * FROM livro WHERE id = $1", [id])
  if (r.rowCount == 0){
    return res.status(404).json({msg: "Não há livro nesta posição!"})
  }

  res.status(200).json(r.rows)
});

router.post("/", async (req, res) => {

  const {
    titulo,
    genero,
    classificacao,
    editora,
    volume,
    data_publicacao,
    qtde_paginas,
    estoque,
    preco,
    sinopse,
    tamanho,
    idUsuario
  } = req.body;

  const r2 = await db.query("SELECT * FROM usuario WHERE id = $1", [idUsuario])
  if (r2.rows[0].autor == false){
    return res.status(404).json({msg: "este usuário não é um autor!"})
  }
  
  const r = await db.query("INSERT INTO livro(titulo, genero, classificacao, editora, volume, data_publicacao, qtde_paginas, estoque, preco, sinopse, tamanho, idUsuario) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
    [titulo, genero, classificacao, editora, volume, data_publicacao, qtde_paginas, estoque, preco, sinopse, tamanho, idUsuario]
  )

  if (r.rowCount == 0){
    return res.status(404).json({msg: "Não foi possível adicionar este livro!"})
  }

  res.status(200).json(r.rows)
});


router.delete("/:id", async (req, res) => {
  let id = req.params.id
  const idUsuario = req.body.idUsuario || {}
  
  const r2 = await db.query("SELECT * FROM livro WHERE id=$1", [id])
  if (r2.rows[0].idusuario == idUsuario){
    const r = await db.query("UPDATE livro SET ativo=$1 WHERE id=$2 RETURNING *", [false, id])
    return res.status(200).json(r.rows)
  }
  
  res.status(404).json({msg: "Este autor não é proprietário do livro!"})
});

module.exports = router;

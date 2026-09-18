const express = require("express");
const router = express.Router();
const db = require("../db");
/*
CREATE TABLE IF NOT EXISTS editora (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL UNIQUE,
    cnpj VARCHAR(18) UNIQUE,
    email VARCHAR(255),
    telefone VARCHAR(20),
    site VARCHAR(255),
    ativo BOOLEAN NOT NULL DEFAULT TRUE
);
*/

/*
POST   /editoras *
GET    /editoras *
GET    /editoras/:id *
PUT    /editoras/:id *
DELETE /editoras/:id *
*/

router.post("/", async (req, res) => {
    try{
        const { nome, cnpj, email, telefone, site, senha } = req.body || {}

        if (!nome){throw new Error("Nome deve ser um parâmetro!")}
        if (!cnpj){throw new Error("Cnpj de login deve ser um parâmetro!")}
        if (!email){throw new Error("Email deve ser um parâmetro!")}
        if (!senha){throw new Error("Senha deve ser um parâmetro!")}
        if (!telefone){throw new Error("Telefone deve ser um parâmetro!")}
        if (!site){throw new Error("Site deve ser um parâmetro!")}

        const post_editora = await db.query("INSERT INTO editora(nome, cnpj, email, senha, telefone, site) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, nome, cnpj, email, telefone, site", [nome, cnpj, email, senha, telefone, site])
        if (post_editora.rowCount === 0){
            throw new Error("Erro ao adicionar a editora!")
        }

        res.json({msg: "Editora adicionada com sucesso!", editora: post_editora.rows[0]})

    }catch(erro){
        return res.status(500).json({msg: erro.message})
    }
});

router.patch("/:id/telefone", async (req, res) => {
    try{
        const id = req.params.id
        const { cnpj, senha, telefone } = req.body || {}
        
        const pedido_editora_telefone = await db.query("UPDATE editora SET telefone=$1 WHERE cnpj=$2 AND senha=$3 AND id=$4 AND ativo=TRUE", [telefone, cnpj, senha, id])
        if (pedido_editora_telefone.rowCount === 0){
            throw new Error("Erro ao atualizar o telefone!")
        }
    
        res.json({msg: "Telefone alterado com sucesso!"})

    }catch(erro){
        return res.status(500).json({msg: erro.message})
    }
});

router.patch("/:id/site", async (req, res) => {
    try{
        const id = req.params.id
        const { cnpj, senha, site } = req.body || {}
        
        const pedido_editora_telefone = await db.query("UPDATE editora SET site=$1 WHERE cnpj=$2 AND senha=$3 AND id=$4 AND ativo=TRUE", [site, cnpj, senha, id])
        if (pedido_editora_telefone.rowCount === 0){
            throw new Error("Erro ao atualizar o site da editora!")
        }
    
        res.json({msg: "Site alterado com sucesso!"})

    }catch(erro){
        return res.status(500).json({msg: erro.message})
    }
});

router.get("/:id", async (req, res) => {
    try{
        const id = req.params.id
    
        const pedido_editora = await db.query("SELECT nome, email, telefone, site, senha, cnpj FROM editora WHERE id=$1 AND ativo = TRUE", [id])
        if (pedido_editora.rowCount === 0){
            throw new Error("Editora não encontrada ou inativa!")
        }
    
        res.json({editora: pedido_editora.rows[0]})

    }catch(erro){
        return res.status(500).json({msg: erro.message})
    }
});


router.get("/", async (req, res) => {
    try{    
        const pedido_editora = await db.query("SELECT nome, email, telefone, site, senha FROM editora WHERE ativo = TRUE")
        if (pedido_editora.rowCount === 0){
            throw new Error("Editora não encontrada ou inativa!")
        }
    
        res.json({editoras: pedido_editora.rows})

    }catch(erro){
        return res.status(500).json({msg: erro.message})
    }
});

router.post("/login", async (req, res) => {
    try{
        const { cnpj, senha } = req.body || {}

        if (!cnpj){return res.status(400).json({msg: "Cnpj deve ser um parâmetro"})}
        if (!senha){return res.status(400).json({msg: "Senha deve ser um parâmetro"})}

        const envio_login = await db.query("SELECT id, nome, cnpj, email, telefone, site FROM editora WHERE cnpj=$1 AND senha=$2 AND ativo =TRUE", [cnpj, senha])
        if (envio_login.rowCount === 0){
            return res.status(401).json({msg: "Cnpj e/ou senha incorretos!"})
        }

        res.json({editora: envio_login.rows[0]})

    }catch(erro){
        return res.status(500).json({msg: erro.message})
    }
});

router.delete("/:id", async (req, res) => {
    try{
        const id = req.params.id
        const { cnpj, senha } = req.body
    
        const pedido_editora_inativo = await db.query("UPDATE editora SET ativo=FALSE WHERE id=$1 AND senha=$2 AND cnpj=$3 RETURNING nome, email", [id, senha, cnpj])
        if (pedido_editora_inativo.rowCount === 0){
            throw new Error("Editora não encontrada!")
        }
    
        res.json({msg: "Editora desativada", editora: pedido_editora_inativo.rows[0]})

    }catch(erro){
        return res.status(500).json({msg: erro.message})
    }
});

module.exports = router;

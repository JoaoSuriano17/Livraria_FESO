const express = require("express");
const router = express.Router();
const db = require("../db");
/*
CREATE TABLE IF NOT EXISTS usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    login VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(60) NOT NULL,
    img VARCHAR(255),
    nacionalidade VARCHAR(200),
    ativo BOOLEAN NOT NULL DEFAULT TRUE
);
*/

/*
POST   /usuarios *
GET    /usuarios/:id *
PUT    /usuarios/:id *
DELETE /usuarios/:id * (desativar)
POST   /login *
*/

router.post("/", async (req, res) => {
    try{
        const { nome, login, senha, img, nacionalidade } = req.body || {}

        if (!nome){throw new Error("Nome deve ser um parâmetro!")}
        if (!login){throw new Error("Nome de login deve ser um parâmetro!")}
        if (!senha){throw new Error("Senha deve ser um parâmetro!")}
        if (!nacionalidade){throw new Error("Nacionalidade deve ser um parâmetro!")}

        const envio = await db.query("INSERT INTO usuario(nome, login, senha, img, nacionalidade) VALUES ($1, $2, $3, $4, $5) RETURNING id, nome, login", [nome, login, senha, img, nacionalidade])
        if (envio.rowCount === 0){
            throw new Error("Erro ao adicionar o usuário!")
        }

        res.json({msg: "Usuário adicionado com sucesso!", usuario: envio.rows[0]})

    }catch(erro){
        return res.status(500).json({msg: erro.message})
    }
});

router.post("/login", async (req, res) => {
    try{
        const { login, senha } = req.body || {}

        if (!login){return res.status(400).json({msg: "Login deve ser um parâmetro"})}
        if (!senha){return res.status(400).json({msg: "Senha deve ser um parâmetro"})}

        const envio_login = await db.query("SELECT id, nome, login, img, nacionalidade FROM usuario WHERE login=$1 AND senha=$2 AND ativo =TRUE", [login, senha])
        if (envio_login.rowCount === 0){
            return res.status(401).json({msg: "Login e/ou senha incorretos!"})
        }

        res.json({usuario: envio_login.rows[0]})

    }catch(erro){
        return res.status(500).json({msg: erro.message})
    }
});

router.patch("/:id/senha", async (req, res) => {
    try{
        const id = req.params.id
        const { senha_antiga, senha_nova } = req.body || {}
        
        const pedido_usuario_alter_senha = await db.query("UPDATE usuario SET senha=$1 WHERE senha=$2 AND id=$3", [senha_nova, senha_antiga, id])
        if (pedido_usuario_alter_senha.rowCount === 0){
            throw new Error("Usuário não encontrado ou inativo!")
        }
    
        res.json({msg: "Senha alterada com sucesso!"})

    }catch(erro){
        return res.status(500).json({msg: erro.message})
    }
});

router.patch("/:id/img", async (req, res) => {
    try{
        const id = req.params.id
        const { senha, img } = req.body || {}
        
        const pedido_usuario_alter_img = await db.query("UPDATE usuario SET img=$1 WHERE senha=$2 AND id=$3", [img, senha, id])
        if (pedido_usuario_alter_img.rowCount === 0){
            throw new Error("Usuário não encontrado ou inativo!")
        }
    
        res.json({msg: "Img alterada com sucesso!"})

    }catch(erro){
        return res.status(500).json({msg: erro.message})
    }
});

router.get("/:id", async (req, res) => {
    try{
        const id = req.params.id
    
        const pedido_usuario = await db.query("SELECT nome, login, img, nacionalidade FROM usuario WHERE id=$1 AND ativo=TRUE", [id])
        if (pedido_usuario.rowCount === 0){
            throw new Error("Usuário não encontrado ou inativo!")
        }
    
        res.json({usuario: pedido_usuario.rows[0]})

    }catch(erro){
        return res.status(500).json({msg: erro.message})
    }
});

router.delete("/:id", async (req, res) => {
    try{
        const id = req.params.id
        const { senha } = req.body
    
        const pedido_usuario_inativo = await db.query("UPDATE usuario SET ativo=FALSE WHERE id=$1 AND senha=$2 RETURNING login", [id, senha])
        if (pedido_usuario_inativo.rowCount === 0){
            throw new Error("Usuário não encontrado!")
        }
    
        res.json({msg: "Usuário desativado", usuario: pedido_usuario_inativo.rows[0]})

    }catch(erro){
        return res.status(500).json({msg: erro.message})
    }
});



module.exports = router;
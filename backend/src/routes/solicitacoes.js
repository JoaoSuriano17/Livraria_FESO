const express = require("express");
const router = express.Router();
const db = require("../db");

/*
CREATE TABLE IF NOT EXISTS solicitacao_livro (
    id SERIAL PRIMARY KEY,
    idAutor INT NOT NULL,
    idEditora INT NOT NULL,

    titulo VARCHAR(40) NOT NULL,
    classificacao VARCHAR(3),
    volume INTEGER NOT NULL DEFAULT 1,
    data_publicacao INTEGER NOT NULL,
    qtde_paginas INTEGER NOT NULL,
    preco NUMERIC(10,2) NOT NULL,
    sinopse VARCHAR(255),
    tamanho VARCHAR(5),

    status VARCHAR(20) NOT NULL DEFAULT 'PENDENTE',
    observacao VARCHAR(500),

    CONSTRAINT solicitacao_autor_fk FOREIGN KEY (idAutor) REFERENCES autor(id),
    CONSTRAINT solicitacao_editora_fk FOREIGN KEY (idEditora) REFERENCES editora(id),
    CONSTRAINT solicitacao_status_ck CHECK (status IN ( 'PENDENTE', 'APROVADA', 'RECUSADA' )),
    CONSTRAINT solicitacao_volume_ck CHECK (volume > 0),
    CONSTRAINT solicitacao_paginas_ck CHECK (qtde_paginas > 0),
    CONSTRAINT solicitacao_preco_ck CHECK (preco >= 0)
);
*/

router.post("/", async (req, res) => {
    try{
        const { nome, login, senha, nacionalidade } = req.body || {}
        let {img}=req.body

        if (!nome){throw new Error("Nome deve ser um parâmetro!")}
        if (!login){throw new Error("Nome de login deve ser um parâmetro!")}
        if (!senha){throw new Error("Senha deve ser um parâmetro!")}
        if (!nacionalidade){throw new Error("Nacionalidade deve ser um parâmetro!")}
        if (!img){img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxwRq6lrMvJCXjX5CLp_HxfkNT7hViRcAOJZWtqtxgUGaGiYNEXXlpdts&s=10"}

        const envio = await db.query("INSERT INTO usuario(nome, login, senha, img, nacionalidade) VALUES ($1, $2, $3, $4, $5) RETURNING id, nome, login, senha, img, nacionalidade", [nome, login, senha, img, nacionalidade])
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

        const envio_login = await db.query("SELECT id, nome, login, img, nacionalidade, senha FROM usuario WHERE login=$1 AND senha=$2 AND ativo =TRUE", [login, senha])
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
    
        const pedido_usuario = await db.query("SELECT nome, login, img, nacionalidade, senha FROM usuario WHERE id=$1 AND ativo=TRUE", [id])
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
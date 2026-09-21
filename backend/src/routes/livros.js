const express = require("express");
const router = express.Router();
const db = require("../db");
/*
CREATE TABLE IF NOT EXISTS livro (
    id SERIAL PRIMARY KEY,

    idSolicitacao INT NOT NULL UNIQUE,
    idAutor INT NOT NULL,
    idEditora INT NOT NULL,

    titulo VARCHAR(40) NOT NULL,
    classificacao VARCHAR(3),
    volume INTEGER NOT NULL DEFAULT 1,
    data_publicacao INTEGER NOT NULL,
    qtde_paginas INTEGER NOT NULL,

    estoque INTEGER NOT NULL DEFAULT 0,
    preco NUMERIC(10,2) NOT NULL,

    sinopse VARCHAR(255),
    tamanho VARCHAR(5),

    ativo BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT livro_solicitacao_fk
        FOREIGN KEY (idSolicitacao)
        REFERENCES solicitacao_livro(id),

    CONSTRAINT livro_autor_fk
        FOREIGN KEY (idAutor)
        REFERENCES autor(id),

    CONSTRAINT livro_editora_fk
        FOREIGN KEY (idEditora)
        REFERENCES editora(id),

    CONSTRAINT livro_volume_ck
        CHECK (volume > 0),

    CONSTRAINT livro_paginas_ck
        CHECK (qtde_paginas > 0),

    CONSTRAINT livro_estoque_ck
        CHECK (estoque >= 0),

    CONSTRAINT livro_preco_ck
        CHECK (preco >= 0)
);
*/

/*
POST   /livros *
DELETE /usuarios/:id * (desativar)
*/

router.post("/", async (req, res) => {
    try{
        const { nome, login, senha, nacionalidade } = req.body || {}
        //Incompleto!
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

router.delete("/:id", async (req, res) => {
    try{
        const id = req.params.id
        const { cnpj, senha } = req.body
    
        const pedido_post_livro = await db.query("UPDATE livro SET ativo=FALSE WHERE id=$1 AND cnpj=$2 AND senha=$3", [id, cnpj, senha])
        if (pedido_post_livro.rowCount === 0){
            throw new Error("Livro não encontrado!")
        }
    
        res.json({msg: "Livro desativado de uma editora", livro: pedido_post_livro.rows[0]})

    }catch(erro){
        return res.status(500).json({msg: erro.message})
    }
});



module.exports = router;
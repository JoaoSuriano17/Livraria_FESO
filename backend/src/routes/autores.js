const express = require("express");
const router = express.Router();
const db = require("../db");
/*
CREATE TABLE IF NOT EXISTS autor (
    id SERIAL PRIMARY KEY,
    idUsuario INT NOT NULL UNIQUE,
    biografia TEXT,
    data_nascimento DATE,

    CONSTRAINT autor_usuario_fk
        FOREIGN KEY (idUsuario)
        REFERENCES usuario(id)
);
*/

/*
POST   /autores *
GET    /autores/:id
PUT    /autores/:id *
GET    /autores/:id/livros
*/

router.post("/", async (req, res) => {
    try{
        const { nome, login, senha, nacionalidade, biografia, data_nascimento } = req.body || {}
        let {img}=req.body

        if (!nome){throw new Error("Nome deve ser um parâmetro!")}
        if (!login){throw new Error("Nome de login deve ser um parâmetro!")}
        if (!senha){throw new Error("Senha deve ser um parâmetro!")}
        if (!nacionalidade){throw new Error("Nacionalidade deve ser um parâmetro!")}
        if (!biografia){throw new Error("Biografia deve ser um parâmetro!")}
        if (!data_nascimento){throw new Error("Data de nascimento deve ser um parâmetro!")}
        if (!img){img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxwRq6lrMvJCXjX5CLp_HxfkNT7hViRcAOJZWtqtxgUGaGiYNEXXlpdts&s=10"}

        const post_usuario = await db.query("INSERT INTO usuario(nome, login, senha, img, nacionalidade) VALUES ($1, $2, $3, $4, $5) RETURNING id, nome, login, senha, img, nacionalidade", [nome, login, senha, img, nacionalidade])
        const post_usuario_autor = await db.query("INSERT INTO autor(idUsuario, biografia, data_nascimento) VALUES ($1, $2, $3) RETURNING idUsuario, biografia, data_nascimento", [post_usuario.rows[0].id, biografia, data_nascimento])
        if (post_usuario.rowCount === 0){
            throw new Error("Erro ao adicionar o usuário!")
        }else if (post_usuario_autor.rowCount === 0){
            throw new Error("Erro ao adicionar o usuário que é autor!")
        }

        let autor = {
            id: post_usuario.rows[0].id,
            nome: post_usuario.rows[0].nome,
            login: post_usuario.rows[0].login,
            senha:post_usuario.rows[0].senha,
            img: post_usuario.rows[0].img,
            nacionalidade: post_usuario.rows[0].nacionalidade,
            //idAutor: post_usuario_autor.rows[0].idAutor,
            biografia: post_usuario_autor.rows[0].biografia,
            data_nascimento: post_usuario_autor.rows[0].data_nascimento
        }

        res.json({msg: "Autor adicionado com sucesso!", autor: autor})

    }catch(erro){
        return res.status(500).json({msg: erro.message})
    }
});


router.patch("/:id/biografia", async (req, res) => {
    try{
        const id = req.params.id
        const { login, senha, biografia } = req.body || {}
        
        const confere_usuario = await db.query("SELECT id FROM usuario WHERE senha=$1 AND login=$2 AND ativo=true AND id=$3", [senha, login, id])
        if (confere_usuario.rowCount === 0){
            throw new Error("Login e/ou senha incorretos!")
        }

        const pedido_autor_alter_biografia = await db.query("UPDATE autor SET biografia=$1 WHERE idUsuario=$2", [biografia, id])
        if (pedido_autor_alter_biografia.rowCount === 0){
            throw new Error("Erro ao atualizar a biografia!")
        }
    
        res.json({msg: "Biografia alterada com sucesso!"})

    }catch(erro){
        return res.status(500).json({msg: erro.message})
    }
});

router.get("/:id", async (req, res) => {
    try{
        const id = req.params.id
    
        const pedido_autor = await db.query("SELECT * FROM autor WHERE idUsuario = $1", [id])
        if (pedido_autor.rowCount === 0) {
            return res.status(404).json({msg: "Usuário não é autor"});
        }
    
        res.json({autor: pedido_autor.rows[0]})

    }catch(erro){
        return res.status(500).json({msg: erro.message})
    }
});

/*
O usuário que será desativado; portanto, sem essa função: (na dúvida, deixei ela aqui)

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
*/



module.exports = router;

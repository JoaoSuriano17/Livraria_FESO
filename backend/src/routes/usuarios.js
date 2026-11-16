const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const senhaTokenJWT = "senhaSecretissimaIFSP";

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const verificarToken = require("../middlewares/verificarToken");

/*
CREATE TABLE IF NOT EXISTS usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    login VARCHAR(255) NOT NULL UNIQUE,
    senha CHAR(60) NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    img INT
);
*/

// Conferir o middleware verificarToken
//Mudar os atributos das funções abaixo
//Pensar nos selects

router.post("/", upload.single("arquivo"), async (req, res) => {
    try {
        let {nome, email, senha, critico, administrador} = req.body || {};
        if (!nome) { return res.status(400).json({ msg: "Nome não informado!" }); }
        if (!email) { return res.status(400).json({ msg: "E-mail não informado!" }); }
        if (!senha) { return res.status(400).json({ msg: "Senha não informada!" }); }

        let fotografia = null
        if (req.file) {
            const formData = new FormData();
            formData.append(
                "arquivo",
                new Blob([req.file.buffer], {
                    type: req.file.mimetype
                }),
                req.file.originalname
            );

            const resposta = await fetch("http://localhost:3000/arquivo", {
                method: "POST",
                body: formData
            });

            if (!resposta.ok) {
                return res.status(500).json({ msg: "Erro ao salvar a fotografia!" });
            }

            const arquivo = await resposta.json();
            fotografia = arquivo.arquivo.id;
        }
        const senhaHash = await bcrypt.hash(senha, 12);
        critico=(critico=="true"||critico=="True"||critico=="TRUE")?true:false;
        administrador=(administrador=="true"||administrador=="True"||administrador=="TRUE")?true:false;

        const r = await db.query("INSERT INTO usuario(nome, email, critico, administrador, senha, fotografia) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, nome, email, critico, administrador, fotografia", [nome, email, critico, administrador, senhaHash, fotografia]);

        return res.status(201).json({ msg: "Usuário criado com sucesso!", usuario: r.rows[0] });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
});

//POST - Login (Requer: email, senha)
router.post("/login", async (req, res) => {
    try {
        const { email, senha } = req.body || {};
        if (!email) { return res.status(400).json({ msg: "E-mail não informado!" }); }
        if (!senha) { return res.status(400).json({ msg: "Senha não informada!" }); }
        const r = await db.query("SELECT * FROM usuario WHERE email=$1", [email]);
        if (!r.rowCount) { return res.status(400).json({ msg: "Usuário não existe!" }); }
        const confere = await bcrypt.compare(senha, r.rows[0].senha);
        if (!confere) { return res.status(400).json({ msg: "Senha incorreta!" }); }
        const tokenJWT = jwt.sign(
            { data: r.rows[0].id },
            senhaTokenJWT
        );
        return res.status(200).json({ msg: "Login realizado com sucesso!", token: tokenJWT, id:r.rows[0].id });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
});

//PUT - Específico, por id
router.put("/", verificarToken, upload.single("arquivo"), async (req, res) => {
    try {
        const { nome, senha } = req.body || {};
        if (nome) {
            var ra = await db.query("UPDATE usuario SET nome=$1 WHERE id=$2 RETURNING *", [nome, req.user]);
            if (!ra.rowCount) {
                return res.status(400).json({ msg: "Erro ao alterar nome." })
            }
        }
        if (senha) {
            const senhaHash = await bcrypt.hash(senha, 12);
            var re = await db.query("UPDATE usuario SET senha=$1 WHERE id=$2 RETURNING *", [senhaHash, req.user]);
            if (!re.rowCount) {
                return res.status(400).json({ msg: "Erro ao alterar senha." })
            }
        }

        if (req.file) {
            const formData = new FormData();
            formData.append(
                "arquivo",
                new Blob([req.file.buffer], { type: req.file.mimetype }),
                req.file.originalname
            );

            const r = await fetch("http://localhost:3000/arquivo", {
                method: "POST",
                body: formData
            });

            if (!r.ok) {
                return res.status(500).json({ msg: "Erro ao salvar o novo cartaz!" });
            }
            const arquivo = await r.json();
            await db.query("UPDATE usuario SET fotografia = $1 WHERE id = $2", [arquivo.arquivo.id, req.user]);
        }

        let r = await db.query("SELECT nome, email FROM usuario WHERE id=$1", [req.user]);
        return res.status(200).json({ msg: "Usuário alterado com sucesso!", usuario: r.rows[0] });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
});

//DELETE - Específico, por token
router.delete("/", verificarToken, async (req, res) => {
    try {
        const r = await db.query("DELETE FROM usuario WHERE id=$1 RETURNING *", [req.user]);
        //Assim, apenas um usuário pode deletar a si próprio.
        if (!r.rowCount) {
            return res.status(404).json({ msg: "Usuário não encontrado!" });
        }

        return res.status(200).json({ msg: "Usuário apagado com sucesso!", usuario: r.rows[0] });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
});
module.exports = router;
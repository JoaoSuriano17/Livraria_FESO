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
CREATE TABLE IF NOT EXISTS avaliacao (
    id SERIAL PRIMARY KEY,
    idUsuario INT NOT NULL,
    idLivro INT NOT NULL,

    nota INT NOT NULL,
    comentario VARCHAR(1000),
    data_avaliacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT avaliacao_usuario_fk FOREIGN KEY (idUsuario) REFERENCES usuario(id),
    CONSTRAINT avaliacao_livro_fk FOREIGN KEY (idLivro) REFERENCES livro(id),
    CONSTRAINT avaliacao_nota_ck CHECK (nota BETWEEN 1 AND 5),
    CONSTRAINT avaliacao_unica UNIQUE (idUsuario, idLivro)
);
*/


router.post("/:livro", verificarToken, upload.single("arquivo"), async (req, res) => {
    try {
        let idLivro = req.params.livro

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
module.exports = router;
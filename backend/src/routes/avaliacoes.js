const express = require("express");
const router = express.Router();
const db = require("../db");

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

module.exports = router;
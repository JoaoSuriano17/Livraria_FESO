const express = require("express");
const router = express.Router();
const db = require("../db");

/*
CREATE TABLE IF NOT EXISTS favorito (
    idUsuario INT NOT NULL,
    idLivro INT NOT NULL,

    PRIMARY KEY (idUsuario, idLivro),
    CONSTRAINT favorito_usuario_fk FOREIGN KEY (idUsuario) REFERENCES usuario(id),
    CONSTRAINT favorito_livro_fk FOREIGN KEY (idLivro) REFERENCES livro(id)
);
*/

module.exports = router;
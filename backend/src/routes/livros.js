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

    CONSTRAINT livro_solicitacao_fk FOREIGN KEY (idSolicitacao) REFERENCES solicitacao_livro(id),
    
    CONSTRAINT livro_autor_fk FOREIGN KEY (idAutor) REFERENCES autor(id),
    CONSTRAINT livro_editora_fk FOREIGN KEY (idEditora) REFERENCES editora(id),
    CONSTRAINT livro_volume_ck CHECK (volume > 0),
    CONSTRAINT livro_paginas_ck CHECK (qtde_paginas > 0),
    CONSTRAINT livro_estoque_ck CHECK (estoque >= 0),
    CONSTRAINT livro_preco_ck CHECK (preco >= 0)
);
*/

module.exports = router;
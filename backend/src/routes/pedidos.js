const express = require("express");
const router = express.Router();
const db = require("../db");

/*
CREATE TABLE IF NOT EXISTS pedido (
    id SERIAL PRIMARY KEY,

    idUsuario INT NOT NULL,
    logradouro VARCHAR(150) NOT NULL,
    cidade VARCHAR(150) NOT NULL,
    estado VARCHAR(150) NOT NULL,
    cep VARCHAR(150) NOT NULL,

    data_pedido TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDENTE',

    valor_total NUMERIC(10,2) NOT NULL DEFAULT 0,
    frete NUMERIC(10,2) NOT NULL DEFAULT 0,

    CONSTRAINT pedido_usuario_fk FOREIGN KEY (idUsuario) REFERENCES usuario(id),
    CONSTRAINT pedido_valor_ck CHECK (valor_total >= 0),
    CONSTRAINT pedido_frete_ck CHECK (frete >= 0)
);
*/
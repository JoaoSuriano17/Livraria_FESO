const express = require("express");
const router = express.Router();
const db = require("../db");

/*
CREATE TABLE IF NOT EXISTS pagamento (
    id SERIAL PRIMARY KEY,
    idPedido INT NOT NULL,

    metodo VARCHAR(30) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDENTE',
    valor NUMERIC(10,2) NOT NULL,
    data_pagamento TIMESTAMP,

    CONSTRAINT pagamento_pedido_fk FOREIGN KEY (idPedido) REFERENCES pedido(id),
    CONSTRAINT pagamento_valor_ck CHECK (valor >= 0)
);
*/

module.exports = router;
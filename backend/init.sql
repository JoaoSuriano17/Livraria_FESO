-- ============================================================
-- BANCO DE DADOS
-- ============================================================

CREATE DATABASE livraria;

-- Após criar o banco, conecte-se ao banco livraria
-- antes de executar as tabelas abaixo.


-- ============================================================
-- USUARIO
-- ============================================================

CREATE TABLE IF NOT EXISTS usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    login VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(60) NOT NULL,
    img VARCHAR(255),
    nacionalidade VARCHAR(200),
    ativo BOOLEAN NOT NULL DEFAULT TRUE
);


-- ============================================================
-- AUTOR
--
-- Especialização de USUARIO.
-- Um usuário pode ser autor ou não.
-- Se existir registro em AUTOR, ele é autor.
-- ============================================================

CREATE TABLE IF NOT EXISTS autor (
    id SERIAL PRIMARY KEY,
    idUsuario INT NOT NULL UNIQUE,
    biografia TEXT,
    data_nascimento DATE,

    CONSTRAINT autor_usuario_fk
        FOREIGN KEY (idUsuario)
        REFERENCES usuario(id)
);


-- ============================================================
-- EDITORA
-- ============================================================

CREATE TABLE IF NOT EXISTS editora (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL UNIQUE,
    cnpj VARCHAR(18) UNIQUE,
    email VARCHAR(255),
    telefone VARCHAR(20),
    site VARCHAR(255),
    ativo BOOLEAN NOT NULL DEFAULT TRUE
);


-- ============================================================
-- GENERO
-- ============================================================

CREATE TABLE IF NOT EXISTS genero (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao VARCHAR(255),
    ativo BOOLEAN NOT NULL DEFAULT TRUE
);


-- ============================================================
-- SOLICITACAO_LIVRO
--
-- O AUTOR solicita que uma EDITORA publique um livro.
--
-- O livro ainda NÃO existe na tabela LIVRO.
-- ============================================================

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

    data_solicitacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_resposta TIMESTAMP,

    observacao VARCHAR(500),

    CONSTRAINT solicitacao_autor_fk
        FOREIGN KEY (idAutor)
        REFERENCES autor(id),

    CONSTRAINT solicitacao_editora_fk
        FOREIGN KEY (idEditora)
        REFERENCES editora(id),

    CONSTRAINT solicitacao_status_ck
        CHECK (
            status IN (
                'PENDENTE',
                'APROVADA',
                'RECUSADA'
            )
        ),

    CONSTRAINT solicitacao_volume_ck
        CHECK (volume > 0),

    CONSTRAINT solicitacao_paginas_ck
        CHECK (qtde_paginas > 0),

    CONSTRAINT solicitacao_preco_ck
        CHECK (preco >= 0)
);


-- ============================================================
-- LIVRO
--
-- O livro só é criado pela EDITORA após aprovação
-- de uma solicitação.
--
-- ativo = TRUE  -> livro disponível
-- ativo = FALSE -> livro desativado pela editora
-- ============================================================

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


-- ============================================================
-- LIVRO_GENERO
-- ============================================================

CREATE TABLE IF NOT EXISTS livro_genero (
    idLivro INT NOT NULL,
    idGenero INT NOT NULL,

    PRIMARY KEY (idLivro, idGenero),

    CONSTRAINT livro_genero_livro_fk
        FOREIGN KEY (idLivro)
        REFERENCES livro(id),

    CONSTRAINT livro_genero_genero_fk
        FOREIGN KEY (idGenero)
        REFERENCES genero(id)
);


-- ============================================================
-- ENDERECO
-- ============================================================

CREATE TABLE IF NOT EXISTS endereco (
    id SERIAL PRIMARY KEY,

    idUsuario INT NOT NULL,

    cep VARCHAR(10) NOT NULL,
    logradouro VARCHAR(255) NOT NULL,
    numero VARCHAR(20) NOT NULL,
    complemento VARCHAR(100),
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(100) NOT NULL,

    principal BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT endereco_usuario_fk
        FOREIGN KEY (idUsuario)
        REFERENCES usuario(id)
);


-- ============================================================
-- PEDIDO
--
-- Somente USUARIOS compram livros.
-- EDITORA não possui relacionamento com PEDIDO.
-- ============================================================

CREATE TABLE IF NOT EXISTS pedido (
    id SERIAL PRIMARY KEY,

    idUsuario INT NOT NULL,
    idEndereco INT,

    data_pedido TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    status VARCHAR(30) NOT NULL DEFAULT 'PENDENTE',

    valor_total NUMERIC(10,2) NOT NULL DEFAULT 0,
    frete NUMERIC(10,2) NOT NULL DEFAULT 0,

    CONSTRAINT pedido_usuario_fk
        FOREIGN KEY (idUsuario)
        REFERENCES usuario(id),

    CONSTRAINT pedido_endereco_fk
        FOREIGN KEY (idEndereco)
        REFERENCES endereco(id),

    CONSTRAINT pedido_valor_ck
        CHECK (valor_total >= 0),

    CONSTRAINT pedido_frete_ck
        CHECK (frete >= 0)
);


-- ============================================================
-- ITEM_PEDIDO
-- ============================================================

CREATE TABLE IF NOT EXISTS item_pedido (
    id SERIAL PRIMARY KEY,

    idPedido INT NOT NULL,
    idLivro INT NOT NULL,

    quantidade INT NOT NULL,
    preco_unitario NUMERIC(10,2) NOT NULL,

    CONSTRAINT item_pedido_pedido_fk
        FOREIGN KEY (idPedido)
        REFERENCES pedido(id),

    CONSTRAINT item_pedido_livro_fk
        FOREIGN KEY (idLivro)
        REFERENCES livro(id),

    CONSTRAINT item_pedido_quantidade_ck
        CHECK (quantidade > 0),

    CONSTRAINT item_pedido_preco_ck
        CHECK (preco_unitario >= 0)
);


-- ============================================================
-- PAGAMENTO
-- ============================================================

CREATE TABLE IF NOT EXISTS pagamento (
    id SERIAL PRIMARY KEY,

    idPedido INT NOT NULL,

    metodo VARCHAR(30) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDENTE',

    valor NUMERIC(10,2) NOT NULL,

    data_pagamento TIMESTAMP,

    CONSTRAINT pagamento_pedido_fk
        FOREIGN KEY (idPedido)
        REFERENCES pedido(id),

    CONSTRAINT pagamento_valor_ck
        CHECK (valor >= 0)
);


-- ============================================================
-- AVALIACAO
-- ============================================================

CREATE TABLE IF NOT EXISTS avaliacao (
    id SERIAL PRIMARY KEY,

    idUsuario INT NOT NULL,
    idLivro INT NOT NULL,

    nota INT NOT NULL,
    comentario VARCHAR(1000),

    data_avaliacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT avaliacao_usuario_fk
        FOREIGN KEY (idUsuario)
        REFERENCES usuario(id),

    CONSTRAINT avaliacao_livro_fk
        FOREIGN KEY (idLivro)
        REFERENCES livro(id),

    CONSTRAINT avaliacao_nota_ck
        CHECK (nota BETWEEN 1 AND 5),

    CONSTRAINT avaliacao_unica
        UNIQUE (idUsuario, idLivro)
);


-- ============================================================
-- FAVORITO
-- ============================================================

CREATE TABLE IF NOT EXISTS favorito (
    idUsuario INT NOT NULL,
    idLivro INT NOT NULL,

    data_adicionado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (idUsuario, idLivro),

    CONSTRAINT favorito_usuario_fk
        FOREIGN KEY (idUsuario)
        REFERENCES usuario(id),

    CONSTRAINT favorito_livro_fk
        FOREIGN KEY (idLivro)
        REFERENCES livro(id)
);


-- ============================================================
-- CARRINHO
-- ============================================================

CREATE TABLE IF NOT EXISTS carrinho (
    id SERIAL PRIMARY KEY,

    idUsuario INT NOT NULL UNIQUE,

    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT carrinho_usuario_fk
        FOREIGN KEY (idUsuario)
        REFERENCES usuario(id)
);


-- ============================================================
-- ITEM_CARRINHO
-- ============================================================

CREATE TABLE IF NOT EXISTS item_carrinho (
    id SERIAL PRIMARY KEY,

    idCarrinho INT NOT NULL,
    idLivro INT NOT NULL,

    quantidade INT NOT NULL DEFAULT 1,

    CONSTRAINT item_carrinho_carrinho_fk
        FOREIGN KEY (idCarrinho)
        REFERENCES carrinho(id),

    CONSTRAINT item_carrinho_livro_fk
        FOREIGN KEY (idLivro)
        REFERENCES livro(id),

    CONSTRAINT item_carrinho_unico
        UNIQUE (idCarrinho, idLivro),

    CONSTRAINT item_carrinho_quantidade_ck
        CHECK (quantidade > 0)
);


-- ============================================================
-- ESTOQUE_MOVIMENTACAO
-- ============================================================

CREATE TABLE IF NOT EXISTS estoque_movimentacao (
    id SERIAL PRIMARY KEY,

    idLivro INT NOT NULL,

    tipo VARCHAR(20) NOT NULL,
    quantidade INT NOT NULL,

    motivo VARCHAR(255),

    data_movimentacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT estoque_livro_fk
        FOREIGN KEY (idLivro)
        REFERENCES livro(id),

    CONSTRAINT estoque_tipo_ck
        CHECK (
            tipo IN (
                'ENTRADA',
                'SAIDA',
                'AJUSTE'
            )
        ),

    CONSTRAINT estoque_quantidade_ck
        CHECK (quantidade > 0)
);



/*inserções*/
INSERT INTO usuario
(nome, login, senha, nacionalidade)
VALUES
('J. K. Rowling', 'jk.rowling', '123', 'Britânica'), ('Locke', 'locke.filosofo', '123', 'Britânico');

INSERT INTO autor
(idUsuario, biografia, data_nascimento)
VALUES
(
    1,
    'Escritora britânica conhecida pela série Harry Potter.',
    '1965-07-31'
);

INSERT INTO solicitacao_livro
(
    idAutor,
    idEditora,
    titulo,
    classificacao,
    volume,
    data_publicacao,
    qtde_paginas,
    preco,
    sinopse,
    tamanho
)
VALUES
(
    1,
    1,
    'Harry Potter e a Pedra Filosofal',
    '12',
    1,
    1997,
    264,
    50.00,
    'Harry descobre que é um bruxo e começa seus estudos em Hogwarts.',
    '20x14'
);

UPDATE solicitacao_livro
SET
    status = 'APROVADA',
    data_resposta = CURRENT_TIMESTAMP
WHERE id = 1;

INSERT INTO livro
(
    idSolicitacao,
    idAutor,
    idEditora,
    titulo,
    classificacao,
    volume,
    data_publicacao,
    qtde_paginas,
    estoque,
    preco,
    sinopse,
    tamanho
)
SELECT
    id,
    idAutor,
    idEditora,
    titulo,
    classificacao,
    volume,
    data_publicacao,
    qtde_paginas,
    0,
    preco,
    sinopse,
    tamanho
FROM solicitacao_livro
WHERE id = 1
  AND status = 'APROVADA';

INSERT INTO pedido
(
    idUsuario,
    idEndereco,
    valor_total,
    frete
)
VALUES
(
    2,
    1,
    60.00,
    10.00
);

INSERT INTO item_pedido
(
    idPedido,
    idLivro,
    quantidade,
    preco_unitario
)
VALUES
(
    1,
    1,
    1,
    50.00
);

SELECT *
FROM livro
WHERE ativo = TRUE;

CREATE DATABASE livraria;

/* O MER que me salve */

CREATE TABLE IF NOT EXISTS usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    login VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(60) NOT NULL,
    img TEXT,
    nacionalidade VARCHAR(200) NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS autor (
    id SERIAL PRIMARY KEY,
    idUsuario INT NOT NULL UNIQUE,
    biografia TEXT NOT NULL,
    data_nascimento DATE NOT NULL,

    CONSTRAINT autor_usuario_fk
        FOREIGN KEY (idUsuario)
        REFERENCES usuario(id)
);

CREATE TABLE IF NOT EXISTS editora (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(60) NOT NULL,
    cnpj VARCHAR(18) UNIQUE,
    email VARCHAR(255),
    telefone VARCHAR(20),
    site VARCHAR(255),
    ativo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS genero (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao VARCHAR(255),
    ativo BOOLEAN NOT NULL DEFAULT TRUE
);

/*O autor solicita uma publicação de seu livro por uma editora */
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

/* O livro é criado por uma editora, quando a mesma aceita a solicitação de um livro feita por um autor */
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

/*Sobre pedido: Somente usuários compram livros (portanto, uma editora não compra) */

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

CREATE TABLE IF NOT EXISTS carrinho (
    id SERIAL PRIMARY KEY,

    idUsuario INT NOT NULL UNIQUE,

    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT carrinho_usuario_fk
        FOREIGN KEY (idUsuario)
        REFERENCES usuario(id)
);

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

/* INSERÇÕES DO CÓDIGO */


/* Usuário */

INSERT INTO usuario
(nome, login, senha, nacionalidade)
VALUES
('J. K. Rowling', 'jk.rowling', '123', 'Britânica'),
('Locke', 'locke.filosofo', '123', 'Britânico'),
('Maria Oliveira', 'maria.oliveira', '123', 'Brasileira'),
('Carlos Souza', 'carlos.souza', '123', 'Brasileira'),
('Ana Costa', 'ana.costa', '123', 'Brasileira');


/* Autor */

INSERT INTO autor
(idUsuario, biografia, data_nascimento)
VALUES
(
    1,
    'Escritora britânica conhecida pela série Harry Potter.',
    '1965-07-31'
);


/* Editora */

INSERT INTO editora
(nome, cnpj, email, telefone, senha, site)
VALUES
(
    'Rocco',
    '11.111.111/0001-11',
    'contato@rocco.com.br',
    '(11) 1111-1111',
    '123',
    'https://www.rocco.com.br'
),
(
    'Intrínseca',
    '22.222.222/0001-22',
    'contato@intrinseca.com.br',
    '(21) 2222-2222',
    '123',
    'https://intrinseca.com.br'
),
(
    'Companhia das Letras',
    '33.333.333/0001-33',
    'contato@companhiadasletras.com.br',
    '(11) 3333-3333',
    '123',
    'https://www.companhiadasletras.com.br'
);


/* Gêneros */

INSERT INTO genero
(nome, descricao)
VALUES
(
    'Fantasia',
    'Obras que apresentam elementos mágicos, sobrenaturais ou mundos imaginários.'
),
(
    'Romance',
    'Obras centradas em relações amorosas e sentimentos humanos.'
),
(
    'Aventura',
    'Histórias marcadas por viagens, desafios e acontecimentos extraordinários.'
),
(
    'Ficção',
    'Narrativas ficcionais de diferentes estilos e temas.'
),
(
    'Literatura Brasileira',
    'Obras produzidas por autores brasileiros.'
);


/* Endereços */

INSERT INTO endereco
(
    idUsuario,
    cep,
    logradouro,
    numero,
    complemento,
    bairro,
    cidade,
    estado,
    principal
)
VALUES
(
    2,
    '01001-000',
    'Praça da Sé',
    '100',
    NULL,
    'Sé',
    'São Paulo',
    'SP',
    TRUE
),
(
    3,
    '20040-020',
    'Rua do Ouvidor',
    '200',
    'Apartamento 302',
    'Centro',
    'Rio de Janeiro',
    'RJ',
    TRUE
),
(
    4,
    '30130-000',
    'Avenida Afonso Pena',
    '500',
    NULL,
    'Centro',
    'Belo Horizonte',
    'MG',
    TRUE
),
(
    5,
    '80010-000',
    'Rua XV de Novembro',
    '300',
    NULL,
    'Centro',
    'Curitiba',
    'PR',
    TRUE
);


/* Solicitação de livro - autor faz para uma editora */

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
),
(
    1,
    1,
    'Harry Potter e a Câmara Secreta',
    '12',
    2,
    1998,
    287,
    55.00,
    'Harry retorna a Hogwarts e enfrenta novos mistérios.',
    '20x14'
),
(
    1,
    2,
    'Harry Potter e o Prisioneiro de Azkaban',
    '12',
    3,
    1999,
    348,
    60.00,
    'Harry descobre novos segredos sobre seu passado.',
    '20x14'
);


/* Aprovação das solicitações */

UPDATE solicitacao_livro
SET
    status = 'APROVADA',
    data_resposta = CURRENT_TIMESTAMP,
    observacao = 'Solicitação aprovada pela editora.'
WHERE id IN (1, 2);


/* Recusa de um solicitação */

UPDATE solicitacao_livro
SET
    status = 'RECUSADA',
    data_resposta = CURRENT_TIMESTAMP,
    observacao = 'Solicitação recusada pela editora.'
WHERE id = 3;


/* Livro, quando aprovados */

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
    10,
    preco,
    sinopse,
    tamanho
FROM solicitacao_livro
WHERE status = 'APROVADA';


/* Livro - Gênero */

INSERT INTO livro_genero
(idLivro, idGenero)
VALUES
(1, 1),
(1, 3),

(2, 1),
(2, 3);


/* Carrinhos */

INSERT INTO carrinho
(idUsuario)
VALUES
(2),
(3),
(4);


/* Intens do carrinho */

INSERT INTO item_carrinho
(
    idCarrinho,
    idLivro,
    quantidade
)
VALUES
(1, 1, 1),
(1, 2, 1),

(2, 1, 2),

(3, 2, 1);


/* Pedidos */

INSERT INTO pedido
(
    idUsuario,
    idEndereco,
    data_pedido,
    status,
    valor_total,
    frete
)
VALUES
(
    2,
    1,
    '2026-08-01 10:30:00',
    'PAGO',
    60.00,
    10.00
),
(
    3,
    2,
    '2026-08-05 15:20:00',
    'ENVIADO',
    67.00,
    12.00
),
(
    4,
    3,
    '2026-08-10 09:15:00',
    'ENTREGUE',
    65.00,
    10.00
);


/* Itens de um pedido */

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
),
(
    2,
    2,
    1,
    55.00
),
(
    3,
    1,
    1,
    50.00
);


/* Pagamentos */

INSERT INTO pagamento
(
    idPedido,
    metodo,
    status,
    valor,
    data_pagamento
)
VALUES
(
    1,
    'PIX',
    'APROVADO',
    60.00,
    '2026-08-01 10:35:00'
),
(
    2,
    'CARTAO_CREDITO',
    'APROVADO',
    67.00,
    '2026-08-05 15:25:00'
),
(
    3,
    'PIX',
    'APROVADO',
    65.00,
    '2026-08-10 09:20:00'
);


/* Avaliações */

INSERT INTO avaliacao
(
    idUsuario,
    idLivro,
    nota,
    comentario
)
VALUES
(
    2,
    1,
    5,
    'Excelente livro, uma ótima introdução ao universo de Harry Potter.'
),
(
    3,
    2,
    5,
    'Uma história muito envolvente e divertida.'
),
(
    4,
    1,
    4,
    'Livro muito bom e com uma história interessante.'
);


/* Favoritos */

INSERT INTO favorito
(
    idUsuario,
    idLivro
)
VALUES
(2, 1),
(2, 2),
(3, 1),
(4, 2);


/* Estoque - Entrada */

INSERT INTO estoque_movimentacao
(
    idLivro,
    tipo,
    quantidade,
    motivo
)
VALUES
(
    1,
    'ENTRADA',
    10,
    'Estoque inicial'
),
(
    2,
    'ENTRADA',
    10,
    'Estoque inicial'
);


/* Estoque - Saída */

INSERT INTO estoque_movimentacao
(
    idLivro,
    tipo,
    quantidade,
    motivo
)
VALUES
(
    1,
    'SAIDA',
    1,
    'Venda - pedido 1'
),
(
    2,
    'SAIDA',
    1,
    'Venda - pedido 2'
),
(
    1,
    'SAIDA',
    1,
    'Venda - pedido 3'
);


-- Preencha com o SQL de inicialização do 
CREATE DATABASE livraria;

CREATE TABLE IF NOT EXISTS usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    login VARCHAR(255) UNIQUE NOT NULL,
    senha varCHAR(60) NOT NULL,
    img VARCHAR(255),
    autor BOOLEAN DEFAULT FALSE,
    nacionalidade VARCHAR(200) NULL,
    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS editora (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL UNIQUE,
    cnpj VARCHAR(18) UNIQUE,
    email VARCHAR(255),
    telefone VARCHAR(20),
    site VARCHAR(255),
    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS livro (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(40),
    genero VARCHAR(20),
    classificacao VARCHAR(3),
    idEditora INT,
    volume INTEGER NOT NULL,
    data_publicacao INTEGER NOT NULL,
    qtde_paginas INTEGER NOT NULL,
    estoque INTEGER NOT NULL,
    preco INTEGER NOT NULL,
    sinopse VARCHAR(255),
    tamanho VARCHAR(5),
    idUsuario INT NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,

    CONSTRAINT idEditora_FK FOREIGN KEY (idEditora) REFERENCES editora(id),
    CONSTRAINT idUsuario_FK FOREIGN KEY (idUsuario) REFERENCES usuario(id)
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
    principal BOOLEAN DEFAULT FALSE,

    CONSTRAINT endereco_usuario_fk
        FOREIGN KEY (idUsuario) REFERENCES usuario(id)
);

CREATE TABLE IF NOT EXISTS autor (
    id SERIAL PRIMARY KEY,
    idUsuario INT UNIQUE NOT NULL,
    biografia TEXT,
    data_nascimento DATE,

    CONSTRAINT autor_usuario_fk
        FOREIGN KEY (idUsuario) REFERENCES usuario(id)
);

CREATE TABLE IF NOT EXISTS genero (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao VARCHAR(255),
    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS livro_autor (
    idLivro INT NOT NULL,
    idAutor INT NOT NULL,

    PRIMARY KEY (idLivro, idAutor),

    CONSTRAINT livro_autor_livro_fk
        FOREIGN KEY (idLivro) REFERENCES livro(id),

    CONSTRAINT livro_autor_autor_fk
        FOREIGN KEY (idAutor) REFERENCES autor(id)
);

CREATE TABLE IF NOT EXISTS livro_genero (
    idLivro INT NOT NULL,
    idGenero INT NOT NULL,

    PRIMARY KEY (idLivro, idGenero),

    CONSTRAINT livro_genero_livro_fk
        FOREIGN KEY (idLivro) REFERENCES livro(id),

    CONSTRAINT livro_genero_genero_fk
        FOREIGN KEY (idGenero) REFERENCES genero(id)
);

CREATE TABLE IF NOT EXISTS pedido (
    id SERIAL PRIMARY KEY,
    idUsuario INT NOT NULL,
    idEndereco INT,
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDENTE',
    valor_total NUMERIC(10,2) NOT NULL DEFAULT 0,
    frete NUMERIC(10,2) DEFAULT 0,

    CONSTRAINT pedido_usuario_fk
        FOREIGN KEY (idUsuario) REFERENCES usuario(id),

    CONSTRAINT pedido_endereco_fk
        FOREIGN KEY (idEndereco) REFERENCES endereco(id)
);

CREATE TABLE IF NOT EXISTS item_pedido (
    id SERIAL PRIMARY KEY,
    idPedido INT NOT NULL,
    idLivro INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario NUMERIC(10,2) NOT NULL,

    CONSTRAINT item_pedido_pedido_fk
        FOREIGN KEY (idPedido) REFERENCES pedido(id),

    CONSTRAINT item_pedido_livro_fk
        FOREIGN KEY (idLivro) REFERENCES livro(id),

    CONSTRAINT quantidade_positiva
        CHECK (quantidade > 0)
);


CREATE TABLE IF NOT EXISTS pagamento (
    id SERIAL PRIMARY KEY,
    idPedido INT NOT NULL,
    metodo VARCHAR(30) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDENTE',
    valor NUMERIC(10,2) NOT NULL,
    data_pagamento TIMESTAMP,

    CONSTRAINT pagamento_pedido_fk
        FOREIGN KEY (idPedido) REFERENCES pedido(id)
);


CREATE TABLE IF NOT EXISTS avaliacao (
    id SERIAL PRIMARY KEY,
    idUsuario INT NOT NULL,
    idLivro INT NOT NULL,
    nota INT NOT NULL,
    comentario VARCHAR(1000),
    data_avaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT avaliacao_usuario_fk
        FOREIGN KEY (idUsuario) REFERENCES usuario(id),

    CONSTRAINT avaliacao_livro_fk
        FOREIGN KEY (idLivro) REFERENCES livro(id),

    CONSTRAINT nota_valida
        CHECK (nota BETWEEN 1 AND 5),

    CONSTRAINT avaliacao_unica
        UNIQUE (idUsuario, idLivro)
);

CREATE TABLE IF NOT EXISTS favorito (
    idUsuario INT NOT NULL,
    idLivro INT NOT NULL,
    data_adicionado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (idUsuario, idLivro),

    CONSTRAINT favorito_usuario_fk
        FOREIGN KEY (idUsuario) REFERENCES usuario(id),

    CONSTRAINT favorito_livro_fk
        FOREIGN KEY (idLivro) REFERENCES livro(id)
);

CREATE TABLE IF NOT EXISTS carrinho (
    id SERIAL PRIMARY KEY,
    idUsuario INT NOT NULL UNIQUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT carrinho_usuario_fk
        FOREIGN KEY (idUsuario) REFERENCES usuario(id)
);

CREATE TABLE IF NOT EXISTS item_carrinho (
    id SERIAL PRIMARY KEY,
    idCarrinho INT NOT NULL,
    idLivro INT NOT NULL,
    quantidade INT NOT NULL DEFAULT 1,

    CONSTRAINT item_carrinho_carrinho_fk
        FOREIGN KEY (idCarrinho) REFERENCES carrinho(id),

    CONSTRAINT item_carrinho_livro_fk
        FOREIGN KEY (idLivro) REFERENCES livro(id),

    CONSTRAINT item_carrinho_unico
        UNIQUE (idCarrinho, idLivro),

    CONSTRAINT quantidade_carrinho_valida
        CHECK (quantidade > 0)
);

CREATE TABLE IF NOT EXISTS estoque_movimentacao (
    id SERIAL PRIMARY KEY,
    idLivro INT NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    quantidade INT NOT NULL,
    motivo VARCHAR(255),
    data_movimentacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT estoque_livro_fk
        FOREIGN KEY (idLivro) REFERENCES livro(id),

    CONSTRAINT estoque_tipo_valido
        CHECK (tipo IN ('ENTRADA', 'SAIDA', 'AJUSTE')),

    CONSTRAINT estoque_quantidade_valida
        CHECK (quantidade > 0)
);




INSERT INTO usuario
(nome, login, senha, img, autor, nacionalidade, ativo)
VALUES
('João Silva', 'joao.silva', '123', 'joao.jpg', FALSE, 'Brasileira', TRUE),
('Maria Oliveira', 'maria.oliveira', '123', 'maria.jpg', FALSE, 'Brasileira', TRUE),
('Carlos Souza', 'carlos.souza', '123', 'carlos.jpg', FALSE, 'Brasileira', TRUE),
('Carlos Souza2', 'carlos.souza.autor', '123', 'carlos.jpg', TRUE, 'Brasileira', TRUE),

('J. K. Rowling', 'jk.rowling', '123', 'jk.jpg', TRUE, 'Britânica', TRUE),
('George R. R. Martin', 'george.martin', '123', 'george.jpg', TRUE, 'Norte-Americana', TRUE),
('Machado de Assis', 'machado.assis', '123', 'machado.jpg', TRUE, 'Brasileira', TRUE),
('Jorge Amado', 'jorge.amado', '123', 'jorge.jpg', TRUE, 'Brasileira', TRUE),
('Rick Riordan', 'rick.riordan', '123', 'rick.jpg', TRUE, 'Norte-Americana', TRUE);



INSERT INTO autor
(idUsuario, biografia, data_nascimento)
VALUES
(
    4,
    'Autor brasileiro independente especializado em literatura fantástica.',
    '1985-05-10'
),
(
    5,
    'Escritora britânica conhecida pela série Harry Potter.',
    '1965-07-31'
),
(
    6,
    'Escritor norte-americano conhecido pela série As Crônicas de Gelo e Fogo.',
    '1948-09-20'
),
(
    7,
    'Um dos maiores escritores brasileiros, autor de obras como Dom Casmurro.',
    '1839-06-21'
),
(
    8,
    'Escritor brasileiro conhecido por obras como Capitães da Areia.',
    '1912-08-10'
),
(
    9,
    'Escritor norte-americano conhecido pela série Percy Jackson.',
    '1964-06-05'
);


INSERT INTO editora
(nome, cnpj, email, telefone, site, ativo)
VALUES
(
    'Rocco',
    '11.111.111/0001-11',
    'contato@rocco.com.br',
    '(11) 1111-1111',
    'https://www.rocco.com.br',
    TRUE
),
(
    'Intrínseca',
    '22.222.222/0001-22',
    'contato@intrinseca.com.br',
    '(21) 2222-2222',
    'https://intrinseca.com.br',
    TRUE
),
(
    'Companhia das Letras',
    '33.333.333/0001-33',
    'contato@companhiadasletras.com.br',
    '(11) 3333-3333',
    'https://www.companhiadasletras.com.br',
    TRUE
),
(
    'Record',
    '44.444.444/0001-44',
    'contato@record.com.br',
    '(21) 4444-4444',
    'https://record.com.br',
    TRUE
);


INSERT INTO genero
(nome, descricao, ativo)
VALUES
(
    'Fantasia',
    'Obras que apresentam elementos mágicos, sobrenaturais ou mundos imaginários.',
    TRUE
),
(
    'Romance',
    'Obras centradas em relações amorosas e sentimentos humanos.',
    TRUE
),
(
    'Aventura',
    'Histórias marcadas por viagens, desafios e acontecimentos extraordinários.',
    TRUE
),
(
    'Ficção',
    'Narrativas ficcionais de diferentes estilos e temas.',
    TRUE
),
(
    'Literatura Brasileira',
    'Obras produzidas por autores brasileiros.',
    TRUE
);


INSERT INTO livro
(
    titulo,
    classificacao,
    idEditora,
    volume,
    data_publicacao,
    qtde_paginas,
    estoque,
    preco,
    sinopse,
    tamanho,
    idUsuario,
    ativo
)
VALUES
(
    'Harry Potter e a Pedra Filosofal',
    '12',
    1,
    1,
    1997,
    264,
    10,
    50.00,
    'Harry descobre que é um bruxo e começa seus estudos em Hogwarts.',
    '20x14',
    1,
    TRUE
),
(
    'Harry Potter e a Câmara Secreta',
    '12',
    1,
    2,
    1998,
    287,
    8,
    55.00,
    'Harry retorna a Hogwarts e enfrenta novos mistérios.',
    '20x14',
    1,
    TRUE
),
(
    'A Guerra dos Tronos',
    '16',
    2,
    1,
    1996,
    592,
    7,
    70.00,
    'Famílias nobres disputam o poder em um reino marcado por conflitos.',
    '23x16',
    2,
    TRUE
),
(
    'Dom Casmurro',
    '14',
    3,
    1,
    1899,
    256,
    15,
    40.00,
    'Bentinho relembra sua vida e seu relacionamento com Capitu.',
    '21x14',
    3,
    TRUE
),
(
    'Capitães da Areia',
    '14',
    4,
    1,
    1937,
    280,
    12,
    45.00,
    'A história de um grupo de meninos que vive nas ruas de Salvador.',
    '21x14',
    1,
    TRUE
),
(
    'Percy Jackson e o Ladrão de Raios',
    '12',
    2,
    1,
    2005,
    384,
    20,
    60.00,
    'Percy descobre ser filho de um deus grego e parte em uma aventura.',
    '23x16',
    2,
    TRUE
);



INSERT INTO livro_autor
(idLivro, idAutor)
VALUES
(1, 2), -- Harry Potter -> J.K. Rowling
(2, 2), -- Harry Potter 2 -> J.K. Rowling
(3, 3), -- Guerra dos Tronos -> George Martin
(4, 4), -- Dom Casmurro -> Machado
(5, 5), -- Capitães da Areia -> Jorge Amado
(6, 6); -- Percy Jackson -> Rick Riordan


INSERT INTO livro_genero
(idLivro, idGenero)
VALUES
(1, 1), -- Harry Potter -> Fantasia
(1, 3), -- Harry Potter -> Aventura

(2, 1), -- Harry Potter 2 -> Fantasia
(2, 3), -- Harry Potter 2 -> Aventura

(3, 1), -- Guerra dos Tronos -> Fantasia
(3, 3), -- Guerra dos Tronos -> Aventura

(4, 2), -- Dom Casmurro -> Romance
(4, 5), -- Dom Casmurro -> Literatura Brasileira

(5, 2), -- Capitães -> Romance
(5, 5), -- Capitães -> Literatura Brasileira

(6, 1), -- Percy Jackson -> Fantasia
(6, 3); -- Percy Jackson -> Aventura



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
    1,
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
    2,
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
    3,
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
    4,
    '80010-000',
    'Rua XV de Novembro',
    '300',
    NULL,
    'Centro',
    'Curitiba',
    'PR',
    TRUE
);


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
    1,
    1,
    '2026-08-01 10:30:00',
    'PAGO',
    105.00,
    10.00
),
(
    2,
    2,
    '2026-08-05 15:20:00',
    'ENVIADO',
    110.00,
    12.00
),
(
    3,
    3,
    '2026-08-10 09:15:00',
    'ENTREGUE',
    85.00,
    10.00
),
(
    1,
    1,
    '2026-08-15 18:45:00',
    'PENDENTE',
    60.00,
    8.00
);


INSERT INTO item_pedido
(
    idPedido,
    idLivro,
    quantidade,
    preco_unitario
)
VALUES
(1, 1, 1, 50.00),
(1, 2, 1, 55.00),

(2, 3, 1, 70.00),
(2, 4, 1, 40.00),

(3, 5, 1, 45.00),
(3, 6, 1, 60.00),

(4, 6, 1, 60.00);


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
    115.00,
    '2026-08-01 10:35:00'
),
(
    2,
    'CARTAO_CREDITO',
    'APROVADO',
    122.00,
    '2026-08-05 15:25:00'
),
(
    3,
    'PIX',
    'APROVADO',
    95.00,
    '2026-08-10 09:20:00'
),
(
    4,
    'PIX',
    'PENDENTE',
    68.00,
    NULL
);


INSERT INTO avaliacao
(
    idUsuario,
    idLivro,
    nota,
    comentario,
    data_avaliacao
)
VALUES
(
    1,
    1,
    5,
    'Excelente livro, uma ótima introdução ao universo de Harry Potter.',
    '2026-08-03 14:00:00'
),
(
    2,
    3,
    5,
    'Uma história envolvente e cheia de personagens marcantes.',
    '2026-08-07 16:30:00'
),
(
    3,
    4,
    4,
    'Um clássico muito interessante da literatura brasileira.',
    '2026-08-12 11:00:00'
),
(
    1,
    5,
    5,
    'Livro emocionante e com personagens muito bem construídos.',
    '2026-08-14 13:20:00'
),
(
    2,
    6,
    5,
    'Uma excelente aventura para leitores mais jovens.',
    '2026-08-16 17:40:00'
);

INSERT INTO favorito
(
    idUsuario,
    idLivro,
    data_adicionado
)
VALUES
(1, 3, '2026-08-01 12:00:00'),
(1, 6, '2026-08-02 12:00:00'),
(2, 1, '2026-08-04 13:00:00'),
(2, 5, '2026-08-05 14:00:00'),
(3, 2, '2026-08-06 15:00:00'),
(3, 4, '2026-08-07 16:00:00');


INSERT INTO carrinho
(
    idUsuario,
    criado_em,
    atualizado_em
)
VALUES
(
    1,
    '2026-08-20 10:00:00',
    '2026-08-20 10:30:00'
),
(
    2,
    '2026-08-20 11:00:00',
    '2026-08-20 11:45:00'
),
(
    3,
    '2026-08-21 09:00:00',
    '2026-08-21 09:20:00'
);


INSERT INTO item_carrinho
(
    idCarrinho,
    idLivro,
    quantidade
)
VALUES
(1, 3, 1),
(1, 6, 2),

(2, 1, 1),
(2, 4, 1),

(3, 2, 2),
(3, 5, 1);

INSERT INTO estoque_movimentacao
(
    idLivro,
    tipo,
    quantidade,
    motivo,
    data_movimentacao
)
VALUES
(
    1,
    'ENTRADA',
    10,
    'Estoque inicial',
    '2026-07-01 08:00:00'
),
(
    2,
    'ENTRADA',
    8,
    'Estoque inicial',
    '2026-07-01 08:05:00'
),
(
    3,
    'ENTRADA',
    7,
    'Estoque inicial',
    '2026-07-01 08:10:00'
),
(
    4,
    'ENTRADA',
    15,
    'Estoque inicial',
    '2026-07-01 08:15:00'
),
(
    5,
    'ENTRADA',
    12,
    'Estoque inicial',
    '2026-07-01 08:20:00'
),
(
    6,
    'ENTRADA',
    20,
    'Estoque inicial',
    '2026-07-01 08:25:00'
),
(
    1,
    'SAIDA',
    1,
    'Venda - pedido 1',
    '2026-08-01 10:30:00'
),
(
    2,
    'SAIDA',
    1,
    'Venda - pedido 1',
    '2026-08-01 10:30:00'
),
(
    3,
    'SAIDA',
    1,
    'Venda - pedido 2',
    '2026-08-05 15:20:00'
),
(
    4,
    'SAIDA',
    1,
    'Venda - pedido 2',
    '2026-08-05 15:20:00'
),
(
    5,
    'SAIDA',
    1,
    'Venda - pedido 3',
    '2026-08-10 09:15:00'
),
(
    6,
    'SAIDA',
    1,
    'Venda - pedido 3',
    '2026-08-10 09:15:00'
);


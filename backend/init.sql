CREATE DATABASE livraria;

CREATE TABLE arquivo_imagem(
    id SERIAL PRIMARY KEY,
    nome_original VARCHAR(255) NOT NULL,
    tipo_mime VARCHAR(100),
    tamanho_bytes BIGINT NOT NULL,
    conteudo BYTEA NOT NULL
);

CREATE TABLE IF NOT EXISTS usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    login VARCHAR(255) NOT NULL UNIQUE,
    senha CHAR(60) NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    img INT
);

CREATE TABLE IF NOT EXISTS autor (
    id SERIAL PRIMARY KEY,
    idUsuario INT NOT NULL UNIQUE,
    biografia TEXT NOT NULL,
    data_nascimento DATE NOT NULL,

    CONSTRAINT autor_usuario_fk FOREIGN KEY (idUsuario) REFERENCES usuario(id)
);

CREATE TABLE IF NOT EXISTS editora (
    id SERIAL PRIMARY KEY ,
    cnpj VARCHAR(18) NOT NULL,
    nome VARCHAR(150) NOT NULL UNIQUE,
    senha CHAR(60) NOT NULL,
    email VARCHAR(255),
    img INT,
    ativo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS genero (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao VARCHAR(255),
    ativo BOOLEAN NOT NULL DEFAULT TRUE
    /* CONSTRAINT */
);

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
    observacao VARCHAR(500),

    CONSTRAINT solicitacao_autor_fk FOREIGN KEY (idAutor) REFERENCES autor(id),
    CONSTRAINT solicitacao_editora_fk FOREIGN KEY (idEditora) REFERENCES editora(id),
    CONSTRAINT solicitacao_status_ck CHECK (status IN ( 'PENDENTE', 'APROVADA', 'RECUSADA' )),
    CONSTRAINT solicitacao_volume_ck CHECK (volume > 0),
    CONSTRAINT solicitacao_paginas_ck CHECK (qtde_paginas > 0),
    CONSTRAINT solicitacao_preco_ck CHECK (preco >= 0)
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

    CONSTRAINT livro_solicitacao_fk FOREIGN KEY (idSolicitacao) REFERENCES solicitacao_livro(id),
    
    CONSTRAINT livro_autor_fk FOREIGN KEY (idAutor) REFERENCES autor(id),
    CONSTRAINT livro_editora_fk FOREIGN KEY (idEditora) REFERENCES editora(id),
    CONSTRAINT livro_volume_ck CHECK (volume > 0),
    CONSTRAINT livro_paginas_ck CHECK (qtde_paginas > 0),
    CONSTRAINT livro_estoque_ck CHECK (estoque >= 0),
    CONSTRAINT livro_preco_ck CHECK (preco >= 0)
);

CREATE TABLE IF NOT EXISTS livro_genero (
    idLivro INT NOT NULL,
    idGenero INT NOT NULL,

    PRIMARY KEY (idLivro, idGenero),
    CONSTRAINT livro_genero_livro_fk FOREIGN KEY (idLivro) REFERENCES livro(id),
    CONSTRAINT livro_genero_genero_fk FOREIGN KEY (idGenero) REFERENCES genero(id)
);

/*Sobre pedido: Somente usuários compram livros (portanto, uma editora não compra) */
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

CREATE TABLE IF NOT EXISTS item_pedido (
    id SERIAL PRIMARY KEY,
    idPedido INT NOT NULL,
    idLivro INT NOT NULL,

    quantidade INT NOT NULL,
    preco_unitario NUMERIC(10,2) NOT NULL,

    CONSTRAINT item_pedido_pedido_fk FOREIGN KEY (idPedido) REFERENCES pedido(id),
    CONSTRAINT item_pedido_livro_fk FOREIGN KEY (idLivro) REFERENCES livro(id),
    CONSTRAINT item_pedido_quantidade_ck CHECK (quantidade > 0),
    CONSTRAINT item_pedido_preco_ck CHECK (preco_unitario >= 0)
);

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

CREATE TABLE IF NOT EXISTS favorito (
    idUsuario INT NOT NULL,
    idLivro INT NOT NULL,

    PRIMARY KEY (idUsuario, idLivro),
    CONSTRAINT favorito_usuario_fk FOREIGN KEY (idUsuario) REFERENCES usuario(id),
    CONSTRAINT favorito_livro_fk FOREIGN KEY (idLivro) REFERENCES livro(id)
);

INSERT INTO usuario (id, nome, login, senha, ativo, img) VALUES (1, 'Ana Clara', 'anaclara', '$2b$12$1234567890123456789012345678901234567890123456789012', TRUE, 1), (2, 'Pedro Henrique', 'pedrohenrique', '$2b$12$1234567890123456789012345678901234567890123456789012', TRUE, 2), (3, 'Mariana Souza', 'marianasouza', '$2b$12$1234567890123456789012345678901234567890123456789012', TRUE, 3), (4, 'Lucas Oliveira', 'lucasoliveira', '$2b$12$1234567890123456789012345678901234567890123456789012', TRUE, 4), (5, 'Beatriz Lima', 'beatrizlima', '$2b$12$1234567890123456789012345678901234567890123456789012', TRUE, 5), (6, 'Gabriel Santos', 'gabrielsantos', '$2b$12$1234567890123456789012345678901234567890123456789012', TRUE, 6), (7, 'Julia Martins', 'juliamartins', '$2b$12$1234567890123456789012345678901234567890123456789012', TRUE, 7), (8, 'Rafael Costa', 'rafaelcosta', '$2b$12$1234567890123456789012345678901234567890123456789012', TRUE, 8);
INSERT INTO autor (id, idUsuario, biografia, data_nascimento) VALUES (1, 1, 'Escritora de romances contemporâneos e histórias emocionantes.', '1995-04-12'), (2, 2, 'Autor de livros de fantasia e ficção científica.', '1988-09-23'), (3, 3, 'Escritora especializada em suspense e mistério.', '1992-01-15'), (4, 4, 'Autor de obras de desenvolvimento pessoal.', '1985-07-30'), (5, 5, 'Escritora de literatura juvenil e aventura.', '1998-11-05');
INSERT INTO editora (id, cnpj, nome, senha, email, img, ativo) VALUES (1, '12.345.678/0001-90', 'Editora Horizonte', '$2b$12$1234567890123456789012345678901234567890123456789012', 'contato@horizonte.com.br', 1, TRUE), (2, '23.456.789/0001-01', 'Editora Saber', '$2b$12$1234567890123456789012345678901234567890123456789012', 'contato@saber.com.br', 2, TRUE), (3, '34.567.890/0001-12', 'Editora Universo', '$2b$12$1234567890123456789012345678901234567890123456789012', 'contato@universo.com.br', 3, TRUE);
INSERT INTO genero (id, nome, descricao, ativo) VALUES (1, 'Romance', 'Histórias com foco em relacionamentos e sentimentos.', TRUE), (2, 'Fantasia', 'Narrativas com elementos mágicos e sobrenaturais.', TRUE), (3, 'Suspense', 'Histórias com mistérios e tensão.', TRUE), (4, 'Ficção Científica', 'Narrativas envolvendo ciência e tecnologia.', TRUE), (5, 'Desenvolvimento Pessoal', 'Livros sobre crescimento e aprimoramento pessoal.', TRUE);
INSERT INTO solicitacao_livro (id, idAutor, idEditora, titulo, classificacao, volume, data_publicacao, qtde_paginas, preco, sinopse, tamanho, status, observacao) VALUES (1, 1, 1, 'Entre Dois Mundos', '12', 1, 2025, 320, 49.90, 'Uma história sobre amor e escolhas.', '16x23', 'APROVADA', 'Publicação aprovada.'), (2, 2, 2, 'O Reino Perdido', '14', 1, 2025, 450, 59.90, 'Uma aventura em um reino mágico.', '16x23', 'APROVADA', 'Publicação aprovada.'), (3, 3, 3, 'Segredos da Noite', '16', 1, 2024, 280, 44.90, 'Um mistério envolvendo uma antiga família.', '14x21', 'APROVADA', 'Publicação aprovada.'), (4, 4, 1, 'O Poder da Mudança', 'L', 1, 2025, 200, 39.90, 'Um guia para transformar sua vida.', '14x21', 'APROVADA', 'Publicação aprovada.'), (5, 5, 2, 'A Ilha Misteriosa', '10', 1, 2025, 310, 54.90, 'Uma aventura em uma ilha desconhecida.', '16x23', 'APROVADA', 'Publicação aprovada.'), (6, 1, 3, 'Cartas de Outono', '12', 1, 2024, 250, 42.90, 'Uma história de amor e reencontros.', '14x21', 'APROVADA', 'Publicação aprovada.'), (7, 2, 1, 'Além das Estrelas', '12', 1, 2025, 390, 64.90, 'Uma jornada pelo universo desconhecido.', '16x23', 'APROVADA', 'Publicação aprovada.'), (8, 3, 2, 'A Última Testemunha', '16', 1, 2024, 340, 52.90, 'Um crime e uma testemunha misteriosa.', '16x23', 'APROVADA', 'Publicação aprovada.'), (9, 4, 3, 'Disciplina e Sucesso', 'L', 1, 2025, 180, 34.90, 'Estratégias para alcançar objetivos.', '14x21', 'APROVADA', 'Publicação aprovada.'), (10, 5, 1, 'O Guardião da Floresta', '10', 1, 2025, 360, 57.90, 'Uma aventura fantástica pela natureza.', '16x23', 'APROVADA', 'Publicação aprovada.');
INSERT INTO livro (id, idSolicitacao, idAutor, idEditora, titulo, classificacao, volume, data_publicacao, qtde_paginas, estoque, preco, sinopse, tamanho, ativo) VALUES (1, 1, 1, 1, 'Entre Dois Mundos', '12', 1, 2025, 320, 30, 49.90, 'Uma história sobre amor e escolhas.', '16x23', TRUE), (2, 2, 2, 2, 'O Reino Perdido', '14', 1, 2025, 450, 25, 59.90, 'Uma aventura em um reino mágico.', '16x23', TRUE), (3, 3, 3, 3, 'Segredos da Noite', '16', 1, 2024, 280, 18, 44.90, 'Um mistério envolvendo uma antiga família.', '14x21', TRUE), (4, 4, 4, 1, 'O Poder da Mudança', 'L', 1, 2025, 200, 40, 39.90, 'Um guia para transformar sua vida.', '14x21', TRUE), (5, 5, 5, 2, 'A Ilha Misteriosa', '10', 1, 2025, 310, 22, 54.90, 'Uma aventura em uma ilha desconhecida.', '16x23', TRUE), (6, 6, 1, 3, 'Cartas de Outono', '12', 1, 2024, 250, 15, 42.90, 'Uma história de amor e reencontros.', '14x21', TRUE), (7, 7, 2, 1, 'Além das Estrelas', '12', 1, 2025, 390, 28, 64.90, 'Uma jornada pelo universo desconhecido.', '16x23', TRUE), (8, 8, 3, 2, 'A Última Testemunha', '16', 1, 2024, 340, 20, 52.90, 'Um crime e uma testemunha misteriosa.', '16x23', TRUE), (9, 9, 4, 3, 'Disciplina e Sucesso', 'L', 1, 2025, 180, 35, 34.90, 'Estratégias para alcançar objetivos.', '14x21', TRUE), (10, 10, 5, 1, 'O Guardião da Floresta', '10', 1, 2025, 360, 12, 57.90, 'Uma aventura fantástica pela natureza.', '16x23', TRUE);
INSERT INTO livro_genero (idLivro, idGenero) VALUES (1, 1), (1, 3), (2, 2), (2, 4), (3, 3), (3, 1), (4, 5), (5, 2), (5, 3), (6, 1), (7, 4), (7, 2), (8, 3), (9, 5), (10, 2);
INSERT INTO pedido (id, idUsuario, logradouro, cidade, estado, cep, status, valor_total, frete) VALUES (1, 1, 'Rua das Flores, 120', 'São Paulo', 'SP', '01001-000', 'ENTREGUE', 104.80, 10.00), (2, 2, 'Avenida Central, 250', 'Rio de Janeiro', 'RJ', '20040-020', 'PAGO', 124.80, 12.00), (3, 3, 'Rua da Liberdade, 45', 'Belo Horizonte', 'MG', '30130-110', 'PENDENTE', 54.90, 9.00), (4, 4, 'Rua Paraná, 300', 'Curitiba', 'PR', '80010-000', 'ENTREGUE', 92.80, 10.00), (5, 5, 'Avenida Brasil, 90', 'Salvador', 'BA', '40020-000', 'CANCELADO', 57.90, 8.00);INSERT INTO item_pedido (id, idPedido, idLivro, quantidade, preco_unitario) VALUES (1, 1, 1, 1, 49.90), (2, 1, 3, 1, 44.90), (3, 2, 2, 1, 59.90), (4, 2, 7, 1, 64.90), (5, 3, 5, 1, 54.90), (6, 4, 4, 1, 39.90), (7, 4, 6, 1, 42.90), (8, 5, 10, 1, 57.90);
INSERT INTO pagamento (id, idPedido, metodo, status, valor, data_pagamento) VALUES (1, 1, 'PIX', 'APROVADO', 104.80, '2025-10-10 14:35:00'), (2, 2, 'CARTAO_CREDITO', 'APROVADO', 124.80, '2025-10-12 10:20:00'), (3, 3, 'BOLETO', 'PENDENTE', 63.90, NULL), (4, 4, 'PIX', 'APROVADO', 92.80, '2025-10-18 09:25:00'), (5, 5, 'PIX', 'ESTORNADO', 65.90, '2025-10-20 18:05:00');
INSERT INTO avaliacao (id, idUsuario, idLivro, nota, comentario, data_avaliacao) VALUES (1, 1, 2, 5, 'Livro incrível, história muito envolvente!', '2025-10-21 12:00:00'), (2, 2, 1, 4, 'Gostei bastante da história.', '2025-10-22 13:30:00'), (3, 3, 4, 5, 'Excelente livro, recomendo!', '2025-10-23 15:00:00'), (4, 4, 5, 3, 'A história é boa, mas poderia ser mais desenvolvida.', '2025-10-24 16:20:00'), (5, 5, 3, 5, 'Um dos melhores livros de suspense que já li.', '2025-10-25 17:45:00'), (6, 6, 7, 4, 'Muito criativo e interessante.', '2025-10-26 10:00:00'), (7, 7, 8, 5, 'Final surpreendente!', '2025-10-27 11:30:00'), (8, 8, 9, 4, 'Uma leitura muito útil.', '2025-10-28 14:00:00'), (9, 1, 10, 5, 'Adorei a aventura e os personagens.', '2025-10-29 15:30:00'), (10, 2, 6, 4, 'Uma história emocionante.', '2025-10-30 16:00:00');
INSERT INTO favorito (idUsuario, idLivro) VALUES (1, 2), (1, 5), (2, 1), (2, 7), (3, 4), (3, 8), (4, 3), (5, 10);
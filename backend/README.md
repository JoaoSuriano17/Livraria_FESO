USUARIO
   │
   ├──< ENDERECO
   │
   ├──< PEDIDO
   │       │
   │       ├──< ITEM_PEDIDO >── LIVRO
   │       │
   │       └── PAGAMENTO
   │
   ├──< AVALIACAO >── LIVRO
   │
   ├──< FAVORITO >── LIVRO
   │
   └──── CARRINHO
            │
            └──< ITEM_CARRINHO >── LIVRO


AUTOR
   │
   └──< LIVRO_AUTOR >── LIVRO


GENERO
   │
   └──< LIVRO_GENERO >── LIVRO


EDITORA
   │
   └──────────────< LIVRO


LIVRO
   │
   └──< ESTOQUE_MOVIMENTACAO

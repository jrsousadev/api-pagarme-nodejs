## 😺 Pagarme API Integration with NodeJS, Prisma and MongoDB

API Desenvolvida para ajudar pessoas com dificuldade em implementar o Pagarme no seus devidos projetos.

## O que foi utilizado no projeto:

- [x] Typescript
- [x] Express
- [x] MongoDB
- [x] Pagarme
- [x] Prisma
- [x] Nodejs

### Regras de negócio:

- [x] Criar Transação
- [x] Ler todas as Transações
- [x] Criar Carrinho     
- [x] Deletar Carrinho         
- [x] Ler todos os Carrinhos
- [x] Ler um Carrinho
- [x] Atualizar Carrinho 

### Endpoints Cart:

- [x] [POST] "/api/cart"
- [x] [PUT] "/api/cart/:id"
- [x] [DELETE] "/api/cart/:id"
- [x] [GET] "/api/cart/:id"
- [x] [GET] "/api/cart"

### Endpoints Transaction:

- [x] [POST] "/api/transaction"
- [x] [GET] "/api/transaction"

### Arquitetura do Projeto

```
.
├── src/
│   └── @types
│   └── database
│   └── DTO
│   └── modules
│     └── CartModule
│     └── TransactionModule
│   └── providers
│     └── PagarMeProvider
|   └── repositories
│     └── CartRepository
│     └── TransactionRepository
|   └── shared
|       └── containers
|       └── controllers
|       └── errors
|       └── http
|         └── middlewares
|         └── routes
|           └── Cart-routes
|           └── Transaction-routes
|           └── Postback-routes
|         └── schemas
|           └── Cart-schemas
|           └── Transaction-schemas
|         └── app.ts
|         └── server.ts
|       └── useCases
│         └── CartUseCases
│         └── TransactionUseCases
│         └── PostbackUseCases
|       └── utils
└── ...
```

### Explicação do .ENV
![Screenshot_2](https://user-images.githubusercontent.com/92350736/196009138-fe827df0-56e5-426c-9064-a52cb0953881.png)


### Iniciando o Projeto

- Clone o repositório e instale as dependências.
```sh
# install dependencies
> yarn
# or
> yarn install

# copy .env file
> cp .env.example .env

# Generating MONGODB
> yarn prisma generate

# start project
> yarn dev

# open in
http://localhost:3000/
```

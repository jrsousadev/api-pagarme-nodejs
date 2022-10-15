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

### Criando uma transação no tipo: Cartão de Crédito
![Screenshot_3](https://user-images.githubusercontent.com/92350736/196009270-9e95104d-17b4-469c-b6ca-f87b80d364f6.png)

### Criando uma transação no tipo: Boleto
![Screenshot_1](https://user-images.githubusercontent.com/92350736/196009295-28f27067-ef87-4ba9-9214-34914126e695.png)

### Criando uma transação no tipo: PIX
![Screenshot_1](https://user-images.githubusercontent.com/92350736/196009336-86be10c3-56e8-41e5-807f-42fe5f935da8.png)

### Atualizando status de transação
![Screenshot_1](https://user-images.githubusercontent.com/92350736/196009455-14491cad-8852-44db-98ba-999cadad8fbe.png)

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

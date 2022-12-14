## πΊ Pagarme API Integration with NodeJS, Prisma and MongoDB

API Desenvolvida para ajudar pessoas com dificuldade em implementar o Pagarme no seus devidos projetos.

## O que foi utilizado no projeto

- [x] Dependency Injection
- [x] Swagger
- [x] Typescript
- [x] Express
- [x] MongoDB
- [x] Pagarme
- [x] Prisma
- [x] Nodejs

### DocumentaΓ§Γ£o Swagger
- [x] http://localhost:3000/docs

### Regras de negΓ³cio

- [x] Criar TransaΓ§Γ£o
- [x] Ler todas as TransaΓ§Γ΅es
- [x] Criar Carrinho     
- [x] Deletar Carrinho         
- [x] Ler todos os Carrinhos
- [x] Ler um Carrinho
- [x] Atualizar Carrinho 

### Endpoints Cart

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
βββ src/
β   βββ @types
β   βββ database
β   βββ DTO
β   βββ modules
β     βββ CartModule
β     βββ TransactionModule
β   βββ providers
β     βββ PagarMeProvider
|   βββ repositories
β     βββ CartRepository
β     βββ TransactionRepository
|   βββ shared
|       βββ containers
|       βββ controllers
|       βββ errors
|       βββ http
|         βββ middlewares
|         βββ routes
|           βββ Cart-routes
|           βββ Transaction-routes
|           βββ Postback-routes
|         βββ schemas
|           βββ Cart-schemas
|           βββ Transaction-schemas
|         βββ app.ts
|         βββ server.ts
|       βββ useCases
β         βββ CartUseCases
β         βββ TransactionUseCases
β         βββ PostbackUseCases
|       βββ utils
βββ ...
```

### Documentado com Swagger 
![Screenshot_1](https://user-images.githubusercontent.com/92350736/196067851-7eb367cc-2a1e-4d1e-b0c2-a521d758ec60.png)

### ExplicaΓ§Γ£o do .ENV
![Screenshot_2](https://user-images.githubusercontent.com/92350736/196009138-fe827df0-56e5-426c-9064-a52cb0953881.png)

### Criando uma transaΓ§Γ£o no tipo: CartΓ£o de CrΓ©dito
![Screenshot_2](https://user-images.githubusercontent.com/92350736/196009571-2fcac14d-fdcf-4fa8-bf03-f108ef30c752.png)

### Criando uma transaΓ§Γ£o no tipo: Boleto
![Screenshot_1](https://user-images.githubusercontent.com/92350736/196009538-fcc72dad-68c9-46aa-baf4-69478e446a69.png)

### Criando uma transaΓ§Γ£o no tipo: PIX
![Screenshot_1](https://user-images.githubusercontent.com/92350736/196009503-b0027009-bed5-4939-b04a-3634338a8c95.png)

### Atualizando status de transaΓ§Γ£o
![Screenshot_2](https://user-images.githubusercontent.com/92350736/196009480-6f6e4669-9040-4346-8461-0a3ab4d5abc4.png)

### Criando carrinho com valor para criar transaΓ§Γ£o
![Screenshot_1](https://user-images.githubusercontent.com/92350736/196009710-6c9a0f68-e1d1-46aa-98e6-7f7616a41c68.png)

### Iniciando o Projeto

- Clone o repositΓ³rio e instale as dependΓͺncias.
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

## 😺 Live chat project API using mongodb, nodejs, prisma, supertest and jest

API Desenvolvida para ser consumida no live-chat-web

## O que foi utilizado no projeto

- [x] Typescript
- [x] Express
- [x] MongoDB
- [x] Mocks
- [x] Supertest
- [x] Jest
- [x] Prisma
- [x] Nodejs

### Regras de negócio

- [x] Create message
- [x] Get message
- [x] Get last message by chat
- [x] Get all messages by chat
- [x] Delete all messages

- [x] Create chat
- [x] Create group chat
- [x] Get all chats by user
- [x] Get chat

- [x] Create user
- [x] Get user

### Endpoints Message

- [x] [POST] "/api/message"
- [x] [GET] "/api/message/chat/:chatId"
- [x] [GET] "/api/message/lastMessage/:chatId"
- [x] [GET] "/api/message/:id"
- [x] [DELETE] "/api/message/all"

### Endpoints Chat:

- [x] [POST] "/api/chat"
- [x] [POST] "/api/chat/group"
- [x] [GET] "/api/chat/user/:userId"
- [x] [GET] "/api/chat/:id"

### Endpoints Use:

- [x] [POST] "/api/user"
- [x] [GET] "/api/user/:id"

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

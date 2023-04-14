<div align="center">

# CRUD de Lista de produtos

</div>
<p>
Esta é uma aplicação web para gerenciamento de uma lista de produtos. 
O usuário pode criar, ler, atualizar e excluir produtos da lista.

O backend foi desenvolvido em Node.js com o framework Express, o frontend foi desenvolvido em React com o framework Next.js e o banco de dados utilizado é o MongoDB.

</p>

<br/>

# 💻 Demonstração

> ### [Para acessar, clique aqui](https://dancing-tulumba-f71659.netlify.app/)

<img src="https://user-images.githubusercontent.com/69015179/231968169-f7bb32d5-ed60-475b-8a66-a66daa86ab36.gif" height="500px"/>

<br/>

# 🔧 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

## Frontend

- [React](https://reactjs.org/)
- [Typescript](https://typescriptlang.org/)
- [Next](https://nextjs.org/)
- [Sass](https://sass-lang.com/)
- [react-hook-form](https://react-hook-form.com/)
- [zod](https://zod.dev/)
- [react-text-mask](https://fkhadra.github.io/react-toastify)
- [date-fns](https://date-fns.org/)
- [react-toastify](https://react-toastify.com/)

<p style="height:1px"></p>

## Backend

- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

<br/>

# 📐 Requisitos

Antes de executar a aplicação, certifique-se de ter instalado as seguintes ferramentas em sua máquina:

- [Node.js](https://nodejs.org/)
- [npm](https://npmjs.org/)

<br/>

# 📥 Instalação

1. Abra o terminal e clone o repositório

```
  git clone https://github.com/aldemylla/Desafio-ServerSoftwares.git
```

2. Entre no diretório criado

```
  cd Desafio-ServerSoftwares
```

3. Instale as dependências do backend:

```
  cd backend
  npm install
```

3. Instale as dependências do frontend:

```
  cd ../frontend
  npm install
```

<br/>

# ⚙️ Configuração

## Frontend

1. Renomeie o arquivo `.env.local.sample` para `.env.local`

2. Edite o arquivo `.env.local` para configurar a URL do servidor backend

<p style="height:1px"></p>

## Backend

1. Renomeie o arquivo `.env.sample` para `.env`

2. Edite o arquivo `.env` para configurar a conexão com o seu banco de dados MongoDB

<br/>

# 🚀 Execução

## Frontend

1. Inicie o servidor frontend dentro da pasta `/frontend`:

```js
  npm run dev
```

Estará disponível no endereço http://localhost:3000.

<br />

## Backend

1. Inicie o servidor backend dentro da pasta `/backend`:

```js
  npm run dev
```

Estará disponível no endereço http://localhost:3333.

<br/>

# 🔍 Funcionalidades

- Listar produtos
- Criar produto
- Editar produto
- Excluir produto

<br/>

# 📈 API

O projeto possui uma API RESTful que pode ser utilizada para acessar as funcionalidades do CRUD. Os dados são enviados e recebidos em formato JSON. A API da aplicação possui as seguintes rotas:

Disponível em: https://desafio-serversoftwares2.onrender.com

<br/>

## `GET /products`

- ### Retorna a lista de todos os produtos cadastrados.

<p style="height:1px"></p>

<div>

### Response Status:

  <p>200 OK</p>
  
</div>

<p style="height:1px"></p>

#### Exemplo de resposta:

```json
[
  {
    "codigo": "001",
    "descricao": "Produto 1",
    "preco": "R9,99",
    "_id": "60930064b96f5a0015e14e53",
    "data_cadastro": "2023-04-13T20:24:42.931Z",
    "__v": 0
  },
  {
    "codigo": "002",
    "descricao": "Produto 2",
    "preco": "R19,99",
    "_id": "60930084b96f5a0015e14e54",
    "data_cadastro": "2023-04-13T20:24:42.931Z",
    "__v": 0
  }
]
```

<br/>

---

<br/>

## `POST /products`

- ### Cria um novo produto.

<p style="height:1px"></p>

### Request Body

<div style="width:max-content">

| Campo     | Tipo   | Descrição            |
| --------- | ------ | -------------------- |
| codigo    | string | Código do produto    |
| descricao | string | Descrição do produto |
| preco     | string | Preço do produto     |

</div>

<p style="height:1px"></p>

#### Exemplo de corpo de requisição:

```json
{
  "codigo": "003",
  "descricao": "Produto 3",
  "preco": "R29,90"
}
```

<p style="height:1px"></p>

<div>

### Response Status:

  <p>200 OK</p>
  
</div>

<p style="height:1px"></p>

#### Exemplo de resposta:

```json
{
  "codigo": "003",
  "descricao": "Produto 3",
  "preco": "R29,90",
  "_id": "60930084b96f5a0015e14e54",
  "data_cadastro": "2023-04-13T20:24:42.931Z",
  "__v": 0
}
```

<br/>

---

<br/>

## `GET /products/:id`

- ### Retorna um produto existente pelo seu ID.

<p style="height:1px"></p>

### Parameters

<div style="width:max-content">

| Nome | Tipo   | Descrição     |
| ---- | ------ | ------------- |
| id   | string | ID do produto |

</div>

<p style="height:1px"></p>

<div>

### Response Status:

  <p>200 OK</p>
  
</div>

<p style="height:1px"></p>

#### Exemplo de resposta:

```json
[
  {
    "codigo": "001",
    "descricao": "Produto 1",
    "preco": "R9,99",
    "_id": "60930064b96f5a0015e14e53",
    "data_cadastro": "2023-04-13T20:24:42.931Z",
    "__v": 0
  }
]
```

<br/>

---

<br/>

## `PUT /products/:id`

- ### Atualiza um produto existente pelo seu ID.

<p style="height:1px"></p>

### Parameters

<div style="width:max-content">

| Nome | Tipo   | Descrição     |
| ---- | ------ | ------------- |
| id   | string | ID do produto |

</div>

<p style="height:1px"></p>

### Request Body

<div style="width:max-content">

| Campo     | Tipo   | Descrição            |
| --------- | ------ | -------------------- |
| codigo    | string | Código do produto    |
| descricao | string | Descrição do produto |
| preco     | string | Preço do produto     |

</div>

#### Exemplo de corpo de requisição:

```json
{
  "codigo": "001",
  "descricao": "Produto 1 atualizado",
  "preco": "R14,99"
}
```

<p style="height:1px"></p>

<div>

### Response Status:

  <p>200 OK</p>

</div>

#### Exemplo de resposta:

```json
{
  "codigo": "001",
  "descricao": "Produto 1 atualizado",
  "preco": "R14,99",
  "_id": "60930064b96f5a0015e14e53",
  "data_cadastro": "2023-04-13T20:24:42.931Z",
  "__v": 0
}
```

<br/>

---

<br/>

## `DELETE /products/:id`

- ### Deleta um produto existente pelo seu ID.

### Parameters

<div style="width:max-content">

| Nome | Tipo   | Descrição     |
| ---- | ------ | ------------- |
| id   | string | ID do produto |

</div>

<p style="height:1px"></p>

<div>

### Response Status:

  <p>204 No Content</p>
  
</div>

<br/>

---

Feito por Aldemylla 👋 [Me encontre no LinkedIn!](https://www.linkedin.com/in/aldemylla/)

## Projeto Gerenciamento de Vendas!

## <h2>👋 Hello, I’m @butzlaff</h2>

## Bem-vindo ao App de Gerenciamento de Vendas!

Este aplicativo, foi desenvolvido usando AdonisJS, para gerencimaneto de vendas.
Foi utilizado o ORM Lucid, juntamente com o banco de dados Mysql.
O aplicativo usa JsonWebToken(JWT) como forma de segurança, garantido que o usuário sem o Token apropriado não consiga acessar rotas que são privadas.

<p>Para inciciar, devemos clonar o repositório em sua máquina, com o comando:

```sh
 git clone git@github.com:butzlaff/adonisjs-bemobile.git
```

Este projeto utiliza docker para facilitar o uso:

> Nota: Você precisá instalar o banco de dados, existe um docker-compose usando Postgres, caso não tenha familiaridade com o Docker, poderá ler sua documentação no site:

> <a href="https://docs.docker.com">Documentação Docker</a>

Ou copiando o link abaixo:

```sh
https://docs.docker.com
```

Caso já tenha instalado em sua máquina poderá inciar pelo comando:

```sh
docker compose up -d
```

> O código será executado automaticamente no docker.
> Porém, como estamos utilizando o ORM Lucid, precisaremos executar as migrations:

```sh
node ace migration:run
```

Feito isso, poderemos então utilizar a aplicação pelo docker:

> Lembrando que o back-end usa a porta 3333 por padrão, lembre-se de deixá-la utilizável

Caso queiram usar a aplicação sem o docker, também é possível, e precisaremos instalar o Nodejs para isso.

> A instalação e documentação do Nodejs pode ser encontrada no site:

```sh
https://nodejs.org/
```

Terminada a instalação vamos verificar se ele funciona corretamente:

No terminal do seu sistema operacional vamos testar:

```sh
node -v
nvm -v
npm -v
```

Caso a instalação esteja correta, deverá aparecer as versões dos seguintes componentes:

```
Node.js: O comando node -v mostrará a versão do Node.js instalada no seu sistema.
NVM (Node Version Manager): O comando nvm -v mostrará a versão do Node Version Manager, que é usado para gerenciar múltiplas versões do Node.js em um mesmo sistema.
NPM (Node Package Manager): O comando npm -v mostrará a versão do Node Package Manager, que é utilizado para instalar e gerenciar pacotes do Node.js.
```

Terminada as verificações vamos instalar as dependências:
Vamos acessar a pasta raiz do projeto e executar o seguinte comando:

> A pasta raiz é onde se encontra o arquivo package.json

```sh
npm install
```

Após isso, precisaremos do Mysql instalado, poderemos encontrar a instalação dele no seguinte site:

```sh
https://www.mysql.com/
```

ou podemos utilizar o docker para isso, como já mensionado anteriormente.

Será necessário também criar um arquivo chamado ".env" na raiz do projeto, e preencher as informações com o bando de dados:

```sh
TZ=UTC
PORT=3333
HOST=localhost
LOG_LEVEL=info
APP_KEY=0zKosWx4BpRIS7-HTin9p2phLNgpuNgV
NODE_ENV=development

# Altere as informações abaixo com os dados da sua conexão do Mysql.
DB_HOST= # IP DO HOST DO MYSQL
DB_PORT=3306 # (A porta 3306 é a porta padrão)
DB_USER= #Usuário (Geralmente root)
DB_PASSWORD= #PASSWORD DO USUÁRIO
DB_DATABASE= #NOME DA DATABASE
```

### OBSERVAÇÕES IMPORTANTES

> Nas rotas GET E DELETE não é necessário o envio de dados no BODY!!!

### ROTAS DAS APLICAÇÃO

<h5>Vericação se a API está operacional</h5>

> GET http://localhost:3333

A resposta da api, se tudo estiver funcionando corretamente:

```json
{
  "status": "The api are running"
}
```

<hr />

<h2>Rotas /users</h2>

<h5>Criação de usuário: </h5>

> POST http://localhost:3333/users

A rota espera que no body tenha as seguintes propriedades:

<p>Exemplo:</p>

```
http://localhost:3333/users
```

```json
{
  "email": "seuemail@seuprovedor.com",
  "password": "seupassword"
}
```

Caso os dados estejam corretos, o retorno da api será:

Resposta: status 201

```json
{
  "email": "seuemail@gmail.com",
  "id": 1
}
```

O retorno será sem a senha, por motivos de segurança.

<hr />

<h2>Rotas /login</h2>

<h5>Login:</h5>

> POST http://localhost:3333/login

A rota espera que no body tenha as seguintes propriedades:

<p>Exemplo:</p>

```
http://localhost:3333/login
```

```json
{
  "email": "seuemail@seuprovedor.com", // email válido
  "password": "seupassword"
}
```

Caso os dados estejam corretos, o retorno da api será:

Resposta: status: 200

```json
{
  "type": "bearer",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMzA2MDczN30.hUFKE8Y1eKlGWRMsQjUNvhFg_Wy1gpgm3upERuwjhxk"
}
```

Caso seus dados estejam incorretos:

```json
{
  "errors": [
    {
      "message": "Invalid user credentials"
    }
  ]
}
```

<hr />

> Todas as futuras rotas irão usar o token da resposta do login para autenticação

```ts
{
    headers: {
      Authorization: `Bearer ${token}`,
    },
}
```

<hr />

<h2>Rotas /clients</h2>

<h5>Cadastro de Cliente:</h5>

> POST http://localhost:3333/clients

<p>Exemplo:</p>

```
http://localhost:3333/clients
```

```json
{
  "name": "Cliente Teste",
  "cpf": "12345678900",
  "address": {
    "street": "Rua do Cliente",
    "district": "Bairro do Cliente",
    "addressNumber": 1
  },
  "telephone": {
    "number": "01-12345-1234"
  }
}
```

Resposta: status: 201

```json
{
  "name": "Cliente Teste",
  "cpf": "12345678900",
  "id": 1
}
```

<hr />

<h5>Busca de clientes:</h5>

> GET http://localhost:3333/clients

Resposta: status: 200

<p>Exemplo:</p>

```
http://localhost:3333/clients
```

```json


[
  {
    "id": 1,
    "name": "Cliente Teste",
    "cpf": "12345678900",
    "address": {
      "id": 1,
      "street": "Rua do Cliente",
      "district": "Bairro do Cliente",
      "addressNumber": 1
    },
    "telephone": {
      "id": 1,
      "number": "XX-XXXXX-XXXX"
    }
  }
  ...
]
```

<h5>Busca de clientes por um ID:</h5>

> GET http://localhost:3333/clients/:id

<p>Exemplo:</p>

```
http://localhost:3333/clients/1
```

Resposta: status: 200

```json
{
  "id": 1,
  "name": "Cliente Teste",
  "cpf": "12345678900",
  "address": {
    "street": "Rua do Cliente",
    "district": "Bairro do Cliente",
    "addressNumber": 1
  },
  "telephone": {
    "number": "XX-XXXXX-XXXX"
  },
  "sale": [
    // Vendas para o cliente
    {
      "id": 1,
      "totalPrice": "100.00",
      "clientId": 1,
      "products": [
        {
          "id": 1,
          "name": "Nome do Produto",
          "price": "100.00", // preço do produto
          "description": "Descricao do Produto",
          "image": "https://image-do-produto"
        }
      ]
    }
  ]
}
```

> A rota Get clients/:id, também aceita Query Parameters

<p>Exemplo:</p>

```
http://localhost:3333/clients/1?year=2024&mouth=04
```

> Estes paramêtros filtram o campo "sale' da busca do cliente, retornando somente as vendas por mês e ano que específicos, trazendo as vendas mais recentes para mais antigas.

<hr />

<h5>Exclusão de um Cliente:</h5>

> DELETE http://localhost:3333/clients/:id

<p>Exemplo:</p>

```
http://localhost:3333/clients/1
```

Resposta: status: 204

> A resposta 204 retorna um "no content", ou seja,

> Este operação excluirá um cliente, e todas as suas vendas, endereço e telefone, ou seja, utiliza o métode de exclusão em cascada.

<hr />

<h5>Atualização de um Cliente:</h5>

> PUT (UPDATE) http://localhost:3333/clients/:id

<p>Exemplo:</p>

```
http://localhost:3333/clients/1
```

> OBS: Não é necessário o envio de todos os campos, ao pelo um dos campos deverá ser enviado na requisição pelo BODY.

```json
{
  "name": "Nome do Cliente",
  "cpf": "11111111112" // cpf do cliente, 11 digitos
}
```

> Este operação atualiza os dados principais do cliente(Cpf ou email).

<hr />

<h5>Atualização do endereço de um cliente:</h5>

> PUT http://localhost:3333/clients/:id/addresses

<p>Exemplo:</p>

```
http://localhost:3333/clients/1/addresses
```

> OBS: Não é necessário o envio de todos os campos, ao pelo um dos campos deverá ser enviado na requisição pelo BODY.

```json
{
  "street": "Rua Nova do Cliente 1",
  "district": "Bairro Novo do Cliente 1",
  "addressNumber": 200
}
```

Resposta: status: 200

```json
{
  "id": 1,
  "street": "Rua Nova do Cliente 1",
  "district": "Bairro Novo do Cliente 1",
  "addressNumber": 200
}
```

<hr />

<h5>Atualização do telefone de um cliente:</h5>

> PUT http://localhost:3333/clients/:id/telephone

<p>Exemplo:</p>

```
http://localhost:3333/clients/1/telephone
```

> OBS: Não é necessário o envio de todos os campos, ao pelo um dos campos deverá ser enviado na requisição pelo BODY.

```json
{
  "number": "99-99999-9999"
}
```

Resposta: status: 200

```json
{
  "id": 1,
  "number": "99-99999-9999"
}
```

<hr />>

<h2>Rotas /products</h2>

<h5>Busca de todos produtos:</h5>

> GET http://localhost:3333/products/

<p>Exemplo:</p>

```
http://localhost:3333/products/
```

Resposta: status: 200

```json
[
	{
		"id": 1,
		"name": "Produto 1",
		"price": "100.00",
		"description": "Descrição do Produto 1",
		"image": "http://link_da_imagem"
	},
	{
		"id": 2,
		"name": "Produto 2",
		"price": "100.00",
		"description": "Descrição do Produto 2",
		"image": "http://link_da_imagem"
	},
	{
		"id": 3,
		"name": "Produto 1",
		"price": "100.00",
		"description": "Descrição do Produto 3",
		"image": "http://link_da_imagem"
	},
	{
		"id": 4,
		"name": "Produto 1",
		"price": "100.00",
		"description": "Descrição do Produto 4",
		"image": "http://link_da_imagem"
	},
  ...
]
```

<hr />

<h5>Busca de um produto por ID:</h5>

> GET http://localhost:3333/products/:id

<p>Exemplo:</p>

```
http://localhost:3333/products/1
```

Resposta: status: 200

```json
{
  "id": 1,
  "name": "Produto 1",
  "price": "100.00",
  "description": "Descrição do Produto 1",
  "image": "http://link_da_imagem"
}
```

<hr />

<h5>Cadastrar um produto:</h5>

> POST http://localhost:3333/products

<p>Exemplo:</p>

```
http://localhost:3333/products
```

```json
{
  "name": "Lorem ipsum",
  "image": "https://link_da_imagem",
  "price": 100,
  "description": "lorem ipsum"
}
```

Reposta: status: 201

```json
{
  "id": 1,
  "name": "Lorem ipsum",
  "image": "https://link_da_imagem",
  "price": 100,
  "description": "lorem ipsum"
}
```

<hr />

<h5>Atualizar um produto:</h5>

> PUT http://localhost:3333/products/:id

<p>Exemplo:</p>

```
http://localhost:3333/products/1
```

> OBS: Não é necessário o envio de todos os campos, ao pelo um dos campos deverá ser enviado na requisição pelo BODY.

```json
{
  "name": "Lorem ipsum atualizado",
  "image": "https://link_da_imagem_atualizada",
  "price": 100,
  "description": "lorem ipsum atualizada"
}
```

Resposta: status: 200

```json
{
  "id": 1,
  "name": "Lorem ipsum atualizado",
  "image": "https://link_da_imagem_atualizada",
  "price": 100,
  "description": "lorem ipsum atualizada"
}
```

<hr />

<h5>Deleção de um produto:</h5>

> DELETE http://localhost:3333/products/:id

<p>Exemplo:</p>

```
http://localhost:3333/products/1
```

> A deleção de um produto, diferente da deleção de um cliente, não ocorre via cascade, foi adotado o método conhecido como "Soft delete", que é um método do que permite a exclusão lógica de registros. Em vez de remover o registro fisicamente do banco de dados, adicionamos uma coluna chamada "deleted_at" à tabela, definindo o valor dessa coluna com a data e hora da exclusão. Se o registro não foi deletado, essa coluna contém um valor de null.

Resposta: status: 204

> O status 204 não retorna uma mensagem no body! Se utilizarmos aplicativos como Insomnia ou Postman, iremos receber: "No body returned for response"

<hr />

<h2>Rotas /sales</h2>

<h5>Cadastro de vendas a um cliente:</h5>

> POST http://localhost:3333/sales

<p>Exemplo:</p>

```
http://localhost:3333/sales
```

```json
{
  "clientId": 1,
  "products": [
    {
      "productId": 1,
      "quantity": 1,
      "price": 100
    },
    {
      "productId": 2,
      "quantity": 2,
      "price": 100
    }
  ]
}
```

Resposta: status: 201

```json
{
  "id": 1,
  "totalPrice": "300.00",
  "clientId": 1,
  "createdAt": "2024-04-15T18:32:12.000+00:00",
  "products": [
    {
      "id": 1,
      "name": "Produto 1",
      "price": "100.00",
      "description": "Descriçã do Produto 1",
      "image": "https://link_da_imagem"
    },
    {
      "id": 2,
      "name": "Produto 2",
      "price": "100.00",
      "description": "Descriçã do Produto 2",
      "image": "https://link_da_imagem"
    }
  ]
}
```

<hr />

<h5>Busca de todas vendas:</h5>

> GET http://localhost:3333/products/

<p>Exemplo:</p>

```
http://localhost:3333/products/
```

Resposta: status: 200

```json
[
  {
    "id": 1,
    "totalPrice": "300.00",
    "clientId": 1,
    "createdAt": "2024-04-15T18:32:12.000+00:00",
    "products": [
      {
        "id": 1,
        "name": "Produto 1",
        "price": "100.00",
        "description": "Descriçã do Produto 1",
        "image": "https://link_da_imagem"
      },
      {
        "id": 2,
        "name": "Produto 2",
        "price": "100.00",
        "description": "Descriçã do Produto 2",
        "image": "https://link_da_imagem"
      }
    ]
  },
  {
    "id": 2,
    "totalPrice": "100.00",
    "clientId": 2,
    "createdAt": "2024-04-15T17:55:58.000+00:00",
    "products": [
      {
        "id": 2,
        "name": "Produto 2",
        "price": "100.00",
        "description": "Descriçã do Produto 2",
        "image": "https://link_da_imagem"
      }
    ]
  }
]
```

<hr />

<h5>Busca de um venda por ID:</h5>

> GET http://localhost:3333/sales/:id

<p>Exemplo:</p>

```
http://localhost:3333/sales/1
```

Resposta: status: 200

```json
{
  "id": 1,
  "totalPrice": "300.00",
  "clientId": 1,
  "createdAt": "2024-04-15T18:32:12.000+00:00",
  "products": [
    {
      "id": 1,
      "name": "Produto 1",
      "price": "100.00",
      "description": "Descriçã do Produto 1",
      "image": "https://link_da_imagem"
    },
    {
      "id": 2,
      "name": "Produto 2",
      "price": "100.00",
      "description": "Descriçã do Produto 2",
      "image": "https://link_da_imagem"
    }
  ]
}
```

<hr />

## Contributors

- [butzlaff](https://github.com/butzlaff) - creator and maintainer

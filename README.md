## Projeto Gerenciamento de Vendas!
## <h2>👋 Hello, I’m @butzlaff</h2>

## Bem-vindo ao App de Gerenciamento de Vendas!

Este aplicativo, foi desenvolvido usando AdonisJS, para gerencimaneto de vendas.
Foi utilizado o ORM Lucid, juntamente com o banco de dados Mysql.
O aplicativo usa JsonWebToken(JWT) como forma de segurança, garantido que o usuário sem o Token apropriado não consiga acessar rotas que privadas.


<p>Para inciciar, devemos clonar o repositório em sua máquina, com o comando:

```sh
 git clone git@github.com:butzlaff/adonisjs-bemobile.git
```

Este projeto utiliza docker para facilitar o uso:

> Nota: Você precisá instalar o banco de dados, existe um docker-compose usando Postgres, caso não tenha familiaridade com o Docker, poderá ler sua documentação no site: 

><a href="https://docs.docker.com">Documentação Docker</a>

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


## Contributors

- [butzlaff](https://github.com/butzlaff) - creator and maintainer
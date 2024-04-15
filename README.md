## Projeto Gerenciador de produtos
## <h2>👋 Hello, I’m @butzlaff</h2>

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
> Caso queira rodar localmente talves seja necessário mudar algumas configurações, e como estamos utilizando Lucid como ORM, precisaremos inicar as configurações do Sequelize, o comando para rodar localmente é:

```sh
npm run prestart ou npm run db:reset
```
Feito isso, poderemos então inicar a aplicação:
> Lembrando que o back-end usa a porta 3001 por padrão, lembre-se de deixá-la utilizável

Então podemos entrar nas pastas: backend & frontend e utilizar o comando:
```sh
npm run dev
```

## Contributors

- [butzlaff](https://github.com/butzlaff) - creator and maintainer
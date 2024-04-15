# Usar a imagem node:21.11.1 como base
FROM node:20.11.1

# Mudar para o diretório de trabalho /backend
WORKDIR /backend

# Copiar os package.json, package-lock.json e packages.npm para o container
COPY package*.json ./

# Instalar as dependências Node
RUN npm install

# Copiar o restante dos arquivos da aplicação para o container
COPY . .

# Sinalize que aplicação expõe a porta 3333
EXPOSE 3333

# Configura os comandos para iniciar a aplicação
ENTRYPOINT ["npm", "run"]
CMD [ "dev" ]
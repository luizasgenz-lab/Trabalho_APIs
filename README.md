# Trabalhos de Desenvolvimento de Serviços e APIs

## 1. API Rest - Trabalho 1
Projeto de uma API RESTful desenvolvida em Node.js. Toda a implementação das rotas (CRUD) e conexão com o banco foi centralizada no arquivo `index.js`.

**Tecnologias Utilizadas:** Node.js (Express), Knex.js (Query Builder) e MySQL (XAMPP).

**Como rodar o projeto:**
1. Abra o painel do XAMPP e dê Start nos módulos **Apache** e **MySQL**.
2. Acesse o phpMyAdmin no navegador (`http://localhost/phpmyadmin`) e importe o script `bd_dsapi.sql` que está na pasta `API Rest`. Ele já tem os comandos para criar o banco de dados e as tabelas com os relacionamentos.
3. Abra o terminal do VS Code, entre na pasta da API e instale as dependências: `npm install`
4. Inicie o servidor: `node index.js`

--> A API fica escutando na porta 8001 (`http://localhost:8001`).

**Testes da API:**
As rotas da API foram testadas utilizando o Thunder Client.

--> **Importante sobre a tabela de Clientes:** A tabela clientes possui uma chave estrangeira amarrada à tabela cidades. Para testar a rota de criação de clientes (POST), é necessário ir no phpMyAdmin antes e inserir manualmente pelo menos uma cidade no banco. Caso contrário, o banco vai bloquear a inserção apontando erro de *foreign key constraint*.

---

## 2. Desafio oAuth (Aula 14)
Implementação do desafio de Segurança e Autenticação utilizando o protocolo OAuth2.

**O que faz:** Uma aplicação web que permite ao usuário fazer login utilizando a sua conta do GitHub. Após a autorização, a aplicação consome a API do GitHub e retorna o nome do usuário logado na tela de sucesso.

**Tecnologias Utilizadas:** Node.js, Express, Fetch API, HTML e CSS.

**Como rodar o projeto:**
1. Abra o terminal do VS Code e entre na pasta do desafio: `cd "Desafio oAuth"`
2. Inicie o servidor com o comando: `node script.js`
3. Acesse `http://localhost:3000` no seu navegador e clique no botão de login.
# Trabalho de API REST

Projeto de uma API RESTful desenvolvida em Node.js. Toda a implementação das rotas (CRUD) e conexão com o banco foi centralizada no arquivo `index.js`.

## Tecnologias Utilizadas
- Node.js (Express)
- Knex.js (Query Builder)
- MySQL (via XAMPP)

## Como rodar o projeto

1. Abra o painel do XAMPP e dê Start nos módulos **Apache** e **MySQL**.
2. Acesse o phpMyAdmin no navegador (`http://localhost/phpmyadmin`) e importe o script `bd_dsapi.sql` que está na pasta do projeto. Ele já tem os comandos para criar o banco de dados e as tabelas com os relacionamentos.
3. Abra o terminal do VS Code na pasta do projeto e instale as dependências: npm install
4. Inicie o servidor: node index.js

--> A API fica escutando na porta 8001 (http://localhost:8001).

# Testes da API

As rotas da API foram testadas utilizando a ferramenta Thunder Client.

--> Importante sobre a tabela de Clientes:
A tabela clientes possui uma chave estrangeira amarrada à tabela cidades. Para testar a rota de criação de clientes (POST), é necessário ir no phpMyAdmin antes e inserir manualmente pelo menos uma cidade no banco. Caso contrário, o banco vai bloquear a inserção apontando erro de foreign key constraint.

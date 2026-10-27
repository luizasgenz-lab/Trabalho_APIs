const express = require('express')
const knex = require('knex')
const http_errors = require('http-errors')

const PORT = 8001
const HOSTNAME = "localhost"

const api = express()
api.use( express.json() )
api.use( express.urlencoded( { extended : true } ) )

// Conexão com o banco
const conecta = knex( {
    client : "mysql2" ,
    connection : {
        host : HOSTNAME ,
        user : "root" ,
        password : "" ,
        database : "bd_dsapi"
    }
} )


// CLIENTES
// 1. Buscar clientes (GET)
api.get('/clientes', (req, res, next) => {
    conecta('clientes')
        .select('*')
        .then((dados) => {
            res.status(200).json(dados)
        })
        .catch(next)
})

// 2. Cadastrar novo cliente (POST)
api.post('/clientes', (req, res, next) => {
    conecta('clientes')
        .insert(req.body)
        .then((dados) => {
            res.status(201).json({ resposta: "Cliente cadastrado com sucesso!", id: dados[0] })
        })
        .catch(next)
})


// PRODUTOS
// 3. Buscar produtos (GET)
api.get('/produtos', (req, res, next) => {
    conecta('produtos')
        .select('*')
        .then((dados) => {
            res.status(200).json(dados)
        })
        .catch(next)
})

// 4. Cadastrar novo produto (POST)
api.post('/produtos', (req, res, next) => {
    conecta('produtos')
        .insert(req.body)
        .then((dados) => {
            res.status(201).json({ resposta: "Produto cadastrado com sucesso!", id: dados[0] })
        })
        .catch(next)
})

// Servidor
api.listen( PORT , ()=>{
    console.log( `API rodando em http://${HOSTNAME}:${PORT}` )
} )
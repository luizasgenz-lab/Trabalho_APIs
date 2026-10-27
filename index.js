const express = require('express')
const knex = require('knex')
const http_errors = require('http-errors')

const PORT = 8001
const HOSTNAME = "localhost"

const api = express()

// pra api entender json no body da requisição
api.use( express.json() )
api.use( express.urlencoded( { extended : true } ) )

// config de conexão com o banco local
const conecta = knex( {
    client : "mysql2" ,
    connection : {
        host : HOSTNAME ,
        user : "root" ,
        password : "" ,
        database : "bd_dsapi"
    }
} )

// --- CLIENTES ---

// lista todos os clientes
api.get('/clientes', (req, res, next) => {
    conecta('clientes')
        .select('*')
        .then((dados) => {
            res.status(200).json(dados) // 200 = ok
        })
        .catch(next)
})

// cadastra um cliente novo
api.post('/clientes', (req, res, next) => {
    conecta('clientes')
        .insert(req.body)
        .then((dados) => {
            // dados[0] pega o id que acabou de ser gerado
            res.status(201).json({ resposta: "Cliente cadastrado com sucesso!", id: dados[0] })
        })
        .catch(next)
})

// --- PRODUTOS ---

// lista os produtos
api.get('/produtos', (req, res, next) => {
    conecta('produtos')
        .select('*')
        .then((dados) => {
            res.status(200).json(dados)
        })
        .catch(next)
})

// cadastra produto
api.post('/produtos', (req, res, next) => {
    conecta('produtos')
        .insert(req.body)
        .then((dados) => {
            res.status(201).json({ resposta: "Produto cadastrado com sucesso!", id: dados[0] })
        })
        .catch(next)
})

// edita produto buscando pelo id na url
api.put('/produtos/:id', (req, res, next) => {
    const idProduto = req.params.id; 
    
    conecta('produtos')
        .where('id', idProduto)
        .update(req.body)
        .then((dados) => {
            if (!dados) { 
                return next(http_errors(404, "Produto não encontrado para edição")); 
            }
            res.status(200).json({ resposta: "Produto atualizado com sucesso!" });
        })
        .catch(next);
});

// apaga produto
api.delete('/produtos/:id', (req, res, next) => {
    const idProduto = req.params.id; 
    
    conecta('produtos')
        .where('id', idProduto)
        .delete()
        .then((dados) => {
            if (!dados) {
                return next(http_errors(404, "Produto não encontrado para exclusão"));
            }
            res.status(200).json({ resposta: "Produto excluído com sucesso!" });
        })
        .catch(next);
});

// --- PEDIDOS ---

// lista os pedidos
api.get('/pedidos', (req, res, next) => {
    conecta('pedidos')
        .select('*')
        .then((dados) => {
            res.status(200).json(dados)
        })
        .catch(next)
})

// faz um pedido (precisa inserir em duas tabelas)
api.post('/pedidos', (req, res, next) => {
    
    // 1: salva na tabela principal pra gerar o id do pedido
    conecta('pedidos')
        .insert({
            cliente_id: req.body.cliente_id,
            endereco: req.body.endereco,
            horario: req.body.horario
        })
        .then((dados) => {
            const id_pedido_gerado = dados[0]; 
                        
            // 2: usa o id gerado pra vincular os itens do pedido na outra tabela
            return conecta('pedidos_produtos').insert({
                pedido_id: id_pedido_gerado,
                produto_id: req.body.produto_id,
                preco: req.body.preco,
                quantidade: req.body.quantidade
            });
        })
        .then(() => {
            res.status(201).json({ resposta: "Pedido realizado com sucesso!" })
        })
        .catch(next)
})

// subindo o servidor
api.listen( PORT , ()=>{
    console.log( `API rodando em http://${HOSTNAME}:${PORT}` )
} )
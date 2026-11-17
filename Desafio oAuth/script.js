const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const CLIENT_ID = 'Ov23li0g9NuajH1xDDcx';
const CLIENT_SECRET = 'd5bf04d5778bb19c83710703fc3131bf1ad24e76';

// rota principal puxa o arquivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// rota de callback autoriza e puxa o sucesso.html
app.get('/callback', async (req, res) => {
    const code = req.query.code;

    try {
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                code: code
            })
        });
        
        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        // usa o Token de Acesso para buscar o nome do usuário
        const userResponse = await fetch('https://api.github.com/user', {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        
        const userData = await userResponse.json();
        const nomeUsuario = userData.name || userData.login;

        // le o arquivo de sucesso e troca a palavra {{NOME}} pelo nome do usuario
        let htmlSucesso = fs.readFileSync(path.join(__dirname, 'sucesso.html'), 'utf-8');
        htmlSucesso = htmlSucesso.replace('{{NOME}}', nomeUsuario);

        res.send(htmlSucesso);

    } catch (error) {
        res.send("Erro durante a autenticação com oAuth.");
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
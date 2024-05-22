const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();

// Servir arquivos estáticos do diretório 'uploads'
app.use('/files', express.static(path.join(__dirname, 'uploads')));

// Usar as rotas definidas no arquivo de rotas
routes(app);

app.listen(3000, () => {
    console.log('Servidor no ar na porta 3000');
});

module.exports = app;


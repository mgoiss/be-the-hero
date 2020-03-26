//Importando o modulo express para a variável express
const express = require('express');

//Importando o modulo Cors, para definir quem poderá acessar a aplicação
const cors = require('cors');

//Importanto a variavel routes do arquivo routes.js
const routes = require('./routes');

//Variável para armazenar a aplicação
const app = express();

app.use(cors()); //Utilizando o cors
app.use(express.json());
app.use(routes);



//criando a rota 3333
app.listen(3333);
//Importanto modulos
const express = require('express');

//Importanto o controle de rota da ong
const OngController = require('./controllers/OngController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


//Importanto o controle de rota dos casos
const IncidentController = require('./controllers/IncidentController');

//Passando apenas o modulo de rotas 
const routes = express.Router();

//Rota para iniciar uma Sessão
routes.post('/sessions', SessionController.create);

//Rota de Listagem e inserção da ONG
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);
//Listagem Filtrada
routes.get('/profile', ProfileController.index);

//Rota de Listagem e inserção do Caso
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;

/**
 * Rota / Recurso
 */

/**
 * Request: Responsavel por guardar tudo que vem por meio da requisição
 * Response: É responsável por retornar algo para o usuário a partir daquela requisição
 */

/**
 * Métodos HTTP:
 * 
 * GET: Busccar uma informação do Back-end
 * POST: Criar uma informação no Back-end
 * PUT: Alterar uma informação no Back-end
 * DELETE: Deletar uma informação no Back-end
 */

/**
 * Tipos de Parâmetros:
 * 
 * Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros, Paginação)
 * Route Params: Parâmetros utilizados para idntificar recursos
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
 */

 /**
  * SQL: MySQL, SQLite, PostgreSQL, Oracel, Microsoft SQL Serve
  * NoSQL: MongoDB, CouchDB, etc
  */

/**
 * Driver: SELECT * FROM users
 * Query Builder: table('users').select('*').where()
 */
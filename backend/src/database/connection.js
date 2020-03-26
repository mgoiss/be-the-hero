//Importanto os modulos
const knex = require('knex');
const configuration = require('../../knexfile');

//conexão de desenvolvimento
const connection = knex(configuration.development);

//exportando a varriável connection
module.exports = connection;
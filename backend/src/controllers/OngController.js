//Importanto modulos
const crypto = require('crypto');

//Importando a conexão
const connection = require('../database/connection');

module.exports = {
    //Listagem de todas as ongs
    async index(request, response) {
        const ongs = await connection('ongs').select('*'); //Pegando as ong no BD
    
        return response.json(ongs);
    },

    //Criando
    async create(request, response) {
        //pegando os dados passados pelos usuários e dividindo
        const { name, email, whatsapp, city, uf} = request.body;

        //gerando o id aleátoriamente
        const id = crypto.randomBytes(4).toString('HEX');
        
        //Inserindo os dados no BD
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
        
        return response.json({ id })
    }
};
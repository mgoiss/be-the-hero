//Importando a conexão
const connection = require('../database/connection');

module.exports = {
    //Listagem do caso da ong/
    async index(request, response) {
        const ong_id = request.headers.authorization; //Pegando o id da ong

        //filtrando os caso da ong informada
        const incedents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*')

            return response.json(incedents);
    }
}
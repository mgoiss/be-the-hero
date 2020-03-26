//Importando a conexão
const connection = require('../database/connection');

module.exports = {
    
    //Criando sessão
    async create(request, response) {
        const { id } = request.body; //Pegando o id da ong
        
        //Pegando os dados da ong (NOME)
        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();
        
        if (!ong)
        {
            return response.status(400).json({ erro: "Não existe nenhuma ONG com esse ID"});
        }

        return response.json(ong);
    }

}
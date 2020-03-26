//Importando a conexão
const connection = require('../database/connection');

module.exports = {
    //Listar
    async index(request, response) {
        //pegando o dado que represento a pagina, caso não exista será definido com 1
        const { page = 1} = request.query;
        
        //Contando a quantidade de casos cadastrados
        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5) //Limitando a quantiidade de dado exibido
            .offset((page - 1) * 5)
            .select([
                'incidents.*', 
                'ongs.name', 
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]); //Selecionando todos casos
        
        //Mostrando no cabeçalho da consulta a quantidade
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },
    
    //Criando caso
    async create(request, response) {
        const { title, description, value } = request.body; //Pegando os dados informados
        const ong_id = request.headers.authorization; //Pegando dados da ong por meio do cabeçalho

        //Inserindo os dado do BD
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id })
    },

    //Deletando o caso
    async delete(request, response) {
        const {id} = request.params; //Pegando o id do caso por meio de parâmetro
        const ong_id = request.headers.authorization; //Pegando dados da ong por meio do cabeçalho

        //Pegando o id da ong que criou o caso
        const incidents = connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
        
        //Analisando se a ong criou aquele caso
        if (incidents,ong_id != ong_id)
        {
            return response.status(401).json({ error: "Operação Não Permitida"});
        }

        //Deletando o caso
        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
}
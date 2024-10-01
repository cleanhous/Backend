const db = require('../db/dbConnection');
const uuid = require('uuid')


class ServicoService{
    async buscaTodosServicos(){
        const [rows] = await db.query(
            "SELECT * FROM servicos"
        )
        return rows
    }

    async criaServico(dto){
        const [rows] = await db.query(
            "SELECT titulo FROM servicos WHERE titulo = ?",[dto.titulo]
        )

        const servico = rows[0]

        if(servico){
            throw new Error("Serviço já cadastrado")
        }

      try{
        const [result] = await db.query(
            `INSERT INTO servicos (id,titulo,descricao) VALUES (?,?,?)`,
            [
                uuid.v4(),
                dto.titulo,
                dto.descricao
            ]
        )
        return result
      }catch(error){
        console.error('Erro ao cadastrar cliente:', error);
        throw new Error('Erro ao cadastrar serviço');
      }
    }
}

module.exports = ServicoService

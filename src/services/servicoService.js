const db = require('../db/dbConnection')
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

        const [result] = await db.query(
            `INSERT INTO servicos (id,titulo) VALUES (?,?)`,
            [
                uuid.v4(),
                dto.titulo,
            ]
        )
        return result
    }

    async buscaServicoPorId(id){
        const [rows] = await db.query(
            "SELECT * FROM servicos WHERE id = ?",[id]
        )

        const servico = rows[0]

        if(!servico){
            throw new Error("Serviço não cadastrado")
        }

        return servico
    }

    
    async excluiServico(id){
        const [rows] = await db.query(
            "SELECT * FROM servicos WHERE id = ?",[id]
        )

        const servico = rows[0]

        if(!servico){
            throw new Error("Serviço não cadastrado")
        }

        await db.query(
            "DELETE FROM servicos WHERE id = ?", [id]
        )
    }

}

module.exports = ServicoService

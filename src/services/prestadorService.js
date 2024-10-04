const db = require("../db/dbConnection")

class PrestadorService{
    async buscaPrestadoresEletricistas(){
        
        const [rows] = await db.query(
            `select p.nome, s.titulo from prestadores p
            inner join servicos s on s.id = p.id_servico
            where s.titulo = "eletricista"`
        )

        return rows
    }
}

module.exports = PrestadorService


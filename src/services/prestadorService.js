const db = require("../db/dbConnection")

class PrestadorService{
    async buscaPrestadoresEletricistas(){
        
        const [rows] = await db.query(
            `select p.nome,p.nota, e.titulo, e.descricao, e.preco from prestadores p
            inner join especialidades e on e.id = p.id_especialidade
            inner join servicos s on s.id = e.id_servico where s.titulo = "eletricista"`
        )

        return rows
    }
}

module.exports = PrestadorService

const db = require('../db/dbConnection')

class BuscaContratosService{
    async buscaTodosContratos(){
        try{
            const [rows] = await db.query(`
                SELECT 
                    contratos.id AS contrato_id,
                    contratos.data_inicio,
                    contratos.data_fim,
                    prestadores.nome AS prestador_nome,
                    clientes.nome AS cliente_nome
                FROM 
                    contratos
                INNER JOIN 
                    prestadores ON contratos.prestador_id = prestadores.id
                INNER JOIN 
                    clientes ON contratos.cliente_id = clientes.id;
            `)
            return rows
        }catch(error){
            throw new Error(error.message)
        }
    }
}

module.exports = BuscaContratosService
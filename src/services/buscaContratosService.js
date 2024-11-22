const db = require('../db/dbConnection')

class BuscaContratosService{
    async buscaTodosContratos(){
        try{
            const [rows] = await db.query(`
                SELECT * FROM contratos
            `)
            return rows
        }catch(error){
            throw new Error(error.message)
        }
    }
}

module.exports = BuscaContratosService
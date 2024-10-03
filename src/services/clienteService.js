const db = require('../db/dbConnection');

class ClienteService{
    async buscaClientePorId(id){
        const [rows] = await db.query(
            "SELECT * FROM clientes WHERE id = ?",[id]
        )

        const cliente = rows[0]

        if(!cliente){
            throw new Error("Cliente não cadastrado")
        }
        return cliente
    }
}

module.exports = ClienteService
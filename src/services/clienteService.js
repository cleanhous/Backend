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

    async atualizaCliente(id, dadosAtualizados){
        const [rows] = await db.query(
            "SELECT * FROM clientes WHERE id = ?",[id]
        )

        const cliente = rows[0]

        if(!cliente){
            throw new Error("Cliente não cadastrado")
        }

        const {email,senha, telefone, cep, uf, cidade, logradouro,numero, complemento} = dadosAtualizados

        const clienteAtualizado = await db.query(
            `UPDATE clientes SET email = ?, senha =?, telefone=?, cep=?, uf=?, cidade=?, logradouro=?, numero=?,complemento=?, updatedAt = NOW() WHERE id = ?`,
            [email || cliente.email,senha||cliente.senha, telefone || cliente.telefone, cep||cliente.cep, uf||cliente.uf, cidade||cliente.cidade, logradouro||cliente.logradouro,numero|| cliente.numero,complemento||cliente.complemento, id]
        )
        return clienteAtualizado
    }
}

module.exports = ClienteService
const db = require('../db/dbConnection')

class EnderecoService{
    async buscaEnderecoCliente(idCliente) {
        try {
            const [rows] = await db.query(
                `SELECT * FROM enderecos_cliente ec
                 INNER JOIN clientes c on c.id = ec.cliente_id
                 WHERE c.id = ?`,
                [idCliente]
            );
            return rows;
        } catch (error) {
            console.log("Erro ao buscar os endereços", error);
            throw new Error("Erro ao buscar os endereços");
        }
    }
}

module.exports = EnderecoService

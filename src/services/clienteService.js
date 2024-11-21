const { hash } = require('bcryptjs');
const db = require('../db/dbConnection');

class ClienteService{
    async buscaClientePorId(id){
        const [rows] = await db.query(
            `SELECT * FROM clientes c
            inner join enderecos_cliente ec
            on ec.cliente_id = c.id 
            inner join telefones_cliente tc
            on tc.cliente_id = c.id
            WHERE c.id = ?
            `,[id]
        )

        const cliente = rows[0]

        if(!cliente){
            throw new Error("Cliente não cadastrado")
        }
        return cliente
    }

    async atualizaCliente(id, dadosAtualizados) {
        const [rows] = await db.query(
            "SELECT * FROM clientes WHERE id = ?", [id]
        );
    
        const cliente = rows[0];
    
        if (!cliente) {
            throw new Error("Cliente não cadastrado");
        }
    
        const {
            email,
            senha,
            telefone,
            cep,
            uf,
            cidade,
            logradouro,
            numero,
            complemento
        } = dadosAtualizados;
    
        
        const senhaHash = senha ? await hash(senha, 8) : cliente.senha;
    
        
        await db.query(
            `UPDATE enderecos_cliente 
            SET cep = ?, uf = ?, cidade = ?, logradouro = ?, numero = ?, complemento = ? 
            WHERE cliente_id = ?`,
            [
                cep || cliente.cep,
                uf || cliente.uf,
                cidade || cliente.cidade,
                logradouro || cliente.logradouro,
                numero || cliente.numero,
                complemento || cliente.complemento,
                id
            ]
        );
    
        // Atualiza os dados do telefone
        await db.query(
            `UPDATE telefones_cliente 
            SET telefone = ? 
            WHERE cliente_id = ?`,
            [telefone || cliente.telefone, id]
        );
    
       
        const clienteAtualizado = await db.query(
            `UPDATE clientes 
            SET email = ?, senha = ?, updatedAt = NOW() 
            WHERE id = ?`,
            [email || cliente.email, senhaHash, id]
        );
    
        return clienteAtualizado;
    }
}

module.exports = ClienteService
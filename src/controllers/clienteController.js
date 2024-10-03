const ClienteService = require("../services/clienteService")

const clienteService = new ClienteService()

class ClienteController{
    static async buscaClientePorId(req,res){
        const id = req.usuarioId 
        try{
           const usuario = await clienteService.buscaClientePorId(id)
            res.status(200).json(usuario)
        }catch(error){
            res.status(400).send({error: error.message})
        }
    }

    static async atualizarCliente(req,res){
        const id = req.usuarioId
        const dadosAtualizados = req.body

        try{
            const clienteAtualizado = await clienteService.atualizaCliente(id, dadosAtualizados)
            res.status(200).send({clienteAtualizado, message: 'Cliente atualizado com sucesso!' });
        }catch(error){
            res.status(400).send({error: error.message})
        }
    }
}

module.exports = ClienteController

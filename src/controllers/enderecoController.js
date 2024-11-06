const EnderecoService = require('../services/enderecoService')

const enderecoService = new EnderecoService()

class EnderecoController{
    static async buscaEnderecoCliente(req, res){
        const clienteId = req.usuarioId
        
        try{
            console.log(clienteId)
            const listaEnderecos = await enderecoService.buscaEnderecoCliente(clienteId)
            res.status(200).send(listaEnderecos)
        }catch(error){
            res.status(400).send(error)
        }
    }


}

module.exports = EnderecoController

const {verify, decode} = require('jsonwebtoken')
const jsonSecret = require('../config/jsonSecret')
const EnderecoService = require('../services/enderecoService')

const enderecoService = new EnderecoService()

class EnderecoController{
    static async buscaEnderecoCliente(req, res){
        const token = req.headers.authorization
        const [, acessToken] = token.split(' ')
        verify(acessToken, jsonSecret.secret)
        const {id} = await decode(acessToken)
        try{
            console.log(id)
            const listaEnderecos = await enderecoService.buscaEnderecoCliente(id)
            res.status(200).send(listaEnderecos)
        }catch(error){
            res.status(400).send(error)
        }
    }
}

module.exports = EnderecoController

const {verify, decode} = require('jsonwebtoken')
const jsonSecret = require('../config/jsonSecret')
const ClienteService = require("../services/clienteService")
const clienteService = new ClienteService()

class ClienteController{
    static async buscaClientePorId(req,res){
        const token = req.headers.authorization
        const [, acessToken] = token.split(' ')
        verify(acessToken, jsonSecret.secret)
        const {id} = await decode(acessToken)
        try{
           const usuario = await clienteService.buscaClientePorId(id)
            res.status(200).json(usuario)
        }catch(error){
            res.status(400).send({error: error.message})
        }
    } 
    static async atualizarCliente(req,res){
        const token = req.headers.authorization
        const [, acessToken] = token.split(' ')
        verify(acessToken, jsonSecret.secret)
        const {id} = await decode(acessToken)
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

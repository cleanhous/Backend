const ServicoService = require('../services/servicoService')

const servicoService = new ServicoService()

class ServicoController{
    static async pegaTodosServicos(req,res){
        try{
            const listaServicos = await servicoService.buscaTodosServicos()
            res.status(200).send(listaServicos)
        }catch(error){
            res.status(400).send({message: error.message})
        }
    }

    static async criaServico(req,res){
        const {titulo, descricao} = req.body
        try{
            await servicoService.criaServico({titulo, descricao})
            res.status(201).send("Serviço criado")
        }catch(error){
            res.status(400).send({message: error.message})
        }
    }
}

module.exports = ServicoController

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
        const {titulo} = req.body
        try{
            await servicoService.criaServico({titulo})
            res.status(201).send("Serviço criado")
        }catch(error){
            res.status(400).send({message: error.message})
        }
    }

    static async buscaServicoPorId(req,res){
        const {id} = req.params
        try{
            const servico = await servicoService.buscaServicoPorId(id)
            res.status(200).json(servico)
        }catch(error){
            res.status(400).send({error: error.message})
        }
    }
    
    static async atualizaServico(req, res) {
        const { id } = req.params;
        const dadosAtualizados = req.body;

        try {
            await servicoService.atualizaServico(id, dadosAtualizados);
            res.status(200).send({ message: 'Serviço atualizado com sucesso!' });
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    static async deletaServico(req,res){
        const {id} = req.params
        try{
            await servicoService.excluiServico(id)
            res.status(200).send({message: `Serviço excluido com sucesso!`})
        }catch(error){
            res.status(400).send({error: error.message})
        }
    }
}

module.exports = ServicoController

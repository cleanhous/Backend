
const ContratoService = require('../services/contratoService');

const contratoService = new ContratoService()

class ContratoController {
    static async obterDatasOcupadas(req, res) {
        const { prestadorId } = req.params;

        try {
            const datasOcupadas = await contratoService.obterDatasOcupadas(prestadorId);
            res.json({ datasOcupadas });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar datas ocupadas.' });
        }
    }



    static async criarContrato(req, res) {
        const clienteId = req.usuarioId;
        const {prestadorId, dataInicio, dataFim, observacao } = req.body
    
        try {
          
            const contrato = await contratoService.criarContrato(clienteId, prestadorId, dataInicio, dataFim, observacao);
            console.log('Prestador ID recebido:', prestadorId);
            res.status(201).json({ message: 'Contrato criado com sucesso.', contrato });
            console.log(prestadorId)
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    static async buscaContratoClientes(req, res) {
        const clienteId = req.usuarioId

        try {
            console.log(clienteId)
          const listaDeContratos = await contratoService.buscaContratoClientes(clienteId);
          res.status(200).send(listaDeContratos);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      }

    static async avaliarContrato(req,res){
        const {id} = req.params
        const {estrelas} = req.body
        try{
            await contratoService.avaliarContrato(id,estrelas)
        res.status(200).send({message: "Contrato avaliado com sucesso"})
        }catch(error){
            res.status(400).send(error)
        }
    }

    static async cancelarContrato(req, res) {
        const { id } = req.params;
    
        try {
            await contratoService.cancelarContrato(id);
            res.status(200).json({ message: "Contrato cancelado com sucesso." });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    
}

module.exports = ContratoController;
const ContratoService = require('../services/contratoService');

const contratoService = new ContratoService()

class ContratoController {
    // Método estático para obter datas ocupadas de um prestador
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
            // Verifica se o prestador está disponível
            const contrato = await contratoService.criarContrato(clienteId, prestadorId, dataInicio, dataFim, observacao);
            console.log('Prestador ID recebido:', prestadorId);
            res.status(201).json({ message: 'Contrato criado com sucesso.', contrato });
            console.log(prestadorId)
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }    
}

module.exports = ContratoController;
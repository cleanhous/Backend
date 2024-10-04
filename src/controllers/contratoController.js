const ServicoService = require('../services/contratoService');

class ContratoController {
    // Método estático para obter datas ocupadas de um prestador
    static async obterDatasOcupadas(req, res) {
        const { prestadorId } = req.params;

        try {
            const datasOcupadas = await ServicoService.obterDatasOcupadas(prestadorId);
            res.json({ datasOcupadas });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar datas ocupadas.' });
        }
    }

    // Método estático para criar um novo contrato
    static async criarContrato(req, res) {
        const { clienteId, prestadorId, dataInicio, dataFim } = req.body;

        try {
            const contrato = await ServicoService.criarContrato(clienteId, prestadorId, dataInicio, dataFim);
            res.status(201).json({ message: 'Contrato criado com sucesso.', contrato });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = ContratoController;
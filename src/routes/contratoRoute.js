const express = require('express');
const router = express.Router();
const ContratoController = require('../controllers/contratoController');

// Rota para obter as datas ocupadas de um prestador
router.get('/:prestadorId/datas-ocupadas', ContratoController.obterDatasOcupadas);
router.post('/contrato', ContratoController.criarContrato);
router.get("/contratos/cliente", ContratoController.buscaContratoClientes)
router.put("/contratos/avaliar/:id", ContratoController.avaliarContrato);
router.put("/contratos/cancelar/:id", ContratoController.cancelarContrato);

module.exports = router;
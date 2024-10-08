const express = require('express');
const router = express.Router();
const ContratoController = require('../controllers/contratoController');

// Rota para obter as datas ocupadas de um prestador
router.get('/:prestadorId/datas-ocupadas', ContratoController.obterDatasOcupadas);

// Rota para criar um novo contrato
router.post('/contrato', ContratoController.criarContrato);

module.exports = router;
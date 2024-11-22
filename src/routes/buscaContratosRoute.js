const {Router} = require('express')
const BuscaContratosController = require('../controllers/buscaContratosController')

const router = Router()

router.get('/contratos', BuscaContratosController.buscaTodosContratos)

module.exports = router
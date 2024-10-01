const {Router} = require("express")
const ServicoController = require('../controllers/servicoController')
const validaServico = require("../middleware/validacaoServico")

const router = Router()

router
    .get("/servicos",ServicoController.pegaTodosServicos)
    .post("/servicos",validaServico, ServicoController.criaServico)
module.exports = router
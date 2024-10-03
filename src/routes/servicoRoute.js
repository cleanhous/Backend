const {Router} = require("express")
const ServicoController = require('../controllers/servicoController')
const validaServico = require("../middleware/validacaoServico")

const router = Router()

router
    .get("/servicos",ServicoController.pegaTodosServicos)
    .post("/servicos",validaServico, ServicoController.criaServico)
    .get("/servicos/:id", ServicoController.buscaServicoPorId)
    .put("/servicos/:id", ServicoController.atualizaServico)
    .delete("/servicos/:id", ServicoController.deletaServico)
module.exports = router
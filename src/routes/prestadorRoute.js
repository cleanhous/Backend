const {Router} = require("express")
const PrestadorController = require("../controllers/prestadorController")

const router = Router()

router
    .get('/prestadores-disponiveis/:servico', PrestadorController.obterPrestadoresDisponiveis)
    .get("/:servico", PrestadorController.buscaPrestadores)

module.exports = router


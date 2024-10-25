const {Router} = require("express")
const PrestadorController = require("../controllers/prestadorController")

const router = Router()

router
    .get('/prestadores-disponiveis', PrestadorController.obterPrestadoresDisponiveis)
    .get("/prestadores/:especialidade", PrestadorController.buscaPrestadores)
module.exports = router


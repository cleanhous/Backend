const {Router} = require("express")
const ClienteController = require("../controllers/clienteController")

const router = Router()

router
    .get("/clientes",ClienteController.verificaToken ,ClienteController.buscaClientePorId)
    .put("/clientes",ClienteController.verificaToken ,ClienteController.atualizarCliente)
module.exports = router

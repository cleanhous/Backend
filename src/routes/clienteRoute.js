const {Router} = require("express")
const ClienteController = require("../controllers/clienteController")

const router = Router()

router
    .get("/clientes", ClienteController.buscaClientePorId)
    .put("/clientes", ClienteController.atualizarCliente)
module.exports = router

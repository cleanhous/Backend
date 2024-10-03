const {Router} = require("express")
const ClienteController = require("../controllers/clienteController")

const router = Router()

router
    .get("/clientes", ClienteController.buscaClientePorId)
    
module.exports = router
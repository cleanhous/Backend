const {Router} = require("express")
const PrestadorController = require("../controllers/prestadorController")

const router = Router()

router
    .get("/eletricistas", PrestadorController.buscaPrestadoresEletricistas)

module.exports = router


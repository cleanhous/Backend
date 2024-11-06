const express = require("express")
const router = express.Router();
const EnderecoController = require("../controllers/enderecoController")

router.get("/enderecos", EnderecoController.buscaEnderecoCliente)
module.exports = router
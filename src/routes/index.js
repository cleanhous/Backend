const bodyParser = require('body-parser')
const authCliente = require('./authClienteRoute')
const authAdmin = require('./authAdminRoute')
const servico = require('./servicoRoute')
const autenticado = require('../middleware/autenticado')
const cliente = require("../routes/clienteRoute")
const prestador = require("./prestadorRoute")
const contrato = require("./contratoRoute")
const endereco = require("./enderecoRoute")
const buscaContratos = require("./buscaContratosRoute")
module.exports = app => {
    app.use(
      bodyParser.json(),
      cliente,
      authCliente,
      authAdmin,
      buscaContratos,
      prestador,
      autenticado,
      servico,
      contrato, 
      endereco
    )
  }

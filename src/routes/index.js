const bodyParser = require('body-parser')
const authCliente = require('./authClienteRoute')
const authAdmin = require('./authAdminRoute')
const servico = require('./servicoRoute')
const autenticado = require('../middleware/autenticado')
const cliente = require("../routes/clienteRoute")
const prestador = require("./prestadorRoute")
const contrato = require("./contratoRoute")
const endereco = require("./enderecoRoute")
module.exports = app => {
    app.use(
      bodyParser.json(),
      authCliente,
      authAdmin,
      prestador,
      autenticado,
      servico,
      cliente,
      contrato, 
      endereco
    )
  }

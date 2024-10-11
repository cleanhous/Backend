const bodyParser = require('body-parser')
const authCliente = require('./authClienteRoute')
const servico = require('./servicoRoute')
const autenticado = require('../middleware/autenticado')
const cliente = require("../routes/clienteRoute")
const prestador = require("./prestadorRoute")
const contrato = require("./contratoRouter")

module.exports = app => {
    app.use(
      bodyParser.json(),
      authCliente,
      prestador,
      autenticado,
      servico,
      cliente,
      contrato
      
    )
  }

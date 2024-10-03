const bodyParser = require('body-parser')
const authCliente = require('./authClienteRoute')
const servico = require('./servicoRoute')
const autenticado = require('../middleware/autenticado')
const cliente = require("../routes/clienteRoute")

module.exports = app => {
    app.use(
      bodyParser.json(),
      authCliente,
      autenticado,
      servico,
      cliente
    )
  }

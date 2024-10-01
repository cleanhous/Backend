const bodyParser = require('body-parser')
const authCliente = require('./authClienteRoute')
const servico = require('./servicoRoute')

module.exports = app => {
    app.use(
      bodyParser.json(),
      authCliente,
      servico
    )
  }

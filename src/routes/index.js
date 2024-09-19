const bodyParser = require('body-parser')
const authCliente = require('./authClienteRoute')
const authPrestador = require('./authPrestadorRoute')
module.exports = app => {
    app.use(
      bodyParser.json(),
      authCliente,
      authPrestador
    )
  }

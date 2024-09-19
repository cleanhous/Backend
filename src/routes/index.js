const bodyParser = require('body-parser')
const authContratante = require('./authContratanteRoute')
const authPrestador = require('./authPrestadorRoute')
module.exports = app => {
    app.use(
      bodyParser.json(),
      authContratante,
      authPrestador
    )
  }
  
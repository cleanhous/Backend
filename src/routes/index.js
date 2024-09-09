const bodyParser = require('body-parser')
const authContratante = require('./authContratanteRoute')
module.exports = app => {
    app.use(
      bodyParser.json(),
      authContratante
    )
  }
  
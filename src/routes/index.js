const bodyParser = require('body-parser')

const contratante = require('./contratanteRoute')
const authContratante = require('./authContratanteRoute')
module.exports = app => {
    app.use(
      bodyParser.json(),
      authContratante
    )
  }
  
const express = require('express')
const routes = require('./routes')
const cors = require("cors")
const swaggerUi = require('swagger-ui-express')
const swagger = require('./swagger.json')

const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger))
app.use(express.json());
app.use(cors())
routes(app)


module.exports = app;
const express = require('express')
const routes = require('./routes')
const cors = require("cors")

const app = express();


app.use(express.json());
app.use(cors())
routes(app)

module.exports = app;
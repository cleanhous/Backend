const {Router} = require('express')
const AuthContratanteController = require('../controllers/authContratanteController')

const router = Router()

router
    .post('/login/contratantes', AuthContratanteController.login)
    .post('/cadastro/contratantes', AuthContratanteController.cadastrar)
module.exports = router

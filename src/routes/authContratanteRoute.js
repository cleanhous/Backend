const {Router} = require('express')
const AuthContratanteController = require('../controllers/authContratanteController')

const router = Router()

router
    .post('/auth-contratantes', AuthContratanteController.login)
    .post('/register-contratantes', AuthContratanteController.cadastrar)
module.exports = router

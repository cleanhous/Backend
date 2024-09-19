const {Router} = require('express')
const AuthPrestadorController = require('../controllers/authPrestadorController')
const router = Router()

router
    .post('/login/prestadores', AuthPrestadorController.login)
    .post('/cadastro/prestadores',AuthPrestadorController.cadastrar)
module.exports = router

const {Router} = require('express')
const AuthClienteController = require('../controllers/authClienteController')

const router = Router()

router
    .post('/login', AuthClienteController.login)
    .post('/cadastro', AuthClienteController.cadastrar)
    .post('/forgot-password', AuthClienteController.forgotPassword)
    .post('reset-password', AuthClienteController.resetPassword)
    
module.exports = router

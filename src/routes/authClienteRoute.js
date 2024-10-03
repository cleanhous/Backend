const {Router} = require('express')
const AuthClienteController = require('../controllers/authClienteController')
const validaCliente = require('../middleware/validacaoCliente')

const router = Router()

router
    .post('/login', AuthClienteController.login)
    .post('/cadastro',validaCliente, AuthClienteController.cadastrar)
    .post('/forgot-password', AuthClienteController.forgotPassword)
    .post('reset-password', AuthClienteController.resetPassword)
    
module.exports = router

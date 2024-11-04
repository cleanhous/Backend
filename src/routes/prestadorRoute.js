const {Router} = require("express")
const PrestadorController = require("../controllers/prestadorController")

const router = Router()


router
    .get('/prestadores-disponiveis/:servico', PrestadorController.obterPrestadoresDisponiveis)
    .get('/prestadores', PrestadorController.getAllPrestador) 
    .post('/prestadores/create', PrestadorController.createPrestador)
    .get('/:servico', PrestadorController.buscaPrestadores);

module.exports = router


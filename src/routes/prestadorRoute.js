const {Router} = require("express")
const PrestadorController = require("../controllers/prestadorController")

const router = Router()


router
    .get('/prestadores-disponiveis/:servico', PrestadorController.obterPrestadoresDisponiveis)
    .get('/prestadores', PrestadorController.getAllPrestador) 
    .get('/:servico', PrestadorController.buscaPrestadores)
    .post('/prestadores/create', PrestadorController.createPrestador) 
    .patch('/prestadores/:id', PrestadorController.updatePrestador)
    .delete('/prestadores/:id', PrestadorController.deletePrestador)
module.exports = router


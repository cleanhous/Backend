const BuscaContratosService = require('../services/buscaContratosService')
const buscaContratosService = new BuscaContratosService()

class BuscaContratosController{
    static async buscaTodosContratos(req,res){
        try{
            const contratos = await buscaContratosService.buscaTodosContratos()
            res.status(200).json(contratos)
        }catch(error){
            res.status(400).json({message: error.message})
        }
    }
}

module.exports = BuscaContratosController

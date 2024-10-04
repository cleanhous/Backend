const PrestadorService = require("../services/prestadorService")

const prestadorService = new PrestadorService()

class PrestadorController{
    static async buscaPrestadoresEletricistas(req,res){
        try{
            const listaPrestadores = await prestadorService.buscaPrestadoresEletricistas()
            res.status(200).send(listaPrestadores)
        }catch(error){
            res.status(400).send({message: error.message})
        }
    }
}

module.exports = PrestadorController
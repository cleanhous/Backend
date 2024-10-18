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

    static async buscarPrestadoresDisponiveis(req, res) {
        const { dataInicio, dataFim } = req.query
    
        try {
            const prestadores = await prestadorService.obterPrestadoresDisponiveis(dataInicio, dataFim);
            res.status(200).json(prestadores);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
}
   
module.exports = PrestadorController

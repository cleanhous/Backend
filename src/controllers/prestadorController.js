const PrestadorService = require("../services/prestadorService")

const prestadorService = new PrestadorService()

class PrestadorController{
    static async buscaPrestadores(req, res) {
        const {servico} = req.params
        
        try {
            const listaPrestadores = await prestadorService.buscaPrestadores(servico);
            res.status(200).send(listaPrestadores);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    


    static async obterPrestadoresDisponiveis(req, res) {
        const {servico} = req.params

        const { dataInicio, dataFim} = req.query

        try {
            const prestadores = await prestadorService.obterPrestadoresDisponiveis(dataInicio, dataFim, servico);
            res.status(200).json(prestadores);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
}
   
module.exports = PrestadorController

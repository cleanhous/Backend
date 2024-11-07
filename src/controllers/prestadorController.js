const PrestadorService = require("../services/prestadorService")

const prestadorService = new PrestadorService()

class PrestadorController{

    static async createPrestador(req, res) {
        const { nome, email, cpf, senha, telefone, nota, especialidade_id } = req.body;
        
        try {
            const response = await prestadorService.createPrestador({ nome, email, cpf, senha, telefone, nota, especialidade_id });
            res.status(201).send(response);
        } catch (error) {
            console.error('erro ao cadastra prestador, verifique classe prestador de controller.')
            res.status(400).send({ message: error.message });
        }

    }

    static  async getAllPrestador(req, res) {   

        try {
            const prestadores = await prestadorService.getAllPrestadores();
            res.status(200).send(prestadores);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }
    static async deletePrestador(req, res) {
        const { id } = req.params;

        try {
            const response = await prestadorService.deletePrestador(id);
            res.status(200).send(response);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }
    static async updatePrestador(req, res) {
        const { id } = req.params;
        const { email, telefone, especialidade_id } = req.body;

        try {
            const response = await prestadorService.updatePrestador(id, { email, telefone, especialidade_id });
            res.status(200).send(response);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

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

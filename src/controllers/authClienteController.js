const AuthClienteService = require('../services/authClienteService')

const authClienteService = new AuthClienteService()

class AuthClienteController{
    static async login(req,res){

        const {email,senha} = req.body
    
        try{
            const login = await authClienteService.login({email,senha})

            res.status(200).send(login)
        
        }catch(error){
            res.status(401).send({message: error.message})
        }
    }

    static async cadastrar(req,res){
        const {nome,email,senha,telefone,uf,cidade,logradouro,cep,numero,complemento} = req.body
        try{
            const cliente = await authClienteService.cadastrar({nome,email,senha,telefone,uf,cidade,logradouro,cep,numero,complemento})
            res.status(201).send(cliente)
        }catch (error) {
            res.status(400).send({message: error.message})
        }
    }

    static async forgotPassword(req, res) {
        const { email } = req.body;
    

        if (!email) {
            return res.status(400).send({ message: 'Email não fornecido' });
        }

        try {
            const result = await authClienteService.forgotPassword(email);
            res.status(200).send(result);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async resetPassword(req, res) {
        const { token, senha } = req.body;

        try {
            const result = await authClienteService.resetPassword(token, senha);
            res.status(200).send(result);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }
}

module.exports = AuthClienteController


const AuthContratanteService = require('../services/authContratanteService')

const authContratanteService = new AuthContratanteService()

class AuthContratanteController{
    static async login(req,res){

        const {email,senha} = req.body
    
        try{
            const login = await authContratanteService.login({email,senha})

            res.status(200).send(login)
        
        }catch(error){
            res.status(401).send({message: error.message})
        }
    }

    static async cadastrar(req,res){
        const {nome,email,senha,uf,cidade,cep,rua,numero,complemento} = req.body
        try{
            const contratante = await authContratanteService.cadastrar({nome,email,senha,uf,cidade,cep,rua,numero,complemento})
            res.status(201).send(contratante)
        }catch (error) {
            res.status(400).send({message: error.message})
        }
    }
}

module.exports = AuthContratanteController


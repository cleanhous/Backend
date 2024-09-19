const AuthPrestadorService = require('../services/authPrestadorService')

const authPrestadorService = new AuthPrestadorService()

class AuthPrestadorController{
    static async login(req,res){

        const {email,senha} = req.body
    
        try{
            const login = await authPrestadorService.login({email,senha})

            res.status(200).send(login)
        
        }catch(error){
            res.status(401).send({message: error.message})
        }
    }
   
    static async cadastrar(req,res){
        const {nome,email,senha,uf,cidade,logradouro,cep,rua,numero,complemento} = req.body
        try{
            const prestador = await authPrestadorService.cadastrar({nome,email,senha,uf,cidade,logradouro,cep,rua,numero,complemento})
            res.status(201).send(prestador)
        }catch (error) {
            res.status(400).send({message: error.message})
        }
    }
}

module.exports = AuthPrestadorController


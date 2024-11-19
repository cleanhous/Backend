const AuthAdminService = require("../services/authAdminService")

const authAdminService = new AuthAdminService()

class AuthAdminController{
    static async login(req, res){
        const {codigo, senha} = req.body

        try{
            const login = await authAdminService.login({codigo,senha})
            res.status(200).send(login)
        }catch(error){
            res.status(401).json({message: error.message})
        }
    }
}


module.exports = AuthAdminController
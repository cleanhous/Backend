const database = require('../models')
const {compare} = require('bcryptjs')
const { hash } = require('bcryptjs');
const uuid = require('uuid')


class AuthContratanteService{
    async login(dto){
        const contratante = await database.contratantes.findOne({
            attributes: ['id', 'email', 'senha'],
            where:{
                email: dto.email
            }
        })

        if(!contratante){
            throw new Error('Usuário não cadastrado')
        }

        const senhasIguais = await compare(dto.senha, contratante.senha)

        if(!senhasIguais){
            throw new Error('Usuário ou senha inválido')
        }
        return contratante
    }

    async cadastrar(dto){
        const contratante = await database.contratantes.findOne({
            where:{
                email: dto.email
            }
        })

        if(contratante){
            throw new Error('Contratante já cadastrado');   
        }

        const senhaHash = await hash(dto.senha, 8)

        try{
            const novoContratante = database.contratantes.create({
                id: uuid.v4(),
                nome: dto.nome,
                email: dto.email,
                senha: senhaHash,
                uf: dto.uf,
                cidade: dto.cidade,
                cep: dto.cep,
                rua: dto.rua,
                numero: dto.numero,
                complemento: dto.complemento
            })
            return novoContratante
        }catch(error){
            throw new Error('Erro ao cadastrar usuário');
        }
    }
}


module.exports = AuthContratanteService
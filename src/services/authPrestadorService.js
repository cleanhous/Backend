const {compare} = require('bcryptjs')
const { hash } = require('bcryptjs');
const uuid = require('uuid')
const db = require('../db/dbConnection');
const {sign}= require('jsonwebtoken')
const jsonSecret = require("../config/jsonSecret")

class AuthPrestadorService{
    async login(dto) {           
        const [rows] = await db.query(
            'SELECT id, email, senha FROM prestadores WHERE email = ?',
            [dto.email]
        )
        const prestador = rows[0];

        if (!prestador) {
            throw new Error('Usuário não cadastrado');
        }
        const senhasIguais = await compare(dto.senha, prestador.senha);

        if (!senhasIguais) {
            throw new Error('Usuário ou senha inválido');
        }

        const acessToken = sign({
            id: prestador.id,
            email: prestador.email
        },jsonSecret.secret, {
            expiresIn: 86400
        })
        
        return {acessToken}
    }

    async cadastrar(dto) {
        
        const [rows] = await db.query(
            'SELECT email FROM prestadores WHERE email = ?',
            [dto.email]
        );
        const prestador = rows[0];

        if (prestador) {
            throw new Error('Prestador já cadastrado');
        }

        const senhaHash = await hash(dto.senha, 8);

        const now = new Date();

        try {

            const [result] = await db.query(
                `INSERT INTO prestadores 
               (id, nome, email, senha, uf, cidade, logradouro, cep, numero, complemento, createdAt, updatedAt)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    uuid.v4(),
                    dto.nome,
                    dto.email,
                    senhaHash,
                    dto.uf,
                    dto.cidade,
                    dto.logradouro,
                    dto.cep,
                    dto.numero,
                    dto.complemento,
                    now,
                    now 
                ]
            );
            return result
        } catch (error) {
            console.error('Erro ao cadastrar prestador:', error);
            throw new Error('Erro ao cadastrar usuário');
        }
    }
}

module.exports = AuthPrestadorService
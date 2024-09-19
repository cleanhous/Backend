const {compare} = require('bcryptjs')
const { hash } = require('bcryptjs');
const uuid = require('uuid')
const db = require('../db/dbConnection');
const {sign}= require('jsonwebtoken')
const jsonSecret = require("../config/jsonSecret")

class AuthContratanteService{
    async login(dto) {
        const [rows] = await db.query(
            'SELECT id, email, senha FROM contratantes WHERE email = ?',
            [dto.email]
        )
        const contratante = rows[0];

        if (!contratante) {
            throw new Error('Usuário não cadastrado');
        }

        const senhasIguais = await compare(dto.senha, contratante.senha);

        if (!senhasIguais) {
            throw new Error('Usuário ou senha inválido');
        }

        const acessToken = sign({
            id: contratante.id,
            email: contratante.email
        },jsonSecret.secret, {
            expiresIn: 86400
        })
        
        return {acessToken}
    }

    async cadastrar(dto) {
        
        const [rows] = await db.query(
            'SELECT email FROM contratantes WHERE email = ?',
            [dto.email]
        );
        const contratante = rows[0];

        if (contratante) {
            throw new Error('Contratante já cadastrado');
        }

        const senhaHash = await hash(dto.senha, 8);

        const now = new Date();

        try {

            const [result] = await db.query(
                `INSERT INTO contratantes 
                (id, nome, email, senha, uf, cidade, cep, rua, numero, complemento, createdAt, updatedAt) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    uuid.v4(),
                    dto.nome,
                    dto.email,
                    senhaHash,
                    dto.uf,
                    dto.cidade,
                    dto.cep,
                    dto.rua,
                    dto.numero,
                    dto.complemento,
                    now,
                    now  
                ]
            );

            return result;
        } catch (error) {
            console.error('Erro ao cadastrar contratante:', error);
            throw new Error('Erro ao cadastrar usuário');
        }
    }
}

module.exports = AuthContratanteService
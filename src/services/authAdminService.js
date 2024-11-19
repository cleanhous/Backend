const {compare} = require('bcryptjs')
const { hash } = require('bcryptjs');
const uuid = require('uuid')
const db = require('../db/dbConnection');
const {sign}= require('jsonwebtoken')
const jsonSecret = require("../config/jsonSecret")
const nodemailer = require('nodemailer');
require('dotenv').config()

class AuthAdminService{
    async login(dto) {
        const [rows] = await db.query(
            'SELECT id, codigo, senha FROM admins WHERE codigo = ?',
            [dto.codigo]
        )
        const admin = rows[0];

        if (!admin) {
            throw new Error('Usuário não cadastrado');
        }

        const senhasIguais = await compare(dto.senha, admin.senha);

        if (!senhasIguais) {
            throw new Error('Usuário ou senha inválido');
        }

        const acessToken = sign({
            id: admin.id,
            email: admin.codigo
        },jsonSecret.secret, {
            expiresIn: 86400
        })
        
        return {acessToken}
    }

}
module.exports = AuthAdminService

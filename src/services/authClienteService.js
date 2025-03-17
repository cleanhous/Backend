const {compare} = require('bcryptjs')
const { hash } = require('bcryptjs');
const uuid = require('uuid')
const db = require('../db/dbConnection');
const {sign}= require('jsonwebtoken')
const jsonSecret = require("../config/jsonSecret")
const nodemailer = require('nodemailer');
require('dotenv').config()

class AuthClienteService{
    async login(dto) {
        const [rows] = await db.query(
            'SELECT id, email, senha FROM clientes WHERE email = ?',
            [dto.email]
        )
        const cliente = rows[0];

        if (!cliente) {
            throw new Error('Usuário ou senha inválido');
        }

        const senhasIguais = await compare(dto.senha, cliente.senha);

        if (!senhasIguais) {
            throw new Error('Usuário ou senha inválido');
        }

        const acessToken = sign({
            id: cliente.id,
            email: cliente.email
        },jsonSecret.secret, {
            expiresIn: 86400
        })
        
        return {acessToken}
    }

    async cadastrar(dto) {
        
        const [rows] = await db.query(
            'SELECT email FROM clientes WHERE email = ?',
            [dto.email]
        );
        const clienteComEmail = rows[0];

        if (clienteComEmail) {
            throw new Error('Cliente já cadastrado');
        }

        const [linhas] = await db.query(
            "SELECT cpf FROM clientes WHERE cpf = ?", [dto.cpf]
        )

        const clienteComCpf = linhas[0]

        if(clienteComCpf){
            throw new Error('Cliente já cadastrado');
        }

        const senhaHash = await hash(dto.senha, 8);
        const cliente_id = uuid.v4()

        const now = new Date();

            const [result] = await db.query(
                `INSERT INTO clientes
               (id, nome, email,cpf,senha,createdAt, updatedAt)
                VALUES (?, ?, ?, ?, ?, ?, ?);
                `,
                [
                    cliente_id,
                    dto.nome,
                    dto.email,
                    dto.cpf,
                    senhaHash,
                    now,
                    now 
                ]
            )

            const[resultEndereco] = await db.query(
                `INSERT INTO enderecos_cliente(uf, cidade,bairro, logradouro, cep, numero, complemento, cliente_id) values(?,?,?,?,?,?,?,?)`,
                [
                    dto.uf,
                    dto.cidade,
                    dto.bairro,
                    dto.logradouro,
                    dto.cep,
                    dto.numero,
                    dto.complemento,
                    cliente_id
                ]
            )

            const [resultTelefone] = await db.query(
                `INSERT INTO telefones_cliente(telefone, cliente_id) values(?,?)`,
                [
                    dto.telefone,
                    cliente_id
                ]
            )
            return result
    }
}
module.exports = AuthClienteService
const {compare} = require('bcryptjs')
const { hash } = require('bcryptjs');
const uuid = require('uuid')
const db = require('../db/dbConnection');
const {sign}= require('jsonwebtoken')
const jsonSecret = require("../config/jsonSecret")
const nodemailer = require('nodemailer');

class AuthClienteService{
    async login(dto) {
        const [rows] = await db.query(
            'SELECT id, email, senha FROM clientes WHERE email = ?',
            [dto.email]
        )
        const cliente = rows[0];

        if (!cliente) {
            throw new Error('Usuário não cadastrado');
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
        const cliente = rows[0];

        if (cliente) {
            throw new Error('Cliente já cadastrado');
        }

        const senhaHash = await hash(dto.senha, 8);

        const now = new Date();

        try {
            const [result] = await db.query(
                `INSERT INTO clientes 
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
            console.error('Erro ao cadastrar cliente:', error);
            throw new Error('Erro ao cadastrar usuário');
        }
    }

    async forgotPassword(email) {
        // Verifique se o usuário existe
        const [rows] = await db.query('SELECT id, email FROM clientes WHERE email = ?', [email]);
        const cliente = rows[0];
    
        if (!cliente) {
            throw new Error('Usuário não encontrado');
        }
    
        // Gerar um token de redefinição de senha (válido por 1 hora)
        const acessToken = sign({
            id: cliente.id,
            email: cliente.email
        }, jsonSecret.secret, {
            expiresIn: 3600 // 1 hora
        });
    
        // Criar o link de redefinição de senha
        const resetLink = `http://localhost:3000/reset-password?token=${acessToken}`;
    
        // Configurar o transportador do nodemailer para enviar email
        const transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false,
            auth: {
                user: '', // substitua pelo seu email
                pass: '', // substitua pela sua senha
            },
        });
    
        // Enviar email para o usuário
        await transporter.sendMail({
            from: '"Clean House" <>',
            to: cliente.email,
            subject: 'Redefinição de Senha',
            text: `Olá, clique no link para redefinir sua senha: ${resetLink}`,
        });
    
        return { message: 'Email de redefinição de senha enviado com sucesso!' };
    }

    async resetPassword(token, novaSenha) {
        // Verificar se o token é válido
        let decoded;
        try {
            decoded = jwt.verify(token, secret);
        } catch (error) {
            throw new Error('Token inválido ou expirado');
        }

        // Gerar o hash da nova senha
        const senhaHash = await hash(novaSenha, 8);

        // Atualizar a senha no banco de dados
        await db.query(
            'UPDATE clientes SET senha = ? WHERE id = ?',
            [senhaHash, decoded.id]
        );

        return { message: 'Senha redefinida com sucesso!' };
    }
}

module.exports = AuthClienteService
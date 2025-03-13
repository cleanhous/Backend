const ClienteService = require("../services/clienteService");
const { verify, decode } = require("jsonwebtoken");
const jsonSecret = require("../config/jsonSecret");

const clienteService = new ClienteService();

class ClienteController {
    static async verificaToken(req, res, next) {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).send({ error: "Access token não informado" });
        }

        const [, accessToken] = token.split(" ");

        try {
            verify(accessToken, jsonSecret.secret);
            const { id, email } = decode(accessToken);
            req.usuarioId = id;
            req.usuarioEmail = email;
            next();
        } catch (error) {
            return res.status(401).send({ error: "Usuário não autorizado" });
        }
    }

    static async buscaClientePorId(req, res) {
        const id = req.usuarioId;
        try {
            const usuario = await clienteService.buscaClientePorId(id);
            return res.status(200).json(usuario);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }

    static async atualizarCliente(req, res) {
        const id = req.usuarioId;
        const dadosAtualizados = req.body;

        try {
            const clienteAtualizado = await clienteService.atualizaCliente(id, dadosAtualizados);
            return res.status(200).send({ clienteAtualizado, message: "Cliente atualizado com sucesso!" });
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
}

module.exports = ClienteController;
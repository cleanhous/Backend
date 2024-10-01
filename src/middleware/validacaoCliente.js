const { body, validationResult } = require('express-validator');

const validaCliente = [
    body('nome')
        .notEmpty().withMessage("Campo 'nome' é obrigatório."),
    body('email')
        .isEmail().withMessage("Campo 'email' deve ser um e-mail válido."),
    body('senha')
        .isLength({ min: 6 }).withMessage("Campo 'senha' deve ter no mínimo 6 caracteres."),
    body('telefone')
        .notEmpty().withMessage("Campo 'telefone' é obrigatório."),
    body('uf')
        .notEmpty().withMessage("Campo 'uf' é obrigatório."),
    body('cidade')
        .notEmpty().withMessage("Campo 'cidade' é obrigatório."),
    body('logradouro')
        .notEmpty().withMessage("Campo 'logradouro' é obrigatório."),
    body('cep')
        .notEmpty().withMessage("Campo 'cep' é obrigatório."),
    body('numero')
        .notEmpty().withMessage("Campo 'numero' é obrigatório."),
    body('complemento')
        .optional(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(err => err.msg);
            return res.status(400).json({ errors: errorMessages });
        }
        next();
    }
];

module.exports = validaCliente;

const { body, validationResult } = require('express-validator');

const validaCliente = [
    body('nome')
        .notEmpty().withMessage("Campo 'nome' é obrigatório."),
    body('email')
        .isEmail().withMessage("Campo 'email' deve ser um e-mail válido."),
    body('cpf')
        .notEmpty().withMessage("Campo 'cpf' é obrigatório."),
    body('senha')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
        .withMessage("A senha deve ter no mínimo 6 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial."),
    body('telefone')
        .matches(/^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm)
        .withMessage("Campo 'telefone' deve ser válido no formato (99)99999-9999 ou 99999-9999."),
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
]
module.exports = validaCliente;

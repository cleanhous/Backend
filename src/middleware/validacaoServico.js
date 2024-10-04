const { body, validationResult } = require('express-validator');

const validaServico = [
    body('titulo')
        .notEmpty().withMessage("Campo 'titulo' é obrigatório."),
    

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(err => err.msg)
            return res.status(400).json({ errors: errorMessages })
        }
        next();
    }
]

module.exports = validaServico;

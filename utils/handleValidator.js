const { validationResult } = require('express-validator');

const validateResults = (req, res, next) => {
    try {
        // Valida los datos enviados por las peticiones, sino cumple crashea con throw
        validationResult(req).throw()
        return next() // Sino existe error continua hacia el controlador
    } catch (err) {
        res.status(403)
        res.send({ errors: err.array() })
    }
}

module.exports = validateResults 
const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator")

const validatorCreateCripto = [
    check("nombre","Ingrese nombre completo")
    .exists()
    .notEmpty(),
    check("precio","Campo precio vacio")
    .exists()
    .notEmpty()
    .custom((value, { req }) => {
        if (value < 0) {
            throw new Error('No digite números negativos')
        }
        return true
    }),
    check("simbolo","Campo simbolo vacio")
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = {validatorCreateCripto}
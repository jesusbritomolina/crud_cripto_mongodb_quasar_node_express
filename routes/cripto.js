const express = require("express");
const router = express.Router();
const { validatorCreateCripto } = require("../validators/cripto")
const { getCriptos, getCripto, createCripto, updateCripto, deleteCripto } = require("../controllers/criptoController")

// Para cargar la imagen
var multer = require('multer');

// Configuramos un directorio donde se guardarán los imagenes, y también les daremos un nuevo identificador
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'controllers/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

// Para usar multer y que en la propiedad storage haga uso de var storage
var upload = multer({ storage: storage });

//TODO http://localhost:port/cripto GET, POST, DELETE

// Mostrar todos las cripto (GET)
router.get("/cripto", getCriptos)

// Mostrar una cripto (GET)
router.get("/cripto/:id", getCripto)

// Crear cripto (POST)
// Usando multer con upload.single() solo permite guardar 1 imagen
router.post("/cripto/crear", upload.single("imagen"), validatorCreateCripto, createCripto)

// Editar cripto (PUT)
router.post('/cripto/editar/:id', upload.single("imagen"), validatorCreateCripto, updateCripto)

// Borrar cripto (DELETE)
router.delete('/cripto/borrar/:id', deleteCripto)

module.exports = router
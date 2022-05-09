const Cripto = require('../model/Cripto');
const fs = require('fs'); // Permite interactuar con las imagenes
const path = require('path'); // Permite interactuar con las rutas de las imagenes
const imageDataURI = require('image-data-uri'); // Para decodificar/codificar fácilmente imágenes URI de datos

/*
Las funciones asíncronas (async / await) surgen para simplificar el manejo de las promesas.
Cuando se llama a una función async, esta devuelve un elemento Promise
Estas reciben 2 argumentos que nos envía express (request/solicitud y response/respuesta)
*/

/*
    Obtiene todas las criptomonedas de la base de datos
*/
const getCriptos = async (req, res) => {
    // Variable data para acceder al modelo Cripto
    // await (esperará) a que una función async (asíncrona) se complete
    const data = await Cripto.find();
    var criptos = [];

    for (crypto of data){
        // Convierte la data string base 64 de la imagen en un objeto
        let dataBuffer = new Buffer.from(crypto.filename.data);
        // PNG | JPG | etc.
        let mediaType = crypto.filename.contentType;

         criptos.push(
            {
                data: crypto,
                // Codifica :: image data URI :: data:[<media type>][;base64],<data> :: 'data:image/png;base64,PNGDATAURI/wD/'
                url: imageDataURI.encode(dataBuffer, mediaType)
            }
         );
    }
    res.send(criptos)
};

/*
    Obtiene una sola criptomoneda
*/
const getCripto = async (req, res) => {
    const data = await Cripto.findById({_id:req.params.id});

    let dataBuffer = new Buffer.from(data.filename.data);
    let mediaType = data.filename.contentType;

    res.send({
        _id: data._id,
        nombre: data.nombre,
        precio: data.precio,
        simbolo: data.simbolo,
        imagen: data.filename,
        url: imageDataURI.encode(dataBuffer, mediaType)
    })
};

/*
    Crear una criptomoneda
*/
const createCripto = async (req, res) => {
    const fileData = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        simbolo: req.body.simbolo,
        filename: {
            /* fs.readFileSync() lee el archivo y devuelve su contenido de forma sincrónica, es decir,
            le estamos diciendo a node.js que bloquee otros procesos paralelos y haga el proceso de lectura de archivos actual. */
            /* path.join() une un número de segmentos para formar una sola ruta. */
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: req.file.mimetype
        }
    }
    const data = await Cripto.create(fileData)
    res.redirect("/")
};

/*
    Actualizar una criptomoneda
*/
const updateCripto = async (req, res) => {    
    var fileData = [];

    fileData = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        simbolo: req.body.simbolo,
        filename: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: req.file.mimetype
        }
    }

    const data = await Cripto.findOneAndUpdate({_id:req.params.id}, fileData);
    res.redirect("/")   
};

/*
    Eliminar una criptomoneda
*/
const deleteCripto = async (req, res) => {
    const data = await Cripto.findByIdAndDelete(req.params.id)
    res.send(data)
};

module.exports = { getCriptos, getCripto, createCripto, updateCripto, deleteCripto };
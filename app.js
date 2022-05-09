require("dotenv").config(); // Permite cargar las variables de entorno del archivo .env
const express = require("express"); // Permite definir rutas como son peticiones GET, POST, PUT, DELETE
const cors = require("cors");
const dbConnect = require('./config/mongo');
const app = express(); // Creando Aplicacion Express
const path = require('path'); // Permite interactuar con las rutas de las imagenes

// Permite solicitudes HTTP de origen cruzado
app.use(cors())

// express.json() = Es un método incorporado en Express para reconocer el objeto de solicitud entrante como un objeto JSON
app.use(express.json())

// Renderizar
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

const port = process.env.PORT || 3000

// Invocamos a las rutas
//TODO http://localhost:port/api/______
app.use("/api", require("./routes/cripto"))

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

dbConnect()
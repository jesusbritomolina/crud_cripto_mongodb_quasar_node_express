const mongoose = require("mongoose"); // Crea conexión entre MongoDB y el marco de la aplicación web Express

const dbConnect = () => {
    const DB_URI = process.env.DB_URI;
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },(err, res) => {
        if(!err){
            console.log('**** CONEXION CORRECTA ****')
        }else{
            console.log('**** ERROR DE CONEXION ****')
            console.log(err)
        }
    });
};

module.exports = dbConnect
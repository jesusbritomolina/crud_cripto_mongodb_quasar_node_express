const mongoose = require("mongoose"); // Crea conexión entre MongoDB y el marco de la aplicación web Express

const dbConnect = () => {
    mongoose.connect("mongodb+srv://jesus:jesus@cluster0.zcaao.mongodb.net/crud_mongodb?retryWrites=true&w=majority", {
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
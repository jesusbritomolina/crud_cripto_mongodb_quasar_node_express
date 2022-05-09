const mongoose = require('mongoose')

const criptoSchema = new mongoose.Schema(
    {
        nombre:{
            type: String
        },
        precio:{
            type: Number
        },
        simbolo:{
            type: String
        },
        filename:{
            data: Buffer,
            contentType: String
        },
    },
    {
        versionKey:false
    }
)

module.exports = mongoose.model('cripto', criptoSchema)
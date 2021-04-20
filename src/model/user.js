const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    cpfcnpj:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    senha :{
        type: String,
        required: true
    }
    
})

module.exports = model("usario", UserSchema)
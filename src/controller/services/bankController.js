const user = require("../../model/user")
const jwt = require('jsonwebtoken')

function depositarDinheiro (req,res){
    const body = req.body
    const valor_deposito = body.valor

    const user_token = req.headers.authorization
    const token = user_token.split(' ')
    const decode = jwt.verify(token[0], process.env.SECRET)

    console.log(decode.chave);


    return res.status(200).json({status:"valor depositado"})
}

module.exports = { depositarDinheiro }
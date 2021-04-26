const modelUser = require("../../model/user")
const jwt = require('jsonwebtoken')

async function depositarDinheiro (req,res){
    const body = req.body
    const valor_deposito = body.valor_depositado

    const user_token = req.headers.authorization
    const decode = jwt.verify(user_token, process.env.SECRET)

    const user_login = await modelUser.findOne({cpfcnpj:decode.chave})

    let atual_value = user_login.valor_em_conta

    let new_value = valor_deposito + atual_value

    return res.status(200).json({status:"valor depositado"})
}

async function verificar_saldo(req,res){
    const user_token = req.headers.authorization
    const decode = jwt.verify(user_token, process.env.SECRET)

    const user_account = await modelUser.findOne({cpfcnpj:decode.chave})

    return res.status(200).json({saldo:user_account.valor_em_conta})
}

module.exports = { depositarDinheiro, verificar_saldo }
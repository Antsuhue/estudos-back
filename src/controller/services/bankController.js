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

    await modelUser.findOneAndUpdate({cpfcnpj:decode.chave}, {valor_em_conta:new_value}, {useFindAndModify:false}) 

    return res.status(200).json({status:"valor depositado"})
}

async function verificar_saldo(req,res){
    const user_token = req.headers.authorization
    const decode = jwt.verify(user_token, process.env.SECRET)

    const user_account = await modelUser.findOne({cpfcnpj:decode.chave})

    return res.status(200).json({saldo:user_account.valor_em_conta})
}

async function transferir_dinheiro(req,res){
    const valor_a_transferir = req.body.valor
    const recebedor = req.body.recebedor
    const user_token = req.headers.authorization

    console.log(valor_a_transferir);

    const decode = jwt.verify(user_token, process.env.SECRET)
    const user_account = await modelUser.findOne({cpfcnpj:decode.chave})
    const verificar_recebedor = await modelUser.findOne({cpfcnpj:recebedor})

    if(decode.chave==recebedor){
        return res.status(400).json({status:"CPF/CNPJ do recebedor deve ser diferente de quem está transferindo!"})
    }
    else if(verificar_recebedor){
        if(valor_a_transferir > user_account.valor_em_conta){
            return res.status(400).json({status:"valor acima do disponível em conta"})
        }
        else{
            return res.status(200).json({status:"Transferencia concluida"})
        }
    }

    return res.status(400).json({ status:"recebedor não existente!" })

}

module.exports = { depositarDinheiro, verificar_saldo, transferir_dinheiro }
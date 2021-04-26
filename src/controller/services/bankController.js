function depositarDinheiro (req,res){
    const body = req.body
    const valor_deposito = body.valor

    const t = req.headers.token

    console.log(t);
    

    return res.status(200).json({status:"valor depositado"})
}

module.exports = { depositarDinheiro }
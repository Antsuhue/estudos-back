const modelUser = require('../../model/user')

function dogla(req,res) {
    return res.json({"ok":true})
}

async function create_user(req,res){
    const data = req.body
    
    // Realiza consulta no banco para saber se o cliente já tem cadastro
    const existe_usuario = await modelUser.findOne({cpfcnpj:data.cpfcnpj})

    // Verifica se o cliente existe cadastro através do cpf
    if (existe_usuario){
        return res.status(400).json({"status":"Usuário já existe"})

    }else{
    // Salva dados dentro do banco de dados com a seguinte estrutura
    await modelUser.create({
        name:data.nome_cliente,
        cpfcnpj:data.cpfcnpj,
        email:data.email,
        senha:data.senha
    })
    return res.status(200).json({"status":"usuario criado!"})
    } 
}

module.exports = {dogla,create_user}
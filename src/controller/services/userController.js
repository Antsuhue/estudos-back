const modelUser = require('../../model/user')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)

async function loginUser(req,res) {
    const data = req.body
    const usuario_encontrado = await modelUser.findOne({cpfcnpj:data.cpfcnpj})
    
    if (usuario_encontrado){

        const verifica_senha = await bcrypt.compare(data.senha, usuario_encontrado.senha)
        
        if(verifica_senha){
            const chave = usuario_encontrado.cpfcnpj
            const token = jwt.sign({chave}, process.env.SECRET,{
                expiresIn: 3600
            })
            return res.status(200).json({status:"Login efetuado!",
        token:token})
        } 

        return res.status(400).json({status:"CPF/CNPJ ou senha incorretos!"})
    }
}

async function create_user(req,res){
    const data = req.body
    
    // Realiza consulta no banco para saber se o cliente já tem cadastro
    const existe_usuario = await modelUser.findOne({cpfcnpj:data.cpfcnpj})

    // Verifica se o cliente existe cadastro através do cpf
    if (existe_usuario){
        return res.status(400).json({"status":"Usuário já existe"})

    }else{

    const hash = bcrypt.hashSync(data.senha, salt)

    // Salva dados dentro do banco de dados com a seguinte estrutura
    await modelUser.create({
        name:data.nome_cliente,
        cpfcnpj:data.cpfcnpj,
        email:data.email,
        senha:hash
    })
    return res.status(200).json({"status":"usuario criado!"})
    } 
}

module.exports = {loginUser,create_user}
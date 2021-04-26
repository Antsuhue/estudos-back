const routes = require('express').Router()
const userController = require('./controller/services/userController')
const bankController = require('./controller/services/bankController')

routes.get("/login", userController.loginUser)

routes.get("/Menu",(req,res)=>{

    res.send("Tela de Menu")

})

routes.post("/create-user", userController.create_user)

routes.put("/deposit", bankController.depositarDinheiro)

routes.get("/balance", bankController.verificar_saldo)

routes.put("/transfer-money", bankController.transferir_dinheiro)

module.exports = routes
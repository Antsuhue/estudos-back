const routes = require('express').Router()
const userController = require('./controller/services/userController')
const bankController = require('./controller/services/bankController')

routes.get("/login", userController.loginUser)

routes.get("/Menu",(req,res)=>{

    res.send("Tela de Menu")

})

routes.post("/create-user", userController.create_user)

routes.put("/deposit", bankController.depositarDinheiro)

module.exports = routes
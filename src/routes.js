const routes = require('express').Router()
const userController = require('./controller/services/userController')

routes.get("/login", userController.dogla)

routes.get("/Menu",(req,res)=>{

    res.send("Tela de Menu")

})

routes.post("/create-user", userController.create_user)

module.exports = routes
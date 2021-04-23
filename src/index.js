const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const app = express()
const PORT = 3000

mongoose.connect('mongodb+srv://anderson:doka@tikos-project.ugnaf.gcp.mongodb.net/bank?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

dotenv.config()
process.env.SECRET;
app.use(express.json())
app.use(routes)


app.listen(PORT, () => {
    console.log(`servidor iniciado em http://localhost:${PORT}`);

})



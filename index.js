const express = require('express')
const app = express()
const connection = require("./database/connection")

const categoriesController = require('./categories/cattegoriesController')
const articlesController = require('./articles/articlesController')

//View Engine
app.set('view engine', 'ejs')

//Static
app.use(express.static('public'))

//Body Parser (Pegar informações de formulário)
app.use (express.urlencoded ({
    extended: false
}))

app.use (express.json())

//Conexão com o banco de dados
connection
    .authenticate()
    .then(() => {
        console.log('Conexão com banco de dados realizada com sucesso')
    }).catch((error) => {
    console.log('Erro na conexão com o banco de dados')
    })

//Categories Controller
app.use('/', categoriesController)

//Articless Controller
app.use('/', articlesController)

//Rotas
app.get('/', (req, res) => {
    res.render('index')
})

app.listen(8080, () => {
    console.log('O servidor está rodando')
})
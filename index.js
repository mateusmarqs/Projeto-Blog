const express = require('express')
const app = express()
const connection = require("./database/connection")

const categoriesController = require('./categories/CattegoriesController')
const articlesController = require('./articles/ArticlesController')
const Article = require('./articles/Article')
const Category = require('./categories/Category')

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

    Article.findAll().then( articles => {
        res.render('index', {articles: articles})
    })
})

app.listen(8080, () => {
    console.log('O servidor está rodando')
})
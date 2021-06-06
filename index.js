const express = require('express')
const app = express()
const connection = require("./database/connection")

const categoriesController = require('./categories/CattegoriesController')
const articlesController = require('./articles/ArticlesController')
const usersController = require('./users/UserController')

const Article = require('./articles/Article')
const Category = require('./categories/Category')
const User = require('./users/User')


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
//User Controller
app.use('/', usersController)

//Rotas
app.get('/', (req, res) => {
    Article.findAll({
        order: [
            ['id', 'DESC'],
        ],
        limit: 4
    }).then( articles => {
        Category.findAll().then(categories => {
            res.render('index', {articles: articles, categories: categories})
        })
    })
})

app.get('/:slug',(req,res) => {
    var slug = req.params.slug
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                res.render('article', {article: article, categories: categories})
            })
        } else {
            res.redirect('/')
        }
    }).catch( err => { //Caso de algum erro durante a busca
        res.redirect('/')
    })
})

app.get('/category/:slug', (req, res) => {
    var slug = req.params.slug

    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}] //Incluindo todos os artigos dessa categoria
    }).then(category => {
        if (category != undefined) {
            Category.findAll().then(categories => {
                res.render('index', {articles: category.articles, categories: categories})
            })
        } else {
            res.redirect('/')
        }
    }).catch( err => {
        res.redirect('/')
    })
})

app.listen(8080, () => {
    console.log('O servidor está rodando')
})
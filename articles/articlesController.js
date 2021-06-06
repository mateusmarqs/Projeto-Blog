const express = require('express')
const router = express.Router()
const Category = require('../categories/Category')
const slugify = require('slugify')
const Article = require('./Article')

router.get('/admin/articles', (req, res) => {
    Article.findAll({
        include: [{model: Category}] //Inclui os dados do Category através do relacionamento
    }).then( articles => {
        res.render("admin/articles/index", {articles: articles})
    })
})

router.get('/admin/articles/new', (req, res) => {
    Category.findAll().then( categories => {
        res.render('admin/articles/new', {categories: categories})
    })
})

router.post('/admin/articles/save', (req, res) => {
    var title = req.body.title
    var body = req.body.body
    var category = req.body.category

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(() => {
        res.redirect('/admin/articles')
    })
})

router.post("/admin/article/delete", (req,res) => {
    var id = req.body.id

    if (id != undefined) {
        if (!isNaN(id)) {

            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/admin/articles')
            })

        } else { //Não for um número
            res.redirect('/admin/articles')
        } 
    } else { //For nulo
        res.redirect('/admin/articles')
    }
})

router.get('/admin/articles/edit/:id', (req, res) => {
    var id = req.params.id //Parametro da URL

    if (isNaN(id)) {
        res.redirect('/admin/articles')
    }
    Article.findByPk(id).then(article => {
        if (article != undefined) {
            Category.findAll().then( categories => {
                res.render('admin/articles/edit', {article: article, categories: categories})
            })
        } else {
            res.redirect('/admin/articles')
        }
    }).catch(erro => {
        res.redirect('/admin/articles')
    })
})

router.post('/articles/update', (req, res) => {
    var id = req.body.id
    var title = req.body.title
    var body = req.body.body
    var category = req.body.category

    if (title != '') {
        Article.update({
            title: title, 
            slug: slugify(title), 
            body: body, 
            categoryId: category
        }, {
            where: {
                id: id,
            }
        }).then(() => {
            res.redirect('/admin/articles')
        }).catch(err => {
            res.redirect('/admin/articles/edit/'+id)
        })
    } else {
        res.redirect('/admin/articles/edit/'+id)
    }
})

module.exports = router
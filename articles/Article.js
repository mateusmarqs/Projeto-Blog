const sequelize = require('sequelize')
const connection = require('../database/connection')
const Category = require('../categories/Category')

const Article = connection.define('articles', {
    title: {
        type: sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: sequelize.STRING,
        allowNull: false
    },
    body: {
        type: sequelize.TEXT,
        allowNull: false
    }
})

Category.hasMany(Article) //Dizendo que uma categoria tem diversos artigos
Article.belongsTo(Category) //Dizendo que um artigo pertence a uma categoria  

Article.sync({
    force: false
})

module.exports = Article
const sequelize = require('sequelize')
const connection = require('../database/connection')

const Article = sequelize.deifne('articles', {
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

module.exports = article
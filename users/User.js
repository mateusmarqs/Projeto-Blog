const sequelize = require('sequelize')
const connection = require('../database/connection')

const User = connection.define('user', {
    email:{
        type: sequelize.STRING,
        allowNull: false
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    }
})

User.sync({
    force: false //Se True sempre que reinicar a aplicação ele vai criar a tabela, False cria apenas na primeira vez
})

module.exports = User
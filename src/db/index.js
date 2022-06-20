const Sequalize = require('sequelize');

const sequalize = new Sequalize('node_users', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
})

const Users = require('./Users')(sequalize);

module.exports = {
    sequalize,
    Users
}
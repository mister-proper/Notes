
const Sequalize = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define('users', {
        id: {
            type: Sequalize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        login: {
            type: Sequalize.STRING,
            allowNull: false
        },
        email: {
            type: Sequalize.STRING,
            allowNull: false
        },
        password: {
            type: Sequalize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    })
}
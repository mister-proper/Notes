const mysql = require('mysql');
const config = require('./config');

const connection = mysql.createConnection({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE
})



connection.connect((error) => {
    if(error){
        return console.log(error);
    }else {
        return console.log('Успех');
    }
})

module.exports = connection;
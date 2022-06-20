const http = require('http');
const mysql = require('mysql2/promise')


const db = require('../db')
const Users = db.Users;

http.createServer((req, res) => {
    if(req.url === '/save-form'){
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        })
        req.on('end', () => {
            console.log(body);
            writeToDb(body, res);
        })
    }

}).listen(3000, () => {
    console.log('Start Server')
});

function writeToDb(data, res) {
    data = JSON.parse(data, true);
    
    Users.create({
        login: data['login'],
        email: data['email'],
        password: data['password']
    })
    .then(result => {
        console.log(result);
        res.end('ok');
    })
    .catch(err => {
        console.log(err);
        res.end('error');
    })
}


async function main() {
    const conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'node_users',
        password: 'root'
    })

    const [rows, fields] = await conn.execute('SELECT * FROM users');
    return rows;
    console.log(rows);
}

export async function getLogin () {
    const arr = await main();
    return arr;
}


// const data = Users.findAll({raw:true}).then(users=>{
//     return users;
// }).catch(err=>console.log(err));

// module.exports = data;
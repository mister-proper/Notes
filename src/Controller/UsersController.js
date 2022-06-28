'use strict'
const bcrypt = require('bcrypt');
const response = require('../service/response');
const db = require('../db/index');

exports.signIn = (req, res) => {
    db.query(`SELECT * FROM users WHERE login='${req.body.login}'`, (error, rows, fields) => {
        if(error){
            response.status(404, error, res);
        }else if(rows.length <= 0){
            response.status(302, {message: 'Користувача з таким Login не знайдено. Пройдіть реєстрацію.'}, res);
        }else {
            const row = JSON.parse(JSON.stringify(rows))
            console.log(rows)
            row.map(rw => { 
                const password = bcrypt.compareSync(req.body.password, rw.password);

                if(password){
                    response.status(200, {message: 'Ви ввійшли в свій аккаунт'}, res);
                }else {
                    response.status(401, {message: 'Пароль невійрний'}, res);
                }
                return true;
            })
        }
    })
}

exports.signUp = (req, res) => {

    db.query(`SELECT * FROM users WHERE email='${req.body.email}' OR login='${req.body.login}'`, (error, rows) => {
        if(error){
            response.status(400, error, res);
        } else if(rows.length > 0){
            response.status(302, {message: 'Користувач з таким Email або Login вже зареєстрований'}, res);
        } else {
            const login = req.body.login;
            const email = req.body.email;
            const salt = bcrypt.genSaltSync(15);
            const password = bcrypt.hashSync(req.body.password, salt);

            
            const sql = `INSERT INTO users ( login, email, password) VALUES('${login}', '${email}', '${password}')`;
            db.query(sql, (error, results) => {
                if(error){
                    console.log(error);
                }else {
                    response.status(200, results, res);
                }
            })
        }
    })



}

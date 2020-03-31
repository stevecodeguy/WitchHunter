const express = require('express');
const db = require('../util/database');
const bcrypt = require('bcrypt');

const sanitize = require('../util/sanitize');

const app = express();

exports.loginAuth = (req, res) => {
    let username = sanitize(req.body.username);
    let sqlCheckPassword = `SELECT password FROM users WHERE username = '${username}';`;
    let success = 0;

    let setSuccess = new Promise((resolve, reject) => {
        if (resolve){
            success = 1;
        }
    });

    db.connections(app);

    app.locals.pool.query(sqlCheckPassword, (err, qryRes) => {
        if (err) throw err;

        if (qryRes.length === 0) {
            console.log('User not found');
        } else {
            bcrypt.compare(sanitize(req.body.password), qryRes[0].password, (err, response) => {
                if (err) throw err;
                if (response) {
                    setSuccess.then(
                        console.log('Passwords match')
                    );
                } else {
                    setSuccess.then(
                        console.log('Passwords dont match')
                    );
                } 
            })
        }
    })
    
    if (success){
        console.log('success: ', success);
        res.status(200).json({message: 'Login : ', success});
    } else {
        console.log('success: ', success);
        res.status(200).json({message: 'Login : ', success});
    }
}
const express = require('express');
const db = require('../util/database');
const bcrypt = require('bcrypt');

const sanitize = require('../util/sanitize');

const app = express();

exports.loginAuth = (req, res) => {
    let username = sanitize(req.body.username);
    let sqlCheckPassword = `SELECT password FROM users WHERE username = '${username}';`;

    let setSuccess = new Promise((resolve, reject) => {
        resolve();
    });

    db.connections(app);

    app.locals.pool.query(sqlCheckPassword, (err, qryRes) => {
        if (err) throw err;

        if (qryRes.length === 0) {
            console.log('Login failed. User not found. Username: ', username);
            res.status(401).json({message: 'Login : ', success: 0});
        } else {
            bcrypt.compare(sanitize(req.body.password), qryRes[0].password, (err, response) => {
                if (err) throw err;

                if (response) {
                    setSuccess
                        .then(() => {
                            console.log('Login successful. Username: ', username);
                            res.status(200).json({message: 'Login : ', success: 1});
                        })
                        .catch(() => {
                            console.log('Login failed. User not found. Username: ', username);
                            res.status(401).json({message: 'Login : ', success: 0});
                        })
                } else {
                    console.log('Login failed. Passwords dont match. Username: ', username);
                    res.status(401).json({message: 'Login : ', success: 0});
                } 
            })
        }
    })
}
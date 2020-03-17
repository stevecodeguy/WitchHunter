const express = require('express');
const db = require('../util/database');
const bcrypt = require('bcrypt');

const sanitize = require('../util/sanitize');

const app = express();

exports.loginAuth = (req, res) => {
    let username = sanitize(req.body.username);
    let sqlCheckPassword = `SELECT password FROM users WHERE username = '${username}';`;

    db.connections(app);

    app.locals.pool.query(sqlCheckPassword, (err, qryRes) => {
        if (err) throw err;

        bcrypt.compare(sanitize(req.body.password), qryRes[0].password, (err, response) => {
            if (err) throw err;
            if (response) {
                console.log('Passwords match');
                res.sendStatus(200);
            } else {
                console.log('Passwords dont match');
                res.sendStatus(401);
            } 
        })
    })
    
}
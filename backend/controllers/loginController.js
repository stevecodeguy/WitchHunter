const express = require('express');
const db = require('../util/database');
const bcrypt = require('bcrypt');

const app = express();

exports.loginAuth = (req, res) => {
    let sqlCheckPassword = `SELECT password FROM users WHERE username = '${req.body.username}';`;
    db.connections(app);

    app.locals.pool.query(sqlCheckPassword, (err, qryRes) => {
        if (err) throw err;

        bcrypt.compare(req.body.password, qryRes[0].password, (err, response) => {
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
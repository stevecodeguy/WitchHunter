const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../util/database');
const app = express();

const sanitize = require('../util/sanitize');

exports.createUser = (req, res, next) => {
    const saltRounds = 12;

    bcrypt.genSalt(saltRounds, (err, salt) => {

        db.connections(app);

        if (err) throw err;
        bcrypt.hash(sanitize(req.body.password), salt, (err, hash) => {
            if (err) throw err;

            let username = sanitize(req.body.username);
            let email = sanitize(req.body.email);

            let sql = `INSERT INTO users (username, password, email) VALUES ('${username}', '${hash}', '${email}');`;

            app.locals.pool.query(sql, (err) => {
                if (err) { 
                    if (err.errno === 1062) {
                        console.log('Duplicate user entry: ', username);
                    } else {
                        throw err
                    }
                } else {
                    console.log('User Created: ', username);
                }
            })
        })
    })
    res.sendStatus(200);
}
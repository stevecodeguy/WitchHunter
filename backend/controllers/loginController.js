const connection = require('../util/database');
const bcrypt = require('bcrypt');

exports.loginAuth = (req, res, next) => {
    let sql = `SELECT password FROM users WHERE username = '${req.body.username}';`;

    connection.query(sql, (err, res) => {
        if (err) throw err;

        bcrypt.compare(req.body.password, res[0].password, (err, res) => {
            if (err) throw err;
            // console.log('response: ' + res)
            if(res) {
                console.log('Passwords match');
                console.log(req.session);
            } else {
                console.log('Passwords dont match');
            } 
        })
    })
    res.sendStatus(200);
}
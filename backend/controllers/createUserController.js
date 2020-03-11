const connection = require('../util/database');
const bcrypt = require('bcrypt');

exports.createUser = (req, res, next) => {
    const saltRounds = 12;

    bcrypt.genSalt(saltRounds, (err, salt) => {

        if (err) throw err;
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;

            let username = req.body.username;
            let email = req.body.email;

            let sql = `INSERT INTO users (username, password, email) VALUES ('${username}', '${hash}', '${email}');`;

            connection.query(sql, (err) => {
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
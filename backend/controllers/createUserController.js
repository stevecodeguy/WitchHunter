const bcrypt = require('bcrypt');
const db = require('../util/database');

const sanitize = require('../util/sanitize');

exports.createUser = (req, res) => {
    const saltRounds = 12;
    
    let setSuccess = new Promise((resolve, reject) => {
        resolve();
    });

    bcrypt.genSalt(saltRounds, (err, salt) => {

        if (err) throw err;
        bcrypt.hash(sanitize(req.body.password), salt, (err, hash) => {
            if (err) throw err;

            let username = sanitize(req.body.username);
            let email = sanitize(req.body.email);

            let sql = `INSERT INTO users (username, password, email) VALUES ('${username}', '${hash}', '${email}');`;

            db.pool.query(sql, (err) => {
                if (err) { 
                    if (err.errno === 1062) {
                        console.log('Duplicate user entry: ', username);
                    } else {
                        res.status(500).json({message: 'Account creation failure.', success: 0});
                    }
                } else {
                    setSuccess.then(() => {
                        console.log('User Created: ', username);
                        res.status(200).json({message: 'User created.', success: 1});
                    });
                }
            })
        })
    })
}
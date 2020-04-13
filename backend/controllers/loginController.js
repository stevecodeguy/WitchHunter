const bcrypt = require('bcrypt');
const db = require('../util/database');
const sanitize = require('../util/sanitize');

async function setSuccess(response, username) {
    try {
        let results = {
            message: '',
            success: null
        };
        if (response){
            results = await {
                message: `Login successful. Username: ${username}`,
                success: 1
            }
        } else {
            results = await {
                message: `Login failed. User not found. Username: ${username}`,
                success: 0
            }
        }
        return results;
    } catch(error) {
        console.log(error);
    }
}

exports.loginAuth = (req, res) => {
    let username = sanitize(req.body.username);
    let sqlCheckPassword = `SELECT password FROM users WHERE username = '${username}';`;

    db.pool.query(sqlCheckPassword, (err, qryRes) => {
        if (err) throw err;

        if (qryRes.length === 0) {
            console.log('Login failed. User not found. Username: ', username);
            res.status(401).json({message: 'Login : ', success: 0});
        } else {
            bcrypt.compare(sanitize(req.body.password), qryRes[0].password, (err, response) => {
                if (err) throw err;
                setSuccess(response, username).then(loginResponse => {
                    if (loginResponse.success){
                        console.log('Success!', loginResponse.message, loginResponse.success);

                        // req.session.cookie.user = username;
                        // console.log(req.session.cookie)

                    } else {
                        console.log('Denied!', loginResponse.message, loginResponse.success);
                    }
                    res.status(200).json({message: loginResponse.message, success: loginResponse.success, user: username});

                })
                .catch(loginResponse => {
                    console.log('Error!', loginResponse.message, loginResponse.success);
                    res.status(401).json({message: loginResponse.message, success: loginResponse.success});
                })
            })
        }
    })
}
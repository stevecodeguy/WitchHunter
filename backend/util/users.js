const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('./database');
const sanitize = require('./sanitize');

const JWT_SECRET = 'This is the JWT S3cr3t!';

function checkToken(token) {
  return new Promise ((resolve, reject) => {
    let sql = `SELECT token FROM tokens WHERE token = '${token}';`;
    db.pool.query(sql, (err, qryRes) => {
      if (err) reject('No token found.');
      resolve(qryRes);
    });
  })
}

function getUserID(username) {
  return new Promise ((resolve, reject) => {
    let sql = `SELECT id FROM users WHERE username = '${username}';`;
    db.pool.query(sql, async (err, qryUserId) => {
      if (err) reject(err);;
      resolve( qryUserId[0].id );
    });
  })
}

async function saveToken(id, username) {
  let dbToken;
  try {
    let token = jwt.sign(
      {username}, 
      JWT_SECRET, 
      {expiresIn: '1h'}
    );

    dbToken = await checkToken(token);
    try {

      if (dbToken.length === 0){
        let sqlAddToken = `INSERT INTO tokens (fk_user, token) VALUES ('${id}', '${token}');`; 
        db.pool.query(sqlAddToken, (err) => {
          if (err) console.log(err);
          console.log('Added token to DB ', token);
        });
      }
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
}

//Login existing user
const login = (req, res) => {
  let username = sanitize(req.body.username);
  let sqlCheckPassword = `SELECT password, id FROM users WHERE username = '${username}';`;

  db.pool.query(sqlCheckPassword, (err, qryRes) => {
    if (err) console.log('Check Password ', err);
    if (qryRes.length === 0) {
      console.log('Login failed. User not found. Username: ', username);
      res.status(401).json({message: 'Login : ', success: 0});
    } else {
      bcrypt.compare(sanitize(req.body.password), qryRes[0].password, (err, response) => {
        if (err) console.log(err);
        let id = qryRes[0].id;
        try {
          saveToken(id, username);
        } catch (err) {
          console.log(err);
        }
      })
    }
  })
}

//Create new user
const createUser = (req, res) => {
  const SALTROUNDS = 12;
  let token;

  bcrypt.genSalt(SALTROUNDS, (err, salt) => {
    if (err) throw err;

    bcrypt.hash(sanitize(req.body.password), salt, (err, hash) => {
      if (err) throw err;
      
      let username = sanitize(req.body.username);
      let email = sanitize(req.body.email);
      
      let sql = `INSERT INTO users (username, password, email) VALUES ('${username}', '${hash}', '${email}');`;
      
      db.pool.query(sql, async (err) => {
        if (err) { 
          console.log('err ', err)
          if (err.errno === 1062) {
            console.log('Duplicate user entry: ', username);
          } else {
            res.status(500).json({message: 'Account creation failure.', success: 0});
          }
        } 

        try {
          let id = await getUserID(username);
          saveToken(id, username);
        } catch (err) {
          console.log('sdsfsfsf', err);
        }

        res.status(200).json({
          message: 'User created.', 
          success: 1,
          token: token
        });
      });
    });
  });
}

const verifyAuth = (req, res, next) => {
  console.log(req.headers);
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log('token ', token)
    if (token){
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err){
          return res.json({
            success: false,
            message: 'Token invalid.'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        success: false,
        message: 'Token not provided.'
      });
    }
  } catch(err) {
    throw err;
  }
}

exports.createUser = createUser;
exports.login = login;
exports.verifyAuth = verifyAuth;
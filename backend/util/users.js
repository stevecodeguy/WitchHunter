const jwt = require('jsonwebtoken');

const db = require('./database');

function getDBToken(id) {
  return new Promise ((resolve, reject) => {
    let sql = `SELECT token FROM tokens WHERE fk_user = '${id}';`;
    db.pool.query(sql, (err, qryRes) => {
      if (err) reject('No token found.');
      resolve(qryRes); //Return auth Tokens
    });
  })
}

function getDBUserID(username) {
  return new Promise ((resolve, reject) => {
    let sql = `SELECT id FROM users WHERE username = '${username}';`;
    db.pool.query(sql, async (err, qryUserId) => {
      if (err) reject(err);;
      resolve( qryUserId[0].id );
    });
  })
}

async function setDBToken(id, username) {
  let dbToken;
  let token = jwt.sign(
    {username}, 
    process.env.JWT_ACCESS_SECRET, 
    {expiresIn: '1h'}
  );
  try {
    dbToken = await getDBToken(id);
    if (dbToken.length > 0){
      token = dbToken[0].token;
    } else {
      try {
        if (dbToken.length === 0){
          let sqlAddToken = `INSERT INTO tokens (fk_user, token) VALUES ('${id}', '${token}');`; 
          db.pool.query(sqlAddToken, (err) => {
            if (err) console.log(err);
            console.log('Added token to DB');
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
    return new Promise((resolve, reject) => {
      resolve(token);
    })
  } catch (err) {
    console.log(err);
  }
}

const authenticateToken = (req, res, next) => {
  console.log('test', req.headers['Authorization']);
  if (req.get('Authorization')){
    console.log('GETheaders:::::: ', req.get('Authorization'));
    try {
      const token = req.get('Authorization').split(' ')[1];
      console.log('token ', token)
      if (token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
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
  next();
}

exports.authenticateToken = authenticateToken;
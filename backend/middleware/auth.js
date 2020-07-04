const jwt = require('jsonwebtoken');
const query = require('../util/queries');
const db = require('../util/database');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (token){
      req.decoded = decoded;
    } else {
      return res.json({
        success: false,
        message: 'Token not provided.'
      });
    }
    next();
  } catch(error) {
    res.status(401).send({ error: "Unable to authorize" });
  }
}

const createToken = (id) => {
  try {
    const token = jwt.sign({ id }, process.env.JWT_SECRET);
console.log(query.sqlCreateToken(id, token))
    db.pool.query(query.sqlCreateToken(id, token), async (error, result) => {
      if (error) {
        return console.log('fuckit');
      }
  
      return result[0];
    });
  } catch(error) {
    console.log('f');
  }
}

exports.auth = auth;
exports.createToken = createToken;
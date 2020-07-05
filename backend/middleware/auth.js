const jwt = require('jsonwebtoken');
const query = require('../util/queries');
const db = require('../util/database');

const checkAuth = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      db.pool.query(query.sqlDeleteTokenByToken(token), (err, result) => {
        if (err) throw err;
      });
      res.redirect('/');
    }
    return decoded;
  });

  try {
    db.pool.query(query.sqlGetToken(decoded.id, token), (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        req.userId = decoded.id;
        req.token = token;
        req.tokenId = result[0].id;
        next();
      } else {
        return res.status(404).send('Token not found');
      }
    });
  } catch(err) {
    res.status(500).send();
  }
}

const setAuthToken = async (id) => {
  const token = await jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  db.pool.query(query.sqlSetToken(id, token), (err, result) => {
    if (err) throw err;
  });

  return token;
}

exports.checkAuth = checkAuth;
exports.setAuthToken = setAuthToken;
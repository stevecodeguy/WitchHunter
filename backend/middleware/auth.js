const jwt = require('jsonwebtoken');
const app = require('../server');
const { env } = require('process');

const createJwt = async (id) => {
  const token = await jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
}

const checkAuth = (req, res, next) => {
  if(!!req.session.uuid){
    req.session.expires = req.session.expires + 1000 * 60 * 60;
    return next();
  }
  req.session.destroy();
}

exports.createJwt = createJwt;
exports.checkAuth = checkAuth;
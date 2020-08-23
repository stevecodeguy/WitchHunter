const jwt = require('jsonwebtoken');
const app = require('../server');

const createJwt = async (id) => {
  const token = await jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
}

const checkAuth = (req, res, next) => {
  console.log('SESSION REQUEST', req.session)
  if(!!req.session.uuid){
    return next();
  }
  req.session.destroy();
  // res.redirect('/login');
  res.send({uuid: null})
}

exports.createJwt = createJwt;
exports.checkAuth = checkAuth;
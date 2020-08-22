const jwt = require('jsonwebtoken');
const app = require('../server');

const createJwt = async (id) => {
  const token = await jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
}

const checkAuth = (req, res, next) => {
  // if(!!req.session.authToken || req.header('Authorization').substring(7)) {
    console.log('SESSION REQUEST', req.session)
    if(req.session.userId && !!req.session.userName){
      // console.log('SESSION', req.session)
      // return res.send(req.session)
      // res.header('Cookie', req.session)
      // return res.cookie('connect.sid', req.session)
      // return next();
      return next();
    }
  res.redirect('/login');
}

exports.createJwt = createJwt;
exports.checkAuth = checkAuth;
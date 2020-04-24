if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const db = require('./util/database');
const users = require('./util/users');
const PORT = 3000;

//Routes
const routeLogin = require('./routes/loginRoute');
const routeCreateUser = require('./routes/createUserRoute');

//Database Session
const mySQLStore = require('express-mysql-session')(session);
const sessionStore = new mySQLStore(db.options, db.pool);

const sessionOptions = {
  key: 'userkey',
  secret: 'Suff3r n0t the w!tch $hall l!ve',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  expiration: 60000,
  // secure: true   -Turn on when ready for HTTPS
}

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(session(sessionOptions));
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origins', '*');
  res.append('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
  res.append('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  next();
});

//Routes
app.use('/createuser', routeCreateUser);
app.use('/checkcredentials', users.verifyToken, routeLogin);

app.get('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})

module.exports = app;
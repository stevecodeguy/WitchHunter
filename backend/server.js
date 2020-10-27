if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const https = require('https');
const express = require('express');
const app = express();
const cors = require('cors');

//Routes
const routeUser = require('./routes/user');
const routeCharacters = require('./routes/characters');
const routeInfo = require('./routes/info');

//Utilities
const db = require('./util/database');
const PORT = 3000;

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const sessionStore = new MySQLStore(db.options);

//Middleware
app.use(cors({
  credentials:true,
  origin:'http://localhost:6060'
}));
app.use(express.json());
app.use(session({
  store: sessionStore,
  secret: 'session_cookie_secret',
  resave: false,
  rolling: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,
    sameSite: true
  }
}));

//Routes
app.use('/user', routeUser);
app.use('/characters', routeCharacters);
app.use('/info', routeInfo);


app.get('*', (req, res) => {
  res.status(404).send();
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
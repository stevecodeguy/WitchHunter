const express = require('express');
const app = express();
const mysql = require('mysql');
const session = require('express-session');
const mysqlStore = require('express-mysql-session')(session);

const options = {
  host: 'localhost',
  port: 3306,
  user: 'wh_admin',
  password: 'W1tchhunt3r$',
  database: 'witchhunter'
}

const pool = mysql.createPool(options);
const sessionStore = new mysqlStore(options, pool);

app.use(
  session({
    key: 'userkey',
    secret: 'Suff3r n0t the w!tch $hall l!ve',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    expiration: 60000,
  })
)

pool.getConnection((err) => {
  if (err) throw err;
  console.log('Connected to DB...');
})

module.exports = {
  connections : (app) => {
    app.locals.pool = pool,
    app.locals.sessionStore = sessionStore
  }
}
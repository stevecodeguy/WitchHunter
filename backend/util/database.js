const express = require('express');
const app = express();
const mysql = require('mysql2');
const session = require('express-session');
const mysqlSession = require('express-mysql-session')(session);

// const connection = mysql.createConnection({
const options = {
  host: 'localhost',
  port: 3306,
  user: 'wh_admin',
  password: 'W1tchhunt3r$',
  database: 'witchhunter'
}
// ----------------
const pool = mysql.createPool(options);

let sessionStore = new mysqlSession(options);

app.use(
  session({
    key: 'userkey',
    secret: 'Suff3r n0t the w!tch $hall l!ve',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
)
//USE LOCALS!

pool.getConnection((err) => {
  if (err) throw err;
  console.log('Connected to DB...');
})

module.exports = pool;
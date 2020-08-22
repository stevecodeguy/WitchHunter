const mysql = require('mysql');

const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,

}

const pool = mysql.createPool(options);

pool.getConnection((err) => {
  if (err) throw err;
  console.log('Connected to DB...');
}); 

exports.pool = pool;
exports.options = options;
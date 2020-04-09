const mysql = require('mysql');

const options = {
  host: 'localhost',
  port: 3306,
  user: 'wh_admin',
  password: 'W1tchhunt3r$',
  database: 'witchhunter'
}

const pool = mysql.createPool(options);

pool.getConnection((err) => {
  if (err) throw err;
  console.log('Connected to DB...');
}); 

exports.pool = pool;
exports.options = options;
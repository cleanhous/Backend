const mysql = require('mysql2/promise');
require('dotenv').config()
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USERDB,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  timezone: 'Z'

})

module.exports = pool;

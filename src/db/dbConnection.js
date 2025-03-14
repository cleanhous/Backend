const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: "junction.proxy.rlwy.net",
  user: "root",
  password: "fkHmkhldgEmTYBISBTKkxXrHAdMOnBAH",
  database: "cleanhouse",
  port: 17921,
  timezone: 'Z'
});

(async () => {
  try {
   
    const connection = await pool.getConnection()
    console.log('Conexão bem-sucedida com o banco de dados!')
    connection.release()
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error)
  }
})();

module.exports = pool;

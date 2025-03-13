const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "cleanhouse",
  port: 3306,
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

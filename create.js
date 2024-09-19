// migrations/create_tables.js
const connection = require('./connection');
console.log('  entrou aqui      dd')

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100)
    
  );
`;
console.log("           entrou no segundo estagio")
connection.query(createUsersTable, (err, results) => {
  if (err) {
    console.error('Erro ao criar tabela users:', err);
  } else {
    console.log('Tabela users criada com sucesso');
  }
  connection.end();
});

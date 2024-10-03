const { Console } = require('console');
const mysql = require('mysql2');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });




const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERDB,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});


const createClientesTable = `
  CREATE TABLE IF NOT EXISTS clientes (
    id CHAR(36) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(14) NOT NULL,
    nota DECIMAL(4,2),
    UF VARCHAR(2),
    cidade VARCHAR(45),
    cep VARCHAR(9),
    logradouro VARCHAR(60),
    numero VARCHAR(10),
    complemento VARCHAR(30),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );
`;

const createCategoriasTable = `
  CREATE TABLE IF NOT EXISTS categorias (
    id CHAR(36) PRIMARY KEY,
    titulo VARCHAR(60)
  );
`;

const createPrestadoresTable = `
  CREATE TABLE IF NOT EXISTS prestadores (
    id CHAR(36) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(14) NOT NULL,
    nota DECIMAL(4,2),
    UF VARCHAR(2),
    cidade VARCHAR(45),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    id_categoria CHAR(36),
    CONSTRAINT fk_id_categoria FOREIGN KEY (id_categoria) REFERENCES categorias(id) ON DELETE SET NULL
  );
`;

// Executar as queries separadamente
connection.query(createClientesTable, (err, results) => {
  if (err) {
    console.error('Erro ao criar a tabela clientes:', err);
  } else {
    console.log('Tabela clientes criada com sucesso');
  }
});

connection.query(createCategoriasTable, (err, results) => {
  if (err) {
    console.error('Erro ao criar a tabela categorias:', err);
  } else {
    console.log('Tabela categorias criada com sucesso');
  }
});

connection.query(createPrestadoresTable, (err, results) => {
  if (err) {
    console.error('Erro ao criar a tabela prestadores:', err);
  } else {
    console.log('Tabela prestadores criada com sucesso');
  }

  // Encerrar a conexão
  connection.end();
});



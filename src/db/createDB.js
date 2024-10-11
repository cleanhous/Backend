const mysql = require('mysql2');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') })

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
 CREATE TABLE prestadores(
	id CHAR(36) PRIMARY KEY,
	nome VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	cpf VARCHAR(14) NOT NULL,
	senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(14) NOT NULL,
	nota DECIMAL(3, 2) DEFAULT 5.00,
    UF VARCHAR(2),
    cidade VARCHAR(45),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    id_especialidade CHAR(36),
	CONSTRAINT fk_id_especialidade FOREIGN KEY (id_especialidade) REFERENCES especialidades(id)
);
`

const createEspecialidadesTable = `
create table especialidades(
	id char(36) primary key,
    titulo varchar(60),
    descricao varchar(255),
    preco decimal (7,3),
     id_servico CHAR(36),
	CONSTRAINT fk_id_servico FOREIGN KEY (id_servico) REFERENCES servicos(id)
);
`

// --------------------------------------------------------------------------------------

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema cleanhouse
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema cleanhouse
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cleanhouse` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `cleanhouse` ;

-- -----------------------------------------------------
-- Table `cleanhouse`.`clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cleanhouse`.`clientes` (
  `id` CHAR(36) NOT NULL,
  `nome` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `cpf` VARCHAR(14) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `telefone` VARCHAR(14) NOT NULL,
  `nota` DECIMAL(3,2) NULL DEFAULT NULL,
  `UF` VARCHAR(2) NULL DEFAULT NULL,
  `cidade` VARCHAR(45) NULL DEFAULT NULL,
  `cep` VARCHAR(9) NULL DEFAULT NULL,
  `logradouro` VARCHAR(60) NULL DEFAULT NULL,
  `numero` VARCHAR(10) NULL DEFAULT NULL,
  `complemento` VARCHAR(30) NULL DEFAULT NULL,
  `createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `cleanhouse`.`contratos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cleanhouse`.`contratos` (
  `id` CHAR(36) NOT NULL,
  `id_cliente` CHAR(36) NULL DEFAULT NULL,
  `id_prestador` CHAR(36) NULL DEFAULT NULL,
  `data_inicio` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `data_fim` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `observacao` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `cleanhouse`.`servicos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cleanhouse`.`servicos` (
  `id` CHAR(36) NOT NULL,
  `titulo` VARCHAR(60) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `cleanhouse`.`especialidades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cleanhouse`.`especialidades` (
  `id` CHAR(36) NOT NULL,
  `titulo` VARCHAR(60) NULL DEFAULT NULL,
  `descricao` VARCHAR(255) NULL DEFAULT NULL,
  `preco` DECIMAL(7,3) NULL DEFAULT NULL,
  `id_servico` CHAR(36) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_id_servico` (`id_servico` ASC) VISIBLE,
  CONSTRAINT `fk_id_servico`
    FOREIGN KEY (`id_servico`)
    REFERENCES `cleanhouse`.`servicos` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `cleanhouse`.`prestadores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cleanhouse`.`prestadores` (
  `id` CHAR(36) NOT NULL,
  `nome` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `cpf` VARCHAR(14) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `telefone` VARCHAR(14) NOT NULL,
  `nota` DECIMAL(3,2) NULL DEFAULT NULL,
  `UF` VARCHAR(2) NULL DEFAULT NULL,
  `cidade` VARCHAR(45) NULL DEFAULT NULL,
  `createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_especialidade` CHAR(36) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_id_especialidade` (`id_especialidade` ASC) VISIBLE,
  CONSTRAINT `fk_id_especialidade`
    FOREIGN KEY (`id_especialidade`)
    REFERENCES `cleanhouse`.`especialidades` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


// --------------------------------------------------------------------------------------


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



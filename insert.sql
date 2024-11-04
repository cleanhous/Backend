
use cleanhouse;
-- describe cleanhouse.prestadores 
INSERT INTO servicos (titulo) VALUES
('eletricista'),
('encanador'),
('diarista'),
('assistenciatecnica'),
('pintor'),
('chaveiro'),
('empreiteiro'),
('arquiteto'),
('cozinheiro');

-- Especialidades para Eletricista (servico_id = 1)
INSERT INTO especialidades (titulo, descricao, preco, servico_id) VALUES
('Instalação de Tomadas', 'Instalação de tomadas e interruptores', 150.00, 1),
('Reparo de Fiação', 'Serviço de reparo e substituição de fiação elétrica', 200.00, 1);

-- Especialidades para Encanador (servico_id = 2)
INSERT INTO especialidades (titulo, descricao, preco, servico_id) VALUES
('Desentupimento de Pia', 'Desentupimento de pias e ralos', 120.00, 2),
('Instalação de Torneiras', 'Instalação de torneiras e sifões', 90.00, 2);

-- Especialidades para Diarista (servico_id = 3)
INSERT INTO especialidades (titulo, descricao, preco, servico_id) VALUES
('Limpeza Residencial', 'Limpeza completa de residências', 180.00, 3),
('Limpeza de Escritórios', 'Limpeza de salas comerciais e escritórios', 200.00, 3);

-- Especialidades para Assistência Técnica (servico_id = 4)
INSERT INTO especialidades (titulo, descricao, preco, servico_id) VALUES
('Conserto de Geladeira', 'Reparo e manutenção de geladeiras', 300.00, 4),
('Conserto de Máquina de Lavar', 'Serviço de conserto e manutenção de máquinas de lavar', 250.00, 4);

-- Especialidades para Pintor (servico_id = 5)
INSERT INTO especialidades (titulo, descricao, preco, servico_id) VALUES
('Pintura de Paredes Internas', 'Pintura de ambientes internos', 500.00, 5),
('Pintura Externa', 'Pintura de fachadas e áreas externas', 800.00, 5);

-- Especialidades para Chaveiro (servico_id = 6)
INSERT INTO especialidades (titulo, descricao, preco, servico_id) VALUES
('Troca de Fechadura', 'Substituição de fechaduras e chaves', 150.00, 6),
('Abertura de Portas', 'Abertura de portas em casos de perda de chave', 100.00, 6);

-- Especialidades para Empreiteiro (servico_id = 7)
INSERT INTO especialidades (titulo, descricao, preco, servico_id) VALUES
('Reforma Completa', 'Reforma completa de imóveis', 5000.00, 7),
('Construção de Muros', 'Construção de muros e divisórias', 1500.00, 7);

-- Especialidades para Arquiteto (servico_id = 8)
INSERT INTO especialidades (titulo, descricao, preco, servico_id) VALUES
('Projeto Residencial', 'Desenvolvimento de projetos para residências', 2000.00, 8),
('Projeto Comercial', 'Desenvolvimento de projetos para estabelecimentos comerciais', 2500.00, 8);

-- Especialidades para Cozinheiro (servico_id = 9)
INSERT INTO especialidades (titulo, descricao, preco, servico_id) VALUES
('Buffet para Eventos', 'Preparação de buffet para eventos e festas', 1500.00, 9),
('Chef em Casa', 'Serviço de chef particular para eventos menores', 1000.00, 9);


-- Prestadores para Eletricista
INSERT INTO prestadores (id, nome, email, cpf, senha, telefone, especialidade_id) VALUES
(UUID(), 'Carlos Silva', 'carlos.eletricista@example.com', '123.456.789-01', 'senha123', '(11)99999-0001', 1),
(UUID(), 'Mariana Ferreira', 'mariana.eletricista@example.com', '123.456.789-02', 'senha123', '(11)99999-0002', 2);

-- Prestadores para Encanador
INSERT INTO prestadores (id, nome, email, cpf, senha, telefone, especialidade_id) VALUES
(UUID(), 'João Santos', 'joao.encanador@example.com', '123.456.789-03', 'senha123', '(11)99999-0003', 3),
(UUID(), 'Ana Mendes', 'ana.encanador@example.com', '123.456.789-04', 'senha123', '(11)99999-0004', 4);

-- Prestadores para Diarista
INSERT INTO prestadores (id, nome, email, cpf, senha, telefone, especialidade_id) VALUES
(UUID(), 'Roberta Costa', 'roberta.diarista@example.com', '123.456.789-05', 'senha123', '(11)99999-0005', 5),
(UUID(), 'Cláudia Lima', 'claudia.diarista@example.com', '123.456.789-06', 'senha123', '(11)99999-0006', 6);

-- Prestadores para Assistência Técnica
INSERT INTO prestadores (id, nome, email, cpf, senha, telefone, especialidade_id) VALUES
(UUID(), 'Ricardo Moura', 'ricardo.assistencia@example.com', '123.456.789-07', 'senha123', '(11)99999-0007', 7),
(UUID(), 'Larissa Souza', 'larissa.assistencia@example.com', '123.456.789-08', 'senha123', '(11)99999-0008', 8);

-- Prestadores para Pintor
INSERT INTO prestadores (id, nome, email, cpf, senha, telefone, especialidade_id) VALUES
(UUID(), 'Gabriel Rocha', 'gabriel.pintor@example.com', '123.456.789-09', 'senha123', '(11)99999-0009', 9),
(UUID(), 'Beatriz Oliveira', 'beatriz.pintor@example.com', '123.456.789-10', 'senha123', '(11)99999-0010', 10);

-- Prestadores para Chaveiro
INSERT INTO prestadores (id, nome, email, cpf, senha, telefone, especialidade_id) VALUES
(UUID(), 'Fernando Martins', 'fernando.chaveiro@example.com', '123.456.789-11', 'senha123', '(11)99999-0011', 11),
(UUID(), 'Paula Teixeira', 'paula.chaveiro@example.com', '123.456.789-12', 'senha123', '(11)99999-0012', 12);

-- Prestadores para Empreiteiro
INSERT INTO prestadores (id, nome, email, cpf, senha, telefone, especialidade_id) VALUES
(UUID(), 'Rodrigo Lima', 'rodrigo.empreiteiro@example.com', '123.456.789-13', 'senha123', '(11)99999-0013', 13),
(UUID(), 'Vera Ramos', 'vera.empreiteiro@example.com', '123.456.789-14', 'senha123', '(11)99999-0014', 14);

-- Prestadores para Arquiteto
INSERT INTO prestadores (id, nome, email, cpf, senha, telefone, especialidade_id) VALUES
(UUID(), 'Helena Duarte', 'helena.arquiteto@example.com', '123.456.789-15', 'senha123', '(11)99999-0015', 15),
(UUID(), 'Pedro Ramos', 'pedro.arquiteto@example.com', '123.456.789-16', 'senha123', '(11)99999-0016', 16);

-- Prestadores para Cozinheiro
INSERT INTO prestadores (id, nome, email, cpf, senha, telefone, especialidade_id) VALUES
(UUID(), 'Juliana Costa', 'juliana.cozinheiro@example.com', '123.456.789-17', 'senha123', '(11)99999-0017', 17),
(UUID(), 'Bruno Almeida', 'bruno.cozinheiro@example.com', '123.456.789-18', 'senha123', '(11)99999-0018', 18);
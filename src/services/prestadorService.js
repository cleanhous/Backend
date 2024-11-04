const db = require("../db/dbConnection")
const moment = require('moment')

class PrestadorService{

    async createPrestador({ id, nome, email, cpf, senha, telefone, nota, especialidade_id }) {
        const query = `
            INSERT INTO prestadores (id, nome, email, cpf, senha, telefone, nota, especialidade_id, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        `;

        try {
            await db.query(query, [id, nome, email, cpf, senha, telefone, nota, especialidade_id]);
            return { message: "Prestador criado com sucesso" };
        } catch (error) {
            throw new Error("Erro ao inserir um novo prestador 00 : " + error.message);
        }
    }

    async  getAllPrestadores() {
        const query = `
        SELECT p.nome, p.nota, e.titulo, e.descricao, e.preco 
        FROM prestadores p
        JOIN especialidades e ON e.id = p.especialidade_id
        JOIN servicos s ON s.id = e.servico_id  `;
    
        try {
            const [rows] = await db.query(query);
            return rows;
          } catch (error) {
            throw new Error("Erro ao buscar todos prestadores: " + error.message);
          }
    }


    async buscaPrestadores(servico) {
        const query = `
            SELECT p.id, p.nome, p.nota, e.titulo, e.descricao, e.preco 
            FROM prestadores p
            INNER JOIN especialidades e ON e.id = p.especialidade_id
            INNER JOIN servicos s ON s.id = e.servico_id 
            WHERE s.titulo = ?
        `;
        
        const [rows] = await db.query(query, [servico]);
        return rows;
    }

    async obterPrestadoresDisponiveis(dataInicio, dataFim, servico) {
        try {
            console.log(dataInicio)
            console.log(dataFim)
            const dataInicioFormatted = moment(dataInicio).format('YYYY-MM-DD HH:mm:ss');
            const dataFimFormatted = moment(dataFim).format('YYYY-MM-DD HH:mm:ss'); 
    
            const [rows] = await db.query(`
                SELECT p.id, p.nome, p.nota, e.titulo, e.descricao, e.preco
                FROM prestadores p
                INNER JOIN especialidades e ON e.id = p.especialidade_id
                INNER JOIN servicos s ON s.id = e.servico_id
                WHERE s.titulo = ?
                AND NOT EXISTS (
                    SELECT 1 
                    FROM contratos c
                    WHERE c.prestador_id = p.id
                    AND (
                        (c.data_inicio <= ? AND c.data_fim >= ?)
                        OR
                        (c.data_inicio <= ? AND c.data_fim >= ?)
                        OR
                        (? <= c.data_inicio AND ? >= c.data_fim)
                    )
                );

            `, [
            servico,dataInicioFormatted, dataInicioFormatted,dataFimFormatted, dataFimFormatted, dataInicioFormatted, dataFimFormatted
            ]);
    
            return rows;
        } catch (error) {
            throw new Error(error);
        }
    }

}

module.exports = PrestadorService

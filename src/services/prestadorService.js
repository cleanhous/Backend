const db = require("../db/dbConnection")
const moment = require('moment')
const { v4: uuidv4 } = require('uuid');

class PrestadorService{

    async createPrestador({nome, email, cpf, senha, telefone, nota, especialidade_id }) {
        
        const id = uuidv4();
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
    async deletePrestador(id) {
        const query = `DELETE FROM prestadores WHERE id = ?`;

        try {
            const [result] = await db.query(query, [id]);

            if (result.affectedRows === 0) {
                throw new Error("Prestador não encontrado");
            }

            return { message: "Prestador excluído com sucesso" };
        } catch (error) {
            throw new Error("Erro ao excluir o prestador: " + error.message);
        }
    }

    async  getAllPrestadores() {
        const query = 
            `SELECT 
            p.id AS prestador_id,
            p.nome AS prestador_nome,
            p.email AS prestador_email,
            p.telefone AS prestador_telefone,
            p.nota AS prestador_nota,
            e.id AS especialidade_id,
            e.titulo AS especialidade_titulo,
            e.descricao AS especialidade_descricao,
            e.preco AS especialidade_preco,
            s.id AS servico_id,
            s.titulo AS servico_titulo
        FROM prestadores p
        JOIN especialidades e ON e.id = p.especialidade_id
        JOIN servicos s ON s.id = e.servico_id
    `;
    
        try {
            const [rows] = await db.query(query);
            return rows;
          } catch (error) {
            throw new Error("Erro ao buscar todos prestadores: " + error.message);
          }
    }
    async updatePrestador(id, { email, telefone, especialidade_id }) {
        const query = `
            UPDATE prestadores
            SET email = ?, telefone = ?, especialidade_id = ?, updatedAt = CURRENT_TIMESTAMP
            WHERE id = ?
        `;

        try {
            const [result] = await db.query(query, [email, telefone, especialidade_id, id]);

            if (result.affectedRows === 0) {
                throw new Error("Prestador não encontrado");
            }

            return { message: "Prestador atualizado com sucesso" };
        } catch (error) {
            throw new Error("Erro ao atualizar o prestador: " + error.message);
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

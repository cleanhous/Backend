const db = require("../db/dbConnection")
const moment = require('moment')

class PrestadorService{
    async buscaPrestadores(especialidade) {
        const query = `
            SELECT p.id, p.nome, p.nota, e.titulo, e.descricao, e.preco 
            FROM prestadores p
            INNER JOIN especialidades e ON e.id = p.especialidade_id
            INNER JOIN servicos s ON s.id = e.servico_id 
            WHERE s.titulo = ?
        `;
        
        const [rows] = await db.query(query, [especialidade]);
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
                WHERE s.titulo = 'eletricista'
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
                dataInicioFormatted, dataInicioFormatted, 
                dataFimFormatted, dataFimFormatted, 
                dataInicioFormatted, dataFimFormatted
            ]);
    
            return rows;
        } catch (error) {
            throw new Error(error);
        }
    }

}

module.exports = PrestadorService

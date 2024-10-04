const db = require('../db/dbConnection');

class contratoService {
    static async obterDatasOcupadas(prestadorId) {
        try {
            const [rows] = await pool.query(`
                SELECT data_inicio, data_fim FROM contratos 
                WHERE prestador_id = ?`, 
                [prestadorId]
            );

            return rows.map(row => ({
                inicio: row.data_inicio,
                fim: row.data_fim
            }));
        } catch (error) {
            throw new Error('Erro ao buscar datas ocupadas.');
        }
    }

    static async verificarDisponibilidade(prestadorId, dataInicio, dataFim) {
        try {
            const [rows] = await pool.query(`
                SELECT COUNT(*) as total FROM contratos 
                WHERE prestador_id = ? 
                AND (? BETWEEN data_inicio AND data_fim 
                OR ? BETWEEN data_inicio AND data_fim)
            `, [prestadorId, dataInicio, dataFim]);

            return rows[0].total === 0;
        } catch (error) {
            throw new Error('Erro ao verificar disponibilidade.');
        }
    }

    static async criarContrato(clienteId, prestadorId, dataInicio, dataFim) {
        const disponivel = await this.verificarDisponibilidade(prestadorId, dataInicio, dataFim);

        if (!disponivel) {
            throw new Error('Prestador indisponível para estas datas.');
        }

        try {
            // Inserir o contrato no banco de dados
            const [result] = await pool.query(`
                INSERT INTO contratos (cliente_id, prestador_id, data_inicio, data_fim, status)
                VALUES (?, ?, ?, ?, 'Confirmado')
            `, [clienteId, prestadorId, dataInicio, dataFim]);

            return { id: result.insertId, clienteId, prestadorId, dataInicio, dataFim, status: 'Confirmado' };
        } catch (error) {
            throw new Error('Erro ao criar contrato.');
        }
    }
}

module.exports = contratoService;
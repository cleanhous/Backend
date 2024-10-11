const moment = require('moment')
const db = require('../db/dbConnection')
const uuid = require('uuid')

class contratoService {
    static async obterDatasOcupadas(prestadorId) {
        try {
            const [rows] = await db.query(`
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
            const [rows] = await db.query(`
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

    async criarContrato(clienteId, prestadorId, dataInicio, dataFim, observacao) {
        try {
            const dataInicioFormatted = moment(dataInicio).format('YYYY-MM-DD HH:mm:ss');
            const dataFimFormatted = moment(dataFim).format('YYYY-MM-DD HH:mm:ss');
            // Insere o contrato no banco de dados
            const [result] = await db.query(`
                INSERT INTO contratos (id, id_cliente, id_prestador, data_inicio, data_fim, observacao)
                VALUES (?, ?, ?, ?, ?, ?)
            `, [uuid.v4(), clienteId, prestadorId, dataInicioFormatted, dataFimFormatted, observacao]);
            console.log('Prestador ID recebido:', prestadorId);
            return result
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = contratoService;
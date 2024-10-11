const moment = require('moment')
const db = require('../db/dbConnection')
const uuid = require('uuid')

class contratoService {

    async obterDatasOcupadas(prestadorId) {
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
    
    async verificarDisponibilidade(prestadorId, dataInicio, dataFim) {
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
    
            // Verifica se há sobreposição de datas para o prestador
            const [rows] = await db.query(`
                SELECT data_inicio, data_fim 
                FROM contratos 
                WHERE id_prestador = ?
                AND (
                    (data_inicio <= ? AND data_fim >= ?) -- Se a nova data de início estiver dentro de outro contrato
                    OR
                    (data_inicio <= ? AND data_fim >= ?) -- Se a nova data de fim estiver dentro de outro contrato
                    OR
                    (? <= data_inicio AND ? >= data_fim) -- Se o novo intervalo cobrir completamente o outro contrato
                )
            `, [prestadorId, dataInicioFormatted, dataInicioFormatted, dataFimFormatted, dataFimFormatted, dataInicioFormatted, dataFimFormatted]);
        
            if (rows.length > 0) {
                throw new Error('As datas informadas entram em conflito com outro contrato existente.');
            }
    
            const [result] = await db.query(`
                INSERT INTO contratos (id, id_cliente, id_prestador, data_inicio, data_fim, observacao)
                VALUES (?, ?, ?, ?, ?, ?)
            `, [uuid.v4(), clienteId, prestadorId, dataInicioFormatted, dataFimFormatted, observacao]);
    
            return result;
    
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    async buscaContratoClientes(clienteId) {
        try {
          const [result] = await db.query(`
            SELECT p.nome, c.data_inicio, c.data_fim, c.observacao 
            FROM contratos c
            INNER JOIN prestadores p ON p.id = c.id_prestador
            WHERE c.id_cliente = ?
          `, [clienteId])
          return result

        } catch (error) {
          throw new Error(error.message);
        }
      }
}

module.exports = contratoService;
const db = require('../db/dbConnection');

class contratoService {

    async obterDatasOcupadas(prestadorId) {
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
    
    async verificarDisponibilidade(prestadorId, dataInicio, dataFim) {
        try {
            const [rows] = await pool.query(`
                SELECT COUNT(*) as total FROM contratos 
                WHERE prestador_id = ? 
                AND (
                    (data_inicio <= ? AND data_fim >= ?) OR
                    (data_inicio <= ? AND data_fim >= ?) OR
                    (? <= data_inicio AND ? >= data_fim)
                )
            `, [prestadorId, dataFim, dataInicio, dataFim, dataInicio, dataInicio, dataFim]);
    
            return rows[0].total === 0; // Se o total for 0, o prestador está disponível
        } catch (error) {
            throw new Error('Erro ao verificar disponibilidade.');
        }
    }

    async criarContrato(clienteId, prestadorId, dataInicio, dataFim, observacao) {
        try {
            
            const dataInicioFormatted = moment(dataInicio).format('YYYY-MM-DD HH:mm:ss');
            const dataFimFormatted = moment(dataFim).format('YYYY-MM-DD HH:mm:ss');
    
            
            const disponivel = await contratoService.verificarDisponibilidade(prestadorId, dataInicioFormatted, dataFimFormatted);
            if (!disponivel) {
                throw new Error('O prestador já possui um contrato nas datas solicitadas.');
            }
    
            
            const [result] = await db.query(`
                INSERT INTO contratos (id, id_cliente, id_prestador, data_inicio, data_fim, observacao)
                VALUES (?, ?, ?, ?, ?, ?)
            `, [uuid.v4(), clienteId, prestadorId, dataInicioFormatted, dataFimFormatted, observacao]);
    
            return result;
        } catch (error) {
            throw new Error('Erro ao criar contrato.');
        }
    }

    async buscaContratoClientes(clienteId) {
        try {
          const [result] = await db.query(`
            SELECT p.nome, c.data_inicio, c.data_fim, c.observacao 
            FROM contratos c
            INNER JOIN prestadores p ON p.id = c.id_prestador
            WHERE c.id_cliente = ?
          `, [clienteId]); 
          return result;
        } catch (error) {
          throw new Error(error.message);
        }
      }
}

module.exports = contratoService;
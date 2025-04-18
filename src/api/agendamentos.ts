
import { db } from '../../database.cjs';

export const getAgendamentos = (req: any, res: any) => {
  db.all(`
    SELECT a.*, c.nome as cliente_nome, b.nome as barbeiro_nome, s.nome as servico_nome
    FROM agendamentos a
    LEFT JOIN clientes c ON a.cliente_id = c.id
    LEFT JOIN barbeiros b ON a.barbeiro_id = b.id
    LEFT JOIN servicos s ON a.servico_id = s.id
  `, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
};

export const addAgendamento = (req: any, res: any) => {
  const { cliente_id, barbeiro_id, servico_id, data, hora } = req.body;
  db.run(
    'INSERT INTO agendamentos (cliente_id, barbeiro_id, servico_id, data, hora) VALUES (?, ?, ?, ?, ?)',
    [cliente_id, barbeiro_id, servico_id, data, hora],
    function(err: any) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
};

export const updateAgendamento = (req: any, res: any) => {
  const { id, status } = req.body;
  db.run(
    'UPDATE agendamentos SET status = ? WHERE id = ?',
    [status, id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ success: true });
    }
  );
};

export const deleteAgendamento = (req: any, res: any) => {
  const { id } = req.params;
  db.run('DELETE FROM agendamentos WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ success: true });
  });
};

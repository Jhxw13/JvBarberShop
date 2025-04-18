
import { db } from '../../database.cjs';

export const getBarbeiros = (req: any, res: any) => {
  db.all('SELECT * FROM barbeiros', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
};

export const addBarbeiro = (req: any, res: any) => {
  const { nome, especialidade, foto } = req.body;
  db.run(
    'INSERT INTO barbeiros (nome, especialidade, foto) VALUES (?, ?, ?)',
    [nome, especialidade, foto],
    function(err: any) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
};

export const updateBarbeiro = (req: any, res: any) => {
  const { id, nome, especialidade, disponivel, foto } = req.body;
  db.run(
    'UPDATE barbeiros SET nome = ?, especialidade = ?, disponivel = ?, foto = ? WHERE id = ?',
    [nome, especialidade, disponivel, foto, id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ success: true });
    }
  );
};

export const deleteBarbeiro = (req: any, res: any) => {
  const { id } = req.params;
  db.run('DELETE FROM barbeiros WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ success: true });
  });
};

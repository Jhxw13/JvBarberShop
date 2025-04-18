
import { db } from '../../database.cjs';

export const getServicos = (req: any, res: any) => {
  db.all('SELECT * FROM servicos', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
};

export const addServico = (req: any, res: any) => {
  const { nome, preco, descricao } = req.body;
  db.run(
    'INSERT INTO servicos (nome, preco, descricao) VALUES (?, ?, ?)',
    [nome, preco, descricao],
    function(err: any) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
};

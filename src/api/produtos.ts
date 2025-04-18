
import { db } from '../../database.cjs';

export const getProdutos = (req: any, res: any) => {
  db.all('SELECT * FROM produtos', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
};

export const addProduto = (req: any, res: any) => {
  const { nome, preco, estoque, categoria, foto } = req.body;
  db.run(
    'INSERT INTO produtos (nome, preco, estoque, categoria, foto) VALUES (?, ?, ?, ?, ?)',
    [nome, preco, estoque, categoria, foto],
    function(err: any) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
};

export const updateProduto = (req: any, res: any) => {
  const { id, nome, preco, estoque, categoria, foto } = req.body;
  db.run(
    'UPDATE produtos SET nome = ?, preco = ?, estoque = ?, categoria = ?, foto = ? WHERE id = ?',
    [nome, preco, estoque, categoria, foto, id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ success: true });
    }
  );
};

export const deleteProduto = (req: any, res: any) => {
  const { id } = req.params;
  db.run('DELETE FROM produtos WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ success: true });
  });
};

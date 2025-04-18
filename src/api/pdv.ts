
import { db } from '../../database.cjs';

export const createSale = (req: any, res: any) => {
  const { items, total, data } = req.body;
  
  db.run(
    'INSERT INTO vendas (data, total) VALUES (?, ?)',
    [data, total],
    function(err: any) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      const vendaId = this.lastID;
      
      // Inserir itens da venda
      const stmt = db.prepare('INSERT INTO itens_venda (venda_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?)');
      
      items.forEach((item: any) => {
        stmt.run([vendaId, item.id, 1, item.preco]);
      });
      
      stmt.finalize();
      
      res.json({ id: vendaId });
    }
  );
};

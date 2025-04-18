
import { db } from '../../database.cjs';

export const createVenda = (req: any, res: any) => {
  const { items, total, cliente_id, barbeiro_id, tipo } = req.body;
  
  db.run(
    'INSERT INTO vendas (total, tipo, cliente_id, barbeiro_id) VALUES (?, ?, ?, ?)',
    [total, tipo, cliente_id, barbeiro_id],
    function(err: any) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      const vendaId = this.lastID;
      
      // Inserir itens da venda
      const stmt = db.prepare(
        'INSERT INTO itens_venda (venda_id, produto_id, servico_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?, ?)'
      );
      
      items.forEach((item: any) => {
        stmt.run([
          vendaId,
          item.tipo === 'produto' ? item.id : null,
          item.tipo === 'servico' ? item.id : null,
          item.quantidade,
          item.preco
        ]);
      });
      
      stmt.finalize();
      
      // Registrar no financeiro
      db.run(
        'INSERT INTO financeiro (tipo, descricao, valor, categoria, venda_id) VALUES (?, ?, ?, ?, ?)',
        ['entrada', 'Venda PDV', total, tipo, vendaId]
      );
      
      res.json({ id: vendaId });
    }
  );
};

export const getVendas = (req: any, res: any) => {
  db.all(`
    SELECT v.*, c.nome as cliente_nome, b.nome as barbeiro_nome
    FROM vendas v
    LEFT JOIN clientes c ON v.cliente_id = c.id
    LEFT JOIN barbeiros b ON v.barbeiro_id = b.id
  `, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
};

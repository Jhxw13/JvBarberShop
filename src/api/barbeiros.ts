
import { db } from '../../database.cjs';

// Buscar todos os barbeiros
export const getBarbeiros = (req: any, res: any) => {
  db.all(`
    SELECT id, nome, especialidade, avaliacao, 
           clientes_atendidos, disponivel, foto 
    FROM barbeiros
    ORDER BY nome
  `, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
};

// Buscar um barbeiro específico
export const getBarbeiroById = (req: any, res: any) => {
  const { id } = req.params;
  db.get('SELECT * FROM barbeiros WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Barbeiro não encontrado' });
      return;
    }
    res.json(row);
  });
};

// Adicionar novo barbeiro
export const addBarbeiro = (req: any, res: any) => {
  try {
    const { nome, especialidade, foto } = req.body;
    
    if (!nome || !especialidade) {
      res.status(400).json({ error: 'Nome e especialidade são obrigatórios' });
      return;
    }

    db.run(
      `INSERT INTO barbeiros (
        nome, especialidade, foto, 
        avaliacao, clientes_atendidos, disponivel
      ) VALUES (?, ?, ?, 0, 0, 1)`,
      [nome, especialidade, foto || '💇‍♂️'],
      function(err: any) {
        if (err) {
          console.error('Erro SQL:', err);
          res.status(500).json({ error: 'Erro ao salvar barbeiro' });
          return;
        }
        
        db.get('SELECT * FROM barbeiros WHERE id = ?', [this.lastID], (err, row) => {
          if (err) {
            res.status(500).json({ error: 'Erro ao recuperar barbeiro criado' });
            return;
          }
          res.json(row);
        });
      }
    );
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Atualizar barbeiro
export const updateBarbeiro = (req: any, res: any) => {
  const { id } = req.params;
  const { nome, especialidade, disponivel, foto } = req.body;
  db.run(
    `UPDATE barbeiros 
     SET nome = ?, especialidade = ?, 
         disponivel = ?, foto = ? 
     WHERE id = ?`,
    [nome, especialidade, disponivel, foto, id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ 
        success: true, 
        message: 'Barbeiro atualizado com sucesso' 
      });
    }
  );
};

// Deletar barbeiro
export const deleteBarbeiro = (req: any, res: any) => {
  const { id } = req.params;
  db.run('DELETE FROM barbeiros WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ 
      success: true, 
      message: 'Barbeiro removido com sucesso' 
    });
  });
};

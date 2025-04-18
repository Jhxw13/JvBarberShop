const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // Barbeiros
  db.run(`
    CREATE TABLE IF NOT EXISTS barbeiros (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      especialidade TEXT,
      avaliacao REAL DEFAULT 0,
      clientes_atendidos INTEGER DEFAULT 0,
      disponivel BOOLEAN DEFAULT 1,
      foto TEXT
    )
  `);

  // Produtos
  db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT,
      preco REAL NOT NULL,
      estoque INTEGER DEFAULT 0,
      categoria TEXT,
      foto TEXT
    )
  `);

  // Serviços
  db.run(`
    CREATE TABLE IF NOT EXISTS servicos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT,
      preco REAL NOT NULL,
      duracao INTEGER NOT NULL,
      foto TEXT
    )
  `);

  // Clientes
  db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      telefone TEXT,
      email TEXT,
      data_cadastro TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Agendamentos
  db.run(`
    CREATE TABLE IF NOT EXISTS agendamentos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente_id INTEGER,
      barbeiro_id INTEGER,
      servico_id INTEGER,
      data TEXT NOT NULL,
      hora TEXT NOT NULL,
      status TEXT DEFAULT 'pendente',
      FOREIGN KEY (cliente_id) REFERENCES clientes (id),
      FOREIGN KEY (barbeiro_id) REFERENCES barbeiros (id),
      FOREIGN KEY (servico_id) REFERENCES servicos (id)
    )
  `);

  // Vendas (PDV)
  db.run(`
    CREATE TABLE IF NOT EXISTS vendas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      data DATETIME DEFAULT CURRENT_TIMESTAMP,
      barbeiro_id INTEGER NOT NULL,
      total REAL NOT NULL,
      forma_pagamento TEXT,
      status TEXT DEFAULT 'finalizado',
      FOREIGN KEY (barbeiro_id) REFERENCES barbeiros (id)
    )
  `);

  // Itens da Venda
  db.run(`
    CREATE TABLE IF NOT EXISTS itens_venda (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      venda_id INTEGER NOT NULL,
      tipo TEXT NOT NULL,
      produto_id INTEGER,
      servico_id INTEGER,
      quantidade INTEGER NOT NULL,
      preco_unitario REAL NOT NULL,
      FOREIGN KEY (venda_id) REFERENCES vendas (id),
      FOREIGN KEY (produto_id) REFERENCES produtos (id),
      FOREIGN KEY (servico_id) REFERENCES servicos (id)
    )
  `);

  // Financeiro
  db.run(`
    CREATE TABLE IF NOT EXISTS financeiro (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      data TEXT DEFAULT CURRENT_TIMESTAMP,
      tipo TEXT NOT NULL,
      descricao TEXT,
      valor REAL NOT NULL,
      categoria TEXT,
      venda_id INTEGER,
      FOREIGN KEY (venda_id) REFERENCES vendas (id)
    )
  `);

  // Inserir alguns dados de exemplo
  db.run(`INSERT OR IGNORE INTO barbeiros (nome, especialidade, foto) VALUES 
    ('João Silva', 'Corte Masculino', '👨‍💇‍♂️'),
    ('Pedro Santos', 'Barba', '✂️'),
    ('Carlos Oliveira', 'Corte e Barba', '💈')`);

  db.run(`INSERT OR IGNORE INTO servicos (nome, descricao, preco, duracao) VALUES 
    ('Corte Masculino', 'Corte tradicional', 35.00, 30),
    ('Barba', 'Barba completa', 25.00, 20),
    ('Corte + Barba', 'Combo completo', 55.00, 50)`);

  db.run(`INSERT OR IGNORE INTO produtos (nome, descricao, preco, estoque, categoria) VALUES 
    ('Pomada Modeladora', 'Pomada para cabelo', 29.90, 10, 'Cabelo'),
    ('Óleo para Barba', 'Óleo hidratante', 34.90, 8, 'Barba'),
    ('Shampoo Anticaspa', 'Shampoo especial', 45.90, 5, 'Cabelo')`);
});

module.exports = db;
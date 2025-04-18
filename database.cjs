
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
      preco REAL NOT NULL,
      estoque INTEGER DEFAULT 0,
      categoria TEXT,
      foto TEXT,
      status TEXT DEFAULT 'Normal'
    )
  `);

  // Serviços
  db.run(`
    CREATE TABLE IF NOT EXISTS servicos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      preco REAL NOT NULL,
      duracao INTEGER NOT NULL,
      descricao TEXT,
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
      data TEXT DEFAULT CURRENT_TIMESTAMP,
      total REAL NOT NULL,
      tipo TEXT NOT NULL,
      status TEXT DEFAULT 'concluido',
      cliente_id INTEGER,
      barbeiro_id INTEGER,
      FOREIGN KEY (cliente_id) REFERENCES clientes (id),
      FOREIGN KEY (barbeiro_id) REFERENCES barbeiros (id)
    )
  `);

  // Itens da Venda
  db.run(`
    CREATE TABLE IF NOT EXISTS itens_venda (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      venda_id INTEGER,
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
});

module.exports = db;

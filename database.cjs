
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Criação das tabelas necessárias
db.serialize(() => {
  // Tabela de Clientes
  db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      telefone TEXT,
      data_cadastro TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabela de Serviços
  db.run(`
    CREATE TABLE IF NOT EXISTS servicos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      preco REAL NOT NULL,
      duracao INTEGER NOT NULL
    )
  `);

  // Tabela de Agendamentos
  db.run(`
    CREATE TABLE IF NOT EXISTS agendamentos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente_id INTEGER,
      servico_id INTEGER,
      data TEXT NOT NULL,
      hora TEXT NOT NULL,
      status TEXT DEFAULT 'pendente',
      FOREIGN KEY (cliente_id) REFERENCES clientes (id),
      FOREIGN KEY (servico_id) REFERENCES servicos (id)
    )
  `);
});

module.exports = db;

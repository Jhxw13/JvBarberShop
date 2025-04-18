const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'jvbarbershop.db');
const db = new sqlite3.Database(dbPath);

// Criação de tabela de exemplo (Clientes)
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      telefone TEXT,
      data_cadastro TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;

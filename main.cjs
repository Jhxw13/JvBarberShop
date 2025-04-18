
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('./database.cjs');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  });

  win.loadURL('http://0.0.0.0:5173');
}

// Rotas para Clientes
ipcMain.handle('inserir-cliente', async (_, cliente) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO clientes (nome, telefone) VALUES (?, ?)';
    db.run(sql, [cliente.nome, cliente.telefone], function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID });
    });
  });
});

ipcMain.handle('listar-clientes', async () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM clientes', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
});

// Rotas para Serviços
ipcMain.handle('inserir-servico', async (_, servico) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO servicos (nome, preco, duracao) VALUES (?, ?, ?)';
    db.run(sql, [servico.nome, servico.preco, servico.duracao], function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID });
    });
  });
});

ipcMain.handle('listar-servicos', async () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM servicos', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
});

// Rotas para Agendamentos
ipcMain.handle('inserir-agendamento', async (_, agendamento) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO agendamentos (cliente_id, servico_id, data, hora) VALUES (?, ?, ?, ?)';
    db.run(sql, [agendamento.cliente_id, agendamento.servico_id, agendamento.data, agendamento.hora], function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID });
    });
  });
});

ipcMain.handle('listar-agendamentos', async () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT a.*, c.nome as cliente_nome, s.nome as servico_nome 
      FROM agendamentos a 
      JOIN clientes c ON a.cliente_id = c.id 
      JOIN servicos s ON a.servico_id = s.id
    `;
    db.all(sql, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

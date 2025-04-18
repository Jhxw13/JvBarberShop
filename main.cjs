const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('./database.cjs'); // <-- conexão com o SQLite

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // opcional, mas bom ter
      nodeIntegration: true,
      contextIsolation: false, // necessário para usar ipcRenderer no React
    },
  });

  // Use o endereço local do Vite ou o buildado
  win.loadURL('http://localhost:5173');
}

// Canal para inserir cliente
ipcMain.handle('inserir-cliente', async (_, { nome, telefone }) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO clientes (nome, telefone) VALUES (?, ?)`;
    db.run(query, [nome, telefone], function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID });
    });
  });
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

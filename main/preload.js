const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  enviarMensagem: (mensagem) => ipcRenderer.send('mensagem', mensagem),
  receberMensagem: (callback) => ipcRenderer.on('resposta', callback)
});

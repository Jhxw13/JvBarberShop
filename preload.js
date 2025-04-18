const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  inserirCliente: (cliente) => ipcRenderer.invoke('inserir-cliente', cliente),
});

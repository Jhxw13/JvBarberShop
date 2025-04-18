
import React, { useState, useEffect } from 'react';
const { ipcRenderer } = window.require('electron');

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [novoCliente, setNovoCliente] = useState({ nome: '', telefone: '' });
  const [mostrarForm, setMostrarForm] = useState(false);

  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = async () => {
    try {
      const clientesData = await ipcRenderer.invoke('listar-clientes');
      setClientes(clientesData);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ipcRenderer.invoke('inserir-cliente', novoCliente);
      setNovoCliente({ nome: '', telefone: '' });
      setMostrarForm(false);
      carregarClientes();
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Clientes
        </h1>
        <button 
          onClick={() => setMostrarForm(!mostrarForm)}
          className="px-4 py-2 bg-accent-purple/20 rounded-lg hover:shadow-glow transition-all duration-300 text-accent-purple"
        >
          {mostrarForm ? 'Cancelar' : 'Novo Cliente'}
        </button>
      </div>

      {mostrarForm && (
        <form onSubmit={handleSubmit} className="bg-dark-200/50 p-6 rounded-xl">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nome"
              value={novoCliente.nome}
              onChange={(e) => setNovoCliente({...novoCliente, nome: e.target.value})}
              className="w-full p-2 bg-dark-300 rounded border border-accent-purple/20"
            />
            <input
              type="text"
              placeholder="Telefone"
              value={novoCliente.telefone}
              onChange={(e) => setNovoCliente({...novoCliente, telefone: e.target.value})}
              className="w-full p-2 bg-dark-300 rounded border border-accent-purple/20"
            />
            <button type="submit" className="w-full px-4 py-2 bg-accent-purple text-white rounded-lg">
              Cadastrar
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clientes.map((cliente) => (
          <div key={cliente.id} className="p-6 rounded-xl bg-dark-200/50 backdrop-blur-sm border border-accent-purple/20 hover:shadow-glow transition-all duration-300">
            <h3 className="text-lg font-semibold text-white">{cliente.nome}</h3>
            <p className="text-zinc-400">{cliente.telefone}</p>
            <p className="text-zinc-400">Cadastrado em: {new Date(cliente.data_cadastro).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clientes;

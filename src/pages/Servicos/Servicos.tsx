
import React, { useState, useEffect } from 'react';
const { ipcRenderer } = window.require('electron');

const Servicos = () => {
  const [servicos, setServicos] = useState([]);
  const [novoServico, setNovoServico] = useState({ nome: '', preco: '', duracao: '' });
  const [mostrarForm, setMostrarForm] = useState(false);

  useEffect(() => {
    carregarServicos();
  }, []);

  const carregarServicos = async () => {
    try {
      const servicosData = await ipcRenderer.invoke('listar-servicos');
      setServicos(servicosData);
    } catch (error) {
      console.error('Erro ao carregar serviços:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ipcRenderer.invoke('inserir-servico', {
        ...novoServico,
        preco: parseFloat(novoServico.preco),
        duracao: parseInt(novoServico.duracao)
      });
      setNovoServico({ nome: '', preco: '', duracao: '' });
      setMostrarForm(false);
      carregarServicos();
    } catch (error) {
      console.error('Erro ao cadastrar serviço:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Serviços
        </h1>
        <button 
          onClick={() => setMostrarForm(!mostrarForm)}
          className="px-4 py-2 bg-accent-purple/20 rounded-lg hover:shadow-glow transition-all duration-300 text-accent-purple"
        >
          {mostrarForm ? 'Cancelar' : 'Novo Serviço'}
        </button>
      </div>

      {mostrarForm && (
        <form onSubmit={handleSubmit} className="bg-dark-200/50 p-6 rounded-xl">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nome do Serviço"
              value={novoServico.nome}
              onChange={(e) => setNovoServico({...novoServico, nome: e.target.value})}
              className="w-full p-2 bg-dark-300 rounded border border-accent-purple/20"
            />
            <input
              type="number"
              placeholder="Preço"
              value={novoServico.preco}
              onChange={(e) => setNovoServico({...novoServico, preco: e.target.value})}
              className="w-full p-2 bg-dark-300 rounded border border-accent-purple/20"
            />
            <input
              type="number"
              placeholder="Duração (minutos)"
              value={novoServico.duracao}
              onChange={(e) => setNovoServico({...novoServico, duracao: e.target.value})}
              className="w-full p-2 bg-dark-300 rounded border border-accent-purple/20"
            />
            <button type="submit" className="w-full px-4 py-2 bg-accent-purple text-white rounded-lg">
              Cadastrar
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicos.map((servico) => (
          <div key={servico.id} className="p-6 rounded-xl bg-dark-200/50 backdrop-blur-sm border border-accent-purple/20 hover:shadow-glow transition-all duration-300">
            <h3 className="text-lg font-semibold text-white">{servico.nome}</h3>
            <p className="text-accent-purple text-xl mt-2">R$ {servico.preco.toFixed(2)}</p>
            <p className="text-zinc-400">{servico.duracao} minutos</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Servicos;

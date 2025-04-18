
import React, { useState, useEffect } from 'react';
const { ipcRenderer } = window.require('electron');

const Agendamentos = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [novoAgendamento, setNovoAgendamento] = useState({
    cliente_id: '',
    servico_id: '',
    data: '',
    hora: ''
  });
  const [mostrarForm, setMostrarForm] = useState(false);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [agendamentosData, clientesData, servicosData] = await Promise.all([
        ipcRenderer.invoke('listar-agendamentos'),
        ipcRenderer.invoke('listar-clientes'),
        ipcRenderer.invoke('listar-servicos')
      ]);
      setAgendamentos(agendamentosData);
      setClientes(clientesData);
      setServicos(servicosData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ipcRenderer.invoke('inserir-agendamento', novoAgendamento);
      setNovoAgendamento({ cliente_id: '', servico_id: '', data: '', hora: '' });
      setMostrarForm(false);
      carregarDados();
    } catch (error) {
      console.error('Erro ao cadastrar agendamento:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Agendamentos
        </h1>
        <button 
          onClick={() => setMostrarForm(!mostrarForm)}
          className="px-4 py-2 bg-accent-purple/20 rounded-lg hover:shadow-glow transition-all duration-300 text-accent-purple"
        >
          {mostrarForm ? 'Cancelar' : 'Novo Agendamento'}
        </button>
      </div>

      {mostrarForm && (
        <form onSubmit={handleSubmit} className="bg-dark-200/50 p-6 rounded-xl">
          <div className="space-y-4">
            <select
              value={novoAgendamento.cliente_id}
              onChange={(e) => setNovoAgendamento({...novoAgendamento, cliente_id: e.target.value})}
              className="w-full p-2 bg-dark-300 rounded border border-accent-purple/20"
            >
              <option value="">Selecione o Cliente</option>
              {clientes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
              ))}
            </select>
            <select
              value={novoAgendamento.servico_id}
              onChange={(e) => setNovoAgendamento({...novoAgendamento, servico_id: e.target.value})}
              className="w-full p-2 bg-dark-300 rounded border border-accent-purple/20"
            >
              <option value="">Selecione o Serviço</option>
              {servicos.map(servico => (
                <option key={servico.id} value={servico.id}>{servico.nome}</option>
              ))}
            </select>
            <input
              type="date"
              value={novoAgendamento.data}
              onChange={(e) => setNovoAgendamento({...novoAgendamento, data: e.target.value})}
              className="w-full p-2 bg-dark-300 rounded border border-accent-purple/20"
            />
            <input
              type="time"
              value={novoAgendamento.hora}
              onChange={(e) => setNovoAgendamento({...novoAgendamento, hora: e.target.value})}
              className="w-full p-2 bg-dark-300 rounded border border-accent-purple/20"
            />
            <button type="submit" className="w-full px-4 py-2 bg-accent-purple text-white rounded-lg">
              Agendar
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {agendamentos.map((agendamento) => (
          <div key={agendamento.id} className="p-6 rounded-xl bg-dark-200/50 backdrop-blur-sm border border-accent-purple/20 hover:shadow-glow transition-all duration-300">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-white">{agendamento.cliente_nome}</h3>
                <p className="text-zinc-400">{agendamento.servico_nome}</p>
              </div>
              <div className="text-right">
                <p className="text-accent-purple">{agendamento.hora}</p>
                <p className="text-zinc-400">{agendamento.data}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Agendamentos;

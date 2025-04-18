import React, { useState } from 'react';

const CadastroCliente: React.FC = () => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // envia os dados para o main.cjs via IPC
      const resposta = await window.electronAPI.inserirCliente({ nome, telefone });
      setStatus(`Cliente cadastrado com ID: ${resposta.id}`);
      setNome('');
      setTelefone('');
    } catch (err) {
      console.error(err);
      setStatus('Erro ao cadastrar cliente');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Cadastrar Cliente</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border px-2 py-1 w-full"
          required
        />
        <input
          type="text"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className="border px-2 py-1 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Cadastrar
        </button>
      </form>
      {status && <p className="mt-4 text-sm text-green-600">{status}</p>}
    </div>
  );
};

export default CadastroCliente;


import { useState, useEffect } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scissors, Plus, Edit2, Trash2 } from 'lucide-react';

interface Servico {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  duracao: number;
}

export default function Servicos() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    duracao: ''
  });

  const fetchServicos = async () => {
    try {
      const response = await fetch('/api/servicos');
      const data = await response.json();
      setServicos(data);
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
    }
  };

  useEffect(() => {
    fetchServicos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/servicos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          preco: parseFloat(formData.preco),
          duracao: parseInt(formData.duracao)
        }),
      });

      if (response.ok) {
        setIsModalOpen(false);
        setFormData({ nome: '', descricao: '', preco: '', duracao: '' });
        fetchServicos();
      }
    } catch (error) {
      console.error('Erro ao adicionar serviço:', error);
    }
  };

  return (
    <PageContainer 
      title="Serviços" 
      description="Gerencie os serviços oferecidos pela barbearia"
    >
      <div className="mb-6">
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus size={20} className="mr-2" />
          Novo Serviço
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicos.map((servico) => (
          <Card key={servico.id} className="bg-zinc-800 hover:shadow-purple-500/20 hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Scissors className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="text-lg font-semibold">{servico.nome}</h3>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-zinc-700 rounded-lg">
                    <Edit2 size={16} className="text-zinc-400" />
                  </button>
                  <button className="p-2 hover:bg-zinc-700 rounded-lg">
                    <Trash2 size={16} className="text-zinc-400" />
                  </button>
                </div>
              </div>
              <p className="text-zinc-400 text-sm mb-4">{servico.descricao}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-purple-500">
                  R$ {servico.preco.toFixed(2)}
                </span>
                <span className="text-sm text-zinc-400">
                  {servico.duracao} min
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-zinc-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Novo Serviço</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Nome</label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Descrição</label>
                <textarea
                  value={formData.descricao}
                  onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                  className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Preço (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.preco}
                  onChange={(e) => setFormData({...formData, preco: e.target.value})}
                  className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Duração (minutos)</label>
                <input
                  type="number"
                  value={formData.duracao}
                  onChange={(e) => setFormData({...formData, duracao: e.target.value})}
                  className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  variant="outline"
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Salvar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageContainer>
  );
}

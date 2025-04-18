
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Barbeiro {
  id: number;
  nome: string;
  especialidade: string;
  avaliacao: number;
  clientes_atendidos: number;
  disponivel: boolean;
  foto: string;
}

export default function Barbeiros() {
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    especialidade: '',
    foto: '💇‍♂️'
  });

  useEffect(() => {
    fetchBarbeiros();
  }, []);

  const fetchBarbeiros = async () => {
    try {
      const response = await fetch('/api/barbeiros');
      const data = await response.json();
      setBarbeiros(data);
    } catch (error) {
      console.error('Erro ao buscar barbeiros:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.especialidade) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    try {
      const response = await fetch('/api/barbeiros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar barbeiro');
      }

      const data = await response.json();
      const novoBarbeiro = {
        ...formData,
        id: data.id,
        avaliacao: 0,
        clientes_atendidos: 0,
        disponivel: true
      };

      setBarbeiros([...barbeiros, novoBarbeiro]);
      setFormData({ nome: '', especialidade: '', foto: '💇‍♂️' });
      setIsModalOpen(false);
      alert('Barbeiro adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar barbeiro:', error);
      alert('Erro ao adicionar barbeiro');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este barbeiro?')) return;
    
    try {
      const response = await fetch(`/api/barbeiros/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir barbeiro');
      }

      setBarbeiros(barbeiros.filter(b => b.id !== id));
      alert('Barbeiro removido com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir barbeiro:', error);
      alert('Erro ao excluir barbeiro');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Barbeiros
          </h1>
          <p className="text-zinc-400 mt-1">Gerencie sua equipe de profissionais</p>
        </div>
        <Button 
          className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
          onClick={() => setIsModalOpen(true)}
        >
          Adicionar Barbeiro
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {barbeiros.map((barbeiro) => (
          <Card key={barbeiro.id} className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 hover:border-purple-500/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-2xl shadow-lg ring-2 ring-purple-500/20">
                  {barbeiro.foto || '💇‍♂️'}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{barbeiro.nome}</h3>
                  <p className="text-zinc-400">{barbeiro.especialidade}</p>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">★</span>
                  <span className="font-medium">{barbeiro.avaliacao?.toFixed(1) || '0.0'}</span>
                  <span className="text-zinc-400 text-sm">({barbeiro.clientes_atendidos || 0} avaliações)</span>
                </div>
                <Badge variant="outline" className={
                  barbeiro.disponivel 
                    ? "bg-green-500/10 text-green-400 border-green-500/20" 
                    : "bg-red-500/10 text-red-400 border-red-500/20"
                }>
                  {barbeiro.disponivel ? "Disponível" : "Ocupado"}
                </Badge>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 transition-all duration-300">
                  Editar
                </Button>
                <Button 
                  className="w-full bg-red-500/10 text-red-400 hover:bg-red-600 hover:text-white border border-red-500/20 hover:border-red-600 transition-all duration-300"
                  onClick={() => handleDelete(barbeiro.id)}
                >
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="w-full max-w-md bg-zinc-800/90 border border-zinc-700/50">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6">Adicionar Barbeiro</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-zinc-400">Nome *</label>
                  <input
                    type="text"
                    className="w-full p-3 rounded-lg bg-zinc-700/50 border border-zinc-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-zinc-400">Especialidade *</label>
                  <input
                    type="text"
                    className="w-full p-3 rounded-lg bg-zinc-700/50 border border-zinc-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                    value={formData.especialidade}
                    onChange={(e) => setFormData({...formData, especialidade: e.target.value})}
                    required
                  />
                </div>
                <div className="flex gap-3 mt-6">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
                  >
                    Salvar
                  </Button>
                  <Button 
                    type="button" 
                    className="flex-1 bg-zinc-700/50 hover:bg-zinc-600 transition-all duration-300"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

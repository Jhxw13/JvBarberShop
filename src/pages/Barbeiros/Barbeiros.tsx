
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Scissors, Star, Users, Plus, Pencil, Trash2 } from 'lucide-react';

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

  useEffect(() => {
    fetchBarbeiros();
  }, []);

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

      const novoBarbeiro = await response.json();
      setBarbeiros([...barbeiros, novoBarbeiro]);
      setFormData({ nome: '', especialidade: '', foto: '💇‍♂️' });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao adicionar barbeiro:', error);
      alert('Erro ao adicionar barbeiro. Por favor, tente novamente.');
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
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Equipe de Barbeiros
          </h1>
          <p className="text-zinc-400 mt-2">Gerencie sua equipe de profissionais especializados</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
        >
          <Plus size={20} />
          Adicionar Barbeiro
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {barbeiros.map((barbeiro) => (
          <Card key={barbeiro.id} className="bg-zinc-800/50 backdrop-blur-sm border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  {barbeiro.foto}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {barbeiro.nome}
                  </h3>
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Scissors size={16} />
                    <span>{barbeiro.especialidade}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="text-yellow-500" size={18} />
                    <span className="font-medium">{barbeiro.avaliacao?.toFixed(1) || '0.0'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Users size={18} />
                    <span>{barbeiro.clientes_atendidos || 0} clientes</span>
                  </div>
                </div>

                <Badge variant="outline" className={
                  barbeiro.disponivel 
                    ? "w-full justify-center bg-green-500/10 text-green-400 border-green-500/20" 
                    : "w-full justify-center bg-red-500/10 text-red-400 border-red-500/20"
                }>
                  {barbeiro.disponivel ? "Disponível" : "Ocupado"}
                </Badge>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <Button 
                    className="w-full bg-purple-500/10 text-purple-400 hover:bg-purple-500 hover:text-white border border-purple-500/20 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Pencil size={16} />
                    Editar
                  </Button>
                  <Button 
                    onClick={() => handleDelete(barbeiro.id)}
                    className="w-full bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Trash2 size={16} />
                    Excluir
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="w-full max-w-md bg-zinc-800/90 border border-purple-500/20">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Novo Barbeiro
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-zinc-400">Nome do Barbeiro *</label>
                  <input
                    type="text"
                    className="w-full p-3 rounded-lg bg-zinc-700/50 border border-purple-500/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    required
                    placeholder="Digite o nome do barbeiro"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-zinc-400">Especialidade *</label>
                  <input
                    type="text"
                    className="w-full p-3 rounded-lg bg-zinc-700/50 border border-purple-500/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                    value={formData.especialidade}
                    onChange={(e) => setFormData({...formData, especialidade: e.target.value})}
                    required
                    placeholder="Ex: Corte moderno, Barba"
                  />
                </div>
                <div className="flex gap-3 mt-6">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white transition-all duration-300"
                  >
                    Salvar Barbeiro
                  </Button>
                  <Button 
                    type="button" 
                    className="flex-1 bg-zinc-700/50 hover:bg-zinc-600 text-zinc-300 transition-all duration-300"
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

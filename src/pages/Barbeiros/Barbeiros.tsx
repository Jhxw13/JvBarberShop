
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
    try {
      const response = await fetch('/api/barbeiros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsModalOpen(false);
        setFormData({ nome: '', especialidade: '', foto: '💇‍♂️' });
        fetchBarbeiros();
      }
    } catch (error) {
      console.error('Erro ao adicionar barbeiro:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este barbeiro?')) return;
    
    try {
      const response = await fetch(`/api/barbeiros/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchBarbeiros();
      }
    } catch (error) {
      console.error('Erro ao excluir barbeiro:', error);
    }
  };

  if (loading) {
    return <div className="p-6">Carregando...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Barbeiros</h1>
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          onClick={() => setIsModalOpen(true)}
        >
          Adicionar Barbeiro
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {barbeiros.map((barbeiro) => (
          <Card key={barbeiro.id} className="bg-zinc-800 hover:shadow-lg hover:shadow-purple-500/20 transition-all">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-xl font-bold">
                  {barbeiro.foto || '💇‍♂️'}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{barbeiro.nome}</h3>
                  <p className="text-zinc-400">{barbeiro.especialidade}</p>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">★</span>
                  <span>{barbeiro.avaliacao?.toFixed(1) || '0.0'}</span>
                </div>
                <p className="text-zinc-400">{barbeiro.clientes_atendidos || 0} clientes atendidos</p>
                <Badge variant="outline" className={barbeiro.disponivel ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}>
                  {barbeiro.disponivel ? "Disponível" : "Ocupado"}
                </Badge>
              </div>
              
              <div className="mt-4 flex gap-2">
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                  Editar
                </Button>
                <Button 
                  className="flex-1 bg-red-600 hover:bg-red-700"
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <Card className="w-full max-w-md bg-zinc-800">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Adicionar Barbeiro</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Nome</label>
                  <input
                    type="text"
                    className="w-full p-2 rounded bg-zinc-700 border border-zinc-600"
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Especialidade</label>
                  <input
                    type="text"
                    className="w-full p-2 rounded bg-zinc-700 border border-zinc-600"
                    value={formData.especialidade}
                    onChange={(e) => setFormData({...formData, especialidade: e.target.value})}
                    required
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
                    Salvar
                  </Button>
                  <Button 
                    type="button" 
                    className="flex-1 bg-zinc-700 hover:bg-zinc-600"
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

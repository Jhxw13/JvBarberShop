
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Barbeiro {
  id: number;
  nome: string;
  especialidade: string;
  avaliacao: number;
  clientesAtendidos: number;
  disponivel: boolean;
  foto: string;
}

export default function Barbeiros() {
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div className="p-6">Carregando...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Barbeiros</h1>
        <Button className="bg-purple-600 hover:bg-purple-700">
          Adicionar Barbeiro
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {barbeiros.map((barbeiro) => (
          <Card key={barbeiro.id} className="bg-zinc-800 hover:shadow-lg hover:shadow-purple-500/20 transition-all">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-xl font-bold">
                  {barbeiro.foto}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{barbeiro.nome}</h3>
                  <p className="text-zinc-400">{barbeiro.especialidade}</p>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">★</span>
                  <span>{barbeiro.avaliacao.toFixed(1)}</span>
                </div>
                <p className="text-zinc-400">{barbeiro.clientesAtendidos} clientes atendidos</p>
                <Badge variant="outline" className={barbeiro.disponivel ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}>
                  {barbeiro.disponivel ? "Disponível" : "Ocupado"}
                </Badge>
              </div>
              
              <div className="mt-4 flex gap-2">
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                  Editar
                </Button>
                <Button className="flex-1 bg-red-600 hover:bg-red-700">
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

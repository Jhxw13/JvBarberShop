
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Barbeiros() {
  const barbeiros = [
    { 
      nome: "João Silva", 
      especialidade: "Corte Clássico",
      avaliacao: 4.7,
      clientesAtendidos: 150,
      disponivel: true,
      foto: "JS"
    },
    { 
      nome: "Marcos Oliveira", 
      especialidade: "Barba",
      avaliacao: 4.8,
      clientesAtendidos: 120,
      disponivel: false,
      foto: "MO"
    },
    { 
      nome: "Rafael Costa", 
      especialidade: "Degradê",
      avaliacao: 4.9,
      clientesAtendidos: 200,
      disponivel: true,
      foto: "RC"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Barbeiros</h1>
        <Button className="bg-purple-600 hover:bg-purple-700">Adicionar Barbeiro</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {barbeiros.map((barbeiro, index) => (
          <Card key={index} className="bg-zinc-800 hover:shadow-lg hover:shadow-purple-500/20 transition-all">
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
                  <span>{barbeiro.avaliacao}</span>
                </div>
                <p className="text-zinc-400">{barbeiro.clientesAtendidos} clientes atendidos</p>
                <Badge variant="outline" className={barbeiro.disponivel ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}>
                  {barbeiro.disponivel ? "Disponível" : "Ocupado"}
                </Badge>
              </div>
              
              <div className="mt-4 flex gap-2">
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700">Editar</Button>
                <Button variant="outline" className="flex-1 border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white">
                  Ver Agenda
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

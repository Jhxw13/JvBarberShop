import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="p-6 bg-zinc-900 min-h-screen text-white space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Atendimentos Hoje", value: "4", change: "+18%", color: "text-green-400" },
          { title: "Faturamento Hoje", value: "R$ 860,00", change: "+12%", color: "text-green-400" },
          { title: "Vendas de Produtos", value: "8", change: "-5%", color: "text-red-400" },
          { title: "Novos Clientes", value: "3", change: "+20%", color: "text-green-400" },
        ].map((item, idx) => (
          <Card
            key={idx}
            className="bg-zinc-800 hover:shadow-lg hover:shadow-purple-500 transition-shadow cursor-pointer"
          >
            <CardContent className="p-4 space-y-2">
              <p className="text-sm text-zinc-400">{item.title}</p>
              <p className="text-2xl font-bold text-purple-400">{item.value}</p>
              <p className={`text-xs ${item.color}`}>{item.change} comparado à semana passada</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Agendamentos e Desempenho */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Agendamentos */}
        <Card className="col-span-2 bg-zinc-800 hover:shadow-lg hover:shadow-purple-500 transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Agendamentos de Hoje</h2>
              <Button variant="ghost" className="text-purple-400 hover:underline">Ver Todos</Button>
            </div>
            <div className="space-y-4">
              {[
                { nome: "Ricardo Almeida", servico: "Corte + Barba", horario: "07:30 - 08:15", barbeiro: "João Silva", status: "Confirmado", cor: "green" },
                { nome: "Carlos Eduardo", servico: "Corte Masculino", horario: "08:30 - 09:00", barbeiro: "Marcos Oliveira", status: "Pendente", cor: "yellow" },
                { nome: "André Souza", servico: "Barba", horario: "11:00 - 11:20", barbeiro: "João Silva", status: "Confirmado", cor: "green" },
                { nome: "Miguel Torres", servico: "Corte Masculino", horario: "13:30 - 14:00", barbeiro: "Marcos Oliveira", status: "Novo Cliente", cor: "orange" },
              ].map((ag, idx) => (
                <div key={idx} className="flex items-center justify-between bg-zinc-700 p-3 rounded-lg hover:shadow hover:shadow-purple-500 transition-shadow">
                  <div>
                    <p className="font-medium">{ag.nome}</p>
                    <p className="text-sm text-zinc-400">{ag.servico}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-zinc-300">
                    <span>{ag.horario}</span>
                    <span className="text-purple-300">{ag.barbeiro}</span>
                    <Badge
                      variant="outline"
                      className={`capitalize border-${ag.cor}-500 text-${ag.cor}-400`}
                    >
                      {ag.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Desempenho dos Barbeiros */}
        <Card className="bg-zinc-800 hover:shadow-lg hover:shadow-purple-500 transition-shadow">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">Desempenho dos Barbeiros</h2>
            <div className="space-y-4">
              {[
                { iniciais: "JS", nome: "João Silva", nota: "4.7", atendimentos: 2 },
                { iniciais: "MO", nome: "Marcos Oliveira", nota: "4.2", atendimentos: 2 },
                { iniciais: "RC", nome: "Rafael Costa", nota: "5.0", atendimentos: 0 },
              ].map((barbeiro, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-600 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold">
                      {barbeiro.iniciais}
                    </div>
                    <div>
                      <p className="font-medium">{barbeiro.nome}</p>
                      <div className="text-sm text-zinc-400">⭐ {barbeiro.nota}</div>
                    </div>
                  </div>
                  <p className="text-sm">{barbeiro.atendimentos} Atendimentos</p>
                </div>
              ))}
            </div>
            <Button className="mt-4 w-full border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white transition-colors" variant="outline">
              Ver Todos os Barbeiros
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

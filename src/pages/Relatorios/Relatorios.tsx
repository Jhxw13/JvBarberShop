
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Relatorios() {
  const relatorios = [
    {
      titulo: "Faturamento Mensal",
      descricao: "Relatório detalhado de receitas e despesas",
      ultimaGeracao: "2024-02-20",
      tipo: "Financeiro"
    },
    {
      titulo: "Desempenho dos Barbeiros",
      descricao: "Análise de atendimentos e avaliações",
      ultimaGeracao: "2024-02-19",
      tipo: "Operacional"
    },
    {
      titulo: "Controle de Estoque",
      descricao: "Status atual dos produtos",
      ultimaGeracao: "2024-02-18",
      tipo: "Produtos"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Relatórios</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatorios.map((relatorio, index) => (
          <Card key={index} className="bg-zinc-800 hover:shadow-lg hover:shadow-purple-500/20 transition-all">
            <CardContent className="p-6">
              <div className="flex flex-col h-full">
                <div>
                  <h3 className="text-lg font-semibold">{relatorio.titulo}</h3>
                  <p className="text-zinc-400 text-sm mt-2">{relatorio.descricao}</p>
                </div>
                
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-zinc-400">
                    Última geração: {new Date(relatorio.ultimaGeracao).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-purple-400">{relatorio.tipo}</p>
                </div>
                
                <div className="mt-6 flex gap-2">
                  <Button className="flex-1 bg-purple-600 hover:bg-purple-700">Gerar</Button>
                  <Button variant="outline" className="flex-1 border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white">
                    Histórico
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

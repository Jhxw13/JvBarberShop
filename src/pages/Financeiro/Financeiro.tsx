
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Financeiro() {
  const transacoes = [
    {
      data: "2024-02-20",
      descricao: "Corte + Barba",
      cliente: "Ricardo Almeida",
      tipo: "Entrada",
      valor: 75.00
    },
    {
      data: "2024-02-20",
      descricao: "Compra de Produtos",
      cliente: "Fornecedor XYZ",
      tipo: "Saída",
      valor: 450.00
    },
    {
      data: "2024-02-19",
      descricao: "Degradê",
      cliente: "Carlos Eduardo",
      tipo: "Entrada",
      valor: 45.00
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Financeiro</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="border-purple-500 text-purple-400">Exportar</Button>
          <Button className="bg-purple-600 hover:bg-purple-700">Nova Transação</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-zinc-800">
          <CardContent className="p-6">
            <h3 className="text-zinc-400">Entradas Hoje</h3>
            <p className="text-2xl font-bold text-green-400">R$ 520,00</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-800">
          <CardContent className="p-6">
            <h3 className="text-zinc-400">Saídas Hoje</h3>
            <p className="text-2xl font-bold text-red-400">R$ 450,00</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-800">
          <CardContent className="p-6">
            <h3 className="text-zinc-400">Saldo Hoje</h3>
            <p className="text-2xl font-bold text-purple-400">R$ 70,00</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-zinc-800">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Últimas Transações</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="text-left py-3 px-4">Data</th>
                  <th className="text-left py-3 px-4">Descrição</th>
                  <th className="text-left py-3 px-4">Cliente/Fornecedor</th>
                  <th className="text-left py-3 px-4">Tipo</th>
                  <th className="text-right py-3 px-4">Valor</th>
                </tr>
              </thead>
              <tbody>
                {transacoes.map((transacao, index) => (
                  <tr key={index} className="border-b border-zinc-700/50 hover:bg-zinc-700/30">
                    <td className="py-3 px-4">{new Date(transacao.data).toLocaleDateString()}</td>
                    <td className="py-3 px-4">{transacao.descricao}</td>
                    <td className="py-3 px-4">{transacao.cliente}</td>
                    <td className="py-3 px-4">
                      <span className={transacao.tipo === "Entrada" ? "text-green-400" : "text-red-400"}>
                        {transacao.tipo}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className={transacao.tipo === "Entrada" ? "text-green-400" : "text-red-400"}>
                        R$ {transacao.valor.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

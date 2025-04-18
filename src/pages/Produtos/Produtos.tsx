
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Produtos() {
  const produtos = [
    {
      nome: "Pomada Modeladora",
      preco: 45.90,
      estoque: 23,
      categoria: "Finalização",
      status: "Em Alta"
    },
    {
      nome: "Shampoo Antiqueda",
      preco: 59.90,
      estoque: 15,
      categoria: "Cuidados",
      status: "Baixo Estoque"
    },
    {
      nome: "Óleo para Barba",
      preco: 35.90,
      estoque: 30,
      categoria: "Barba",
      status: "Normal"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <Button className="bg-purple-600 hover:bg-purple-700">Novo Produto</Button>
      </div>

      <Card className="bg-zinc-800">
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="text-left py-3 px-4">Produto</th>
                  <th className="text-left py-3 px-4">Preço</th>
                  <th className="text-left py-3 px-4">Estoque</th>
                  <th className="text-left py-3 px-4">Categoria</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-right py-3 px-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((produto, index) => (
                  <tr key={index} className="border-b border-zinc-700/50 hover:bg-zinc-700/30">
                    <td className="py-3 px-4">{produto.nome}</td>
                    <td className="py-3 px-4">R$ {produto.preco.toFixed(2)}</td>
                    <td className="py-3 px-4">{produto.estoque} un</td>
                    <td className="py-3 px-4">{produto.categoria}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" 
                        className={
                          produto.status === "Em Alta" ? "bg-green-500/10 text-green-400" :
                          produto.status === "Baixo Estoque" ? "bg-red-500/10 text-red-400" :
                          "bg-blue-500/10 text-blue-400"
                        }
                      >
                        {produto.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" className="text-purple-400 hover:text-purple-300">Editar</Button>
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

import { PageContainer } from '@/components/PageContainer';
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
    <PageContainer 
      title="Produtos" 
      description="Gerencie o estoque e catálogo de produtos"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {produtos.map((produto, index) => (
          <Card key={index} className="bg-zinc-800">
            <CardContent className="p-6">
              <h2 className="text-lg font-medium">{produto.nome}</h2>
              <p className="text-sm text-gray-400">R$ {produto.preco.toFixed(2)}</p>
              <p className="text-sm text-gray-400">{produto.estoque} un</p>
              <p className="text-sm text-gray-400">{produto.categoria}</p>
              <Badge variant="outline" 
                className={
                  produto.status === "Em Alta" ? "bg-green-500/10 text-green-400" :
                  produto.status === "Baixo Estoque" ? "bg-red-500/10 text-red-400" :
                  "bg-blue-500/10 text-blue-400"
                }
              >
                {produto.status}
              </Badge>
              <Button variant="ghost" className="text-purple-400 hover:text-purple-300 mt-2">Editar</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-6">
        <Button className="bg-purple-600 hover:bg-purple-700">Novo Produto</Button>
      </div>
    </PageContainer>
  );
}
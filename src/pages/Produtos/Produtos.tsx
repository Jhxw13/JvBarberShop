
import { useState, useEffect } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  categoria: string;
  foto: string;
}

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    estoque: '',
    categoria: '',
    foto: '📦'
  });

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await fetch('/api/produtos');
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          preco: parseFloat(formData.preco),
          estoque: parseInt(formData.estoque),
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar produto');
      }

      await fetchProdutos();
      setFormData({ nome: '', descricao: '', preco: '', estoque: '', categoria: '', foto: '📦' });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      alert('Erro ao adicionar produto. Por favor, tente novamente.');
    }
  };

  return (
    <PageContainer
      title="Produtos"
      description="Gerencie o estoque de produtos da barbearia"
    >
      <div className="flex justify-between items-center mb-6">
        <Button onClick={() => setIsModalOpen(true)}>
          Adicionar Produto
        </Button>
      </div>

      {isModalOpen && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nome do produto"
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
                  required
                />
                <input
                  type="number"
                  placeholder="Preço"
                  value={formData.preco}
                  onChange={(e) => setFormData({...formData, preco: e.target.value})}
                  className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
                  required
                  step="0.01"
                />
                <input
                  type="number"
                  placeholder="Estoque"
                  value={formData.estoque}
                  onChange={(e) => setFormData({...formData, estoque: e.target.value})}
                  className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
                  required
                />
                <input
                  type="text"
                  placeholder="Categoria"
                  value={formData.categoria}
                  onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                  className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
                />
                <textarea
                  placeholder="Descrição"
                  value={formData.descricao}
                  onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                  className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 md:col-span-2"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  Salvar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {produtos.map((produto) => (
          <Card key={produto.id} className="bg-zinc-800/50 backdrop-blur-sm border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-4xl mb-4">{produto.foto}</div>
              <h3 className="text-lg font-semibold mb-2">{produto.nome}</h3>
              <p className="text-zinc-400 text-sm mb-4">{produto.descricao}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">R$ {produto.preco.toFixed(2)}</span>
                <Badge variant="outline">{produto.categoria}</Badge>
              </div>
              <div className="mt-4 text-sm text-zinc-400">
                Estoque: {produto.estoque} unidades
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}


import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Barbeiro {
  id: number;
  nome: string;
}

interface Produto {
  id: number;
  nome: string;
  preco: number;
}

interface Servico {
  id: number;
  nome: string;
  preco: number;
}

export default function PDV() {
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<{id: number, tipo: string, nome: string, preco: number, quantidade: number}[]>([]);
  const [total, setTotal] = useState(0);

  const finalizarVenda = async () => {
    if (!barbeiroSelecionado) {
      alert('Selecione um barbeiro para finalizar a venda');
      return;
    }
    if (cartItems.length === 0) {
      alert('Adicione pelo menos um item para finalizar a venda');
      return;
    }

    try {
      const response = await fetch('/api/pdv/venda', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          barbeiro_id: barbeiroSelecionado,
          items: cartItems,
          total: total,
          forma_pagamento: 'dinheiro'
        }),
      });

      if (response.ok) {
        alert('Venda finalizada com sucesso!');
        setCartItems([]);
        setTotal(0);
        setBarbeiroSelecionado(null);
      } else {
        alert('Erro ao finalizar venda');
      }
    } catch (error) {
      console.error('Erro ao finalizar venda:', error);
      alert('Erro ao finalizar venda');
    }
  };

  useEffect(() => {
    fetchBarbeiros();
    fetchProdutos();
    fetchServicos();
  }, []);

  const fetchBarbeiros = async () => {
    try {
      const response = await fetch('/api/barbeiros');
      const data = await response.json();
      setBarbeiros(data);
    } catch (error) {
      console.error('Erro ao buscar barbeiros:', error);
    }
  };

  const fetchProdutos = async () => {
    try {
      const response = await fetch('/api/produtos');
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const fetchServicos = async () => {
    try {
      const response = await fetch('/api/servicos');
      const data = await response.json();
      setServicos(data);
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
    }
  };

  const addToCart = (item: Produto | Servico) => {
    setCartItems([...cartItems, item]);
    setTotal(total + item.preco);
  };

  const removeFromCart = (index: number) => {
    const item = cartItems[index];
    setTotal(total - item.preco);
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const finalizeSale = async () => {
    if (!barbeiroSelecionado) {
      alert('Selecione um barbeiro para finalizar a venda');
      return;
    }

    if (cartItems.length === 0) {
      alert('Adicione pelo menos um item ao carrinho');
      return;
    }

    try {
      const response = await fetch('/api/vendas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          barbeiro_id: barbeiroSelecionado,
          items: cartItems.map(item => ({
            id: item.id,
            tipo: 'preco' in item ? 'produto' : 'servico',
            quantidade: 1,
            preco: item.preco
          })),
          total
        })
      });

      if (response.ok) {
        setCartItems([]);
        setTotal(0);
        setBarbeiroSelecionado(null);
        alert('Venda finalizada com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao finalizar venda:', error);
      alert('Erro ao finalizar venda');
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="bg-zinc-800">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Selecione o Barbeiro</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {barbeiros.map((barbeiro) => (
                <Button
                  key={barbeiro.id}
                  onClick={() => setBarbeiroSelecionado(barbeiro.id)}
                  className={`w-full ${barbeiroSelecionado === barbeiro.id ? 'bg-purple-600' : 'bg-zinc-700'}`}
                >
                  {barbeiro.nome}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Serviços</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {servicos.map((servico) => (
                <Button
                  key={servico.id}
                  onClick={() => addToCart(servico)}
                  className="w-full bg-zinc-700"
                >
                  {servico.nome} - R$ {servico.preco.toFixed(2)}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Produtos</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {produtos.map((produto) => (
                <Button
                  key={produto.id}
                  onClick={() => addToCart(produto)}
                  className="w-full bg-zinc-700"
                >
                  {produto.nome} - R$ {produto.preco.toFixed(2)}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="bg-zinc-800 sticky top-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Carrinho</h2>
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{item.nome}</span>
                  <div className="flex items-center gap-4">
                    <span>R$ {item.preco.toFixed(2)}</span>
                    <Button 
                      variant="outline" 
                      onClick={() => removeFromCart(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Remover
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-zinc-700">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-lg font-bold">R$ {total.toFixed(2)}</span>
              </div>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={finalizeSale}
                disabled={!barbeiroSelecionado || cartItems.length === 0}
              >
                Finalizar Venda
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

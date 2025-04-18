
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  nome: string;
  preco: number;
}

interface Service {
  id: number;
  nome: string;
  preco: number;
}

export default function PDV() {
  const [cartItems, setCartItems] = useState<(Product | Service)[]>([]);
  const [total, setTotal] = useState(0);

  const addToCart = (item: Product | Service) => {
    setCartItems([...cartItems, item]);
    setTotal(total + item.preco);
  };

  const removeFromCart = (index: number) => {
    const item = cartItems[index];
    setTotal(total - item.preco);
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const finalizeSale = async () => {
    try {
      const response = await fetch('/api/vendas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems,
          total,
          data: new Date().toISOString()
        })
      });
      if (response.ok) {
        setCartItems([]);
        setTotal(0);
      }
    } catch (error) {
      console.error('Erro ao finalizar venda:', error);
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="bg-zinc-800">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Serviços</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Serviços serão carregados aqui */}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Produtos</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Produtos serão carregados aqui */}
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
                disabled={cartItems.length === 0}
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

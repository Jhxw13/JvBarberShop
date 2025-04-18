
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Configuracoes() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Configurações</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-zinc-800">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Informações da Barbearia</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Nome da Barbearia</label>
                <input
                  type="text"
                  className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2"
                  defaultValue="JV Barber Shop"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Endereço</label>
                <input
                  type="text"
                  className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2"
                  defaultValue="Rua Example, 123"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Telefone</label>
                <input
                  type="text"
                  className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2"
                  defaultValue="(11) 99999-9999"
                />
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Salvar Alterações
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Horário de Funcionamento</h2>
            <div className="space-y-4">
              {["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"].map((dia) => (
                <div key={dia} className="flex items-center justify-between">
                  <span className="text-zinc-400">{dia}</span>
                  <div className="flex gap-2">
                    <input
                      type="time"
                      className="bg-zinc-700 border border-zinc-600 rounded-lg px-2 py-1"
                      defaultValue="09:00"
                    />
                    <span className="text-zinc-400">até</span>
                    <input
                      type="time"
                      className="bg-zinc-700 border border-zinc-600 rounded-lg px-2 py-1"
                      defaultValue="19:00"
                    />
                  </div>
                </div>
              ))}
              <Button className="w-full bg-purple-600 hover:bg-purple-700 mt-4">
                Atualizar Horários
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Notificações</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Lembretes de Agendamento</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-purple-600" />
              </div>
              <div className="flex items-center justify-between">
                <span>Alertas de Estoque Baixo</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-purple-600" />
              </div>
              <div className="flex items-center justify-between">
                <span>Relatórios Semanais</span>
                <input type="checkbox" className="w-5 h-5 accent-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Backup e Segurança</h2>
            <div className="space-y-4">
              <p className="text-zinc-400">Último backup: 20/02/2024 às 23:00</p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Fazer Backup Agora
              </Button>
              <Button variant="outline" className="w-full border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white">
                Restaurar Backup
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

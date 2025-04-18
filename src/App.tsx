
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import PDV from "./pages/PDV/PDV";
import Agendamentos from "./pages/Agendamentos/Agendamentos";
import Clientes from "./pages/Clientes/Clientes";
import Servicos from "./pages/Servicos/Servicos";
import Barbeiros from "./pages/Barbeiros/Barbeiros";
import Produtos from "./pages/Produtos/Produtos";
import Financeiro from "./pages/Financeiro/Financeiro";
import Relatorios from "./pages/Relatorios/Relatorios";
import Configuracoes from "./pages/Configuracoes/Configuracoes";

function App() {
  return (
    <div className="flex bg-zinc-950 text-zinc-100">
      <Sidebar />
      <div className="flex-1 ml-20">
        <main className="p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pdv" element={<PDV />} />
            <Route path="/agendamentos" element={<Agendamentos />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/barbeiros" element={<Barbeiros />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/financeiro" element={<Financeiro />} />
            <Route path="/relatorios" element={<Relatorios />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;

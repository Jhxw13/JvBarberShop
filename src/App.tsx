
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
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
    <div className="flex h-screen bg-gradient-to-br from-dark-300 via-dark-200 to-dark-100">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
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
  );
}

export default App;


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Agendamentos from "./pages/Agendamentos/Agendamentos";
import Clientes from "./pages/Clientes/Clientes";
import Servicos from "./pages/Servicos/Servicos";

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gradient-to-br from-dark-300 via-dark-200 to-dark-100">
        <Sidebar />
        <main className="flex-1 overflow-auto p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/agendamentos" element={<Agendamentos />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/servicos" element={<Servicos />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

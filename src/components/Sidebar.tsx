
import { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  Scissors,
  Package,
  DollarSign,
  FileText,
  Settings,
  Menu,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "PDV", icon: DollarSign, path: "/pdv" },
  { name: "Agendamentos", icon: CalendarCheck, path: "/agendamentos" },
  { name: "Clientes", icon: Users, path: "/clientes" },
  { name: "Barbeiros", icon: Scissors, path: "/barbeiros" },
  { name: "Serviços", icon: Scissors, path: "/servicos" },
  { name: "Produtos", icon: Package, path: "/produtos" },
  { name: "Financeiro", icon: DollarSign, path: "/financeiro" },
  { name: "Relatórios", icon: FileText, path: "/relatorios" },
  { name: "Configurações", icon: Settings, path: "/configuracoes" },
];

const Sidebar = () => {
  const { pathname } = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-72'} transition-all duration-300 bg-zinc-900 border-r border-zinc-800 p-4 flex flex-col fixed h-screen`}>
      <div className="flex items-center justify-between mb-6">
        {!isCollapsed && <h1 className="text-2xl font-bold text-purple-500">JV</h1>}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-zinc-800 rounded-lg"
        >
          <Menu size={24} className="text-zinc-400" />
        </button>
      </div>
      
      <nav className="space-y-2 flex-1">
        {navItems.map(({ name, icon: Icon, path }) => (
          <Link
            key={name}
            to={path}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
              pathname === path
                ? "bg-purple-500/10 text-purple-500"
                : "text-zinc-400 hover:bg-zinc-800"
            }`}
          >
            <Icon size={20} />
            {!isCollapsed && <span>{name}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

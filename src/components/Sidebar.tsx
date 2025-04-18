
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
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-72'} transition-all duration-300 min-h-screen bg-dark-200/50 backdrop-blur-sm border-r border-accent-purple/20 p-6`}>
      <div className="flex items-center justify-between mb-10">
        {!isCollapsed && <h1 className="text-2xl font-bold text-accent-purple bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">JV</h1>}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-zinc-400 hover:text-accent-purple"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-10 text-accent-purple bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        JV Barber Shop
      </h1>
      <nav className="space-y-2">
        {navItems.map(({ name, icon: Icon, path }) => (
          <Link
            key={name}
            to={path}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-accent-purple/10 hover:shadow-glow group ${
              pathname === path
                ? "bg-accent-purple/20 text-accent-purple"
                : "text-zinc-400"
            }`}
          >
            <Icon size={20} className="group-hover:text-accent-purple" />
            {!isCollapsed && <span className="group-hover:text-accent-purple">{name}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

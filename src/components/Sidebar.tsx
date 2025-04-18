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
  import { Link, useLocation } from "react-router-dom";
  
  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
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
  
    return (
      <aside className="w-64 bg-zinc-950 p-6 flex flex-col border-r border-zinc-800">
        <h1 className="text-2xl font-bold mb-10 text-purple-500">JV Barber Shop</h1>
        <nav className="space-y-2">
          {navItems.map(({ name, icon: Icon, path }) => (
            <Link
              key={name}
              to={path}
              className={`flex items-center gap-3 p-2 rounded-md hover:bg-zinc-800 transition ${
                pathname === path ? "bg-zinc-800 text-purple-400" : "text-zinc-300"
              }`}
            >
              <Icon size={20} />
              <span>{name}</span>
            </Link>
          ))}
        </nav>
      </aside>
    );
  };
  
  export default Sidebar;
  
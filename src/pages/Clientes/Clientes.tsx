
const Clientes = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Clientes
        </h1>
        <button className="px-4 py-2 bg-accent-purple/20 rounded-lg hover:shadow-glow transition-all duration-300 text-accent-purple">
          Novo Cliente
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Cards de exemplo */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 rounded-xl bg-dark-200/50 backdrop-blur-sm border border-accent-purple/20 hover:shadow-glow transition-all duration-300">
            <h3 className="text-lg font-semibold text-white">Cliente {i}</h3>
            <p className="text-zinc-400">Último corte: 15/02/2024</p>
            <p className="text-zinc-400">Serviços preferidos: Corte + Barba</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clientes;

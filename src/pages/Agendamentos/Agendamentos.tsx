
const Agendamentos = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Agendamentos
        </h1>
        <button className="px-4 py-2 bg-accent-purple/20 rounded-lg hover:shadow-glow transition-all duration-300 text-accent-purple">
          Novo Agendamento
        </button>
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 rounded-xl bg-dark-200/50 backdrop-blur-sm border border-accent-purple/20 hover:shadow-glow transition-all duration-300">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-white">Cliente {i}</h3>
                <p className="text-zinc-400">Corte + Barba</p>
              </div>
              <div className="text-right">
                <p className="text-accent-purple">14:00 - 15:00</p>
                <p className="text-zinc-400">Hoje</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Agendamentos;


const Servicos = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Serviços
        </h1>
        <button className="px-4 py-2 bg-accent-purple/20 rounded-lg hover:shadow-glow transition-all duration-300 text-accent-purple">
          Novo Serviço
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { nome: "Corte Masculino", preco: "R$ 45,00" },
          { nome: "Barba", preco: "R$ 35,00" },
          { nome: "Corte + Barba", preco: "R$ 70,00" }
        ].map((servico, i) => (
          <div key={i} className="p-6 rounded-xl bg-dark-200/50 backdrop-blur-sm border border-accent-purple/20 hover:shadow-glow transition-all duration-300">
            <h3 className="text-lg font-semibold text-white">{servico.nome}</h3>
            <p className="text-accent-purple text-xl mt-2">{servico.preco}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Servicos;

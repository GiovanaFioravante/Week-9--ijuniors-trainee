import type { OrdemServico, OSStatus } from "../types";

//indica ao TypeScript as funções e dados recebidas do arquivo pai
interface ServiceCardProps {
  os: OrdemServico;
  onUpdateStatus: (id: string, novoStatus: OSStatus) => void;
  onDeleteOS: (id: string) => void;
}

export function ServiceCard({ os, onUpdateStatus, onDeleteOS }: ServiceCardProps) {
  //guarda as cores do Tailwind para cada status
  const statusStyles = {
    'Aberto': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Em Andamento': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Finalizado': 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
  };

  return (
    <div className="bg-zinc-800 border border-zinc-700/50 rounded-xl p-5 shadow-sm hover:border-zinc-600 transition-all flex flex-col justify-between gap-4 relative group">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-mono text-zinc-500">#{os.id.substring(0, 6)}</span>
          
          <div className="flex items-center gap-2">
            <select
              value={os.status}
              onChange={(e) => onUpdateStatus(os.id, e.target.value as OSStatus)}
              className={`text-xs px-2 py-0.5 rounded-full font-medium border bg-zinc-900 cursor-pointer focus:outline-none ${statusStyles[os.status]}`}
            >
              <option value="Aberto">Aberto</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Finalizado">Finalizado</option>
            </select>

            <button
              onClick={() => onDeleteOS(os.id)}
              title="Excluir Ordem de Serviço"
              className="text-zinc-500 hover:text-red-400 p-1 rounded transition-colors text-xs font-semibold cursor-pointer"
            >
              Excluir
            </button>
          </div>
        </div>

        <h3 className="font-semibold text-zinc-100 text-lg leading-tight mb-1">
          {os.aparelho}
        </h3>
        <p className="text-sm text-zinc-400 font-medium mb-3">
          Cliente: <span className="text-zinc-300">{os.cliente}</span>
        </p>
      </div>

      <div className="bg-zinc-900/50 rounded-lg p-3 border border-zinc-700/30">
        <span className="text-xs text-zinc-500 block mb-1 font-medium">Defeito relatado:</span>
        <p className="text-sm text-zinc-300 italic">"{os.defeito}"</p>
      </div>
    </div>
  );
}
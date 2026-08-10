import { useState } from "react";
import type { OSStatus } from "../types";

interface NewServiceFormProps {
  onAddOS: (cliente: string, aparelho: string, defeito: string, status: OSStatus) => void;
}

export function NewServiceForm({ onAddOS }: NewServiceFormProps) {
  //estados locais para controle temporário do que é digitado nos inputs antes de salvar
  const [cliente, setCliente] = useState("");
  const [aparelho, setAparelho] = useState("");
  const [defeito, setDefeito] = useState("");
  const [status, setStatus] = useState<OSStatus>("Aberto");

  //acionada pelo botão ou "Enter"
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); //impede recarregamentos não solicitados

    //impede envio deespaços vazios
    if (!cliente.trim() || !aparelho.trim() || !defeito.trim()) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    //transmissão dos dados para salvar na lista principal
    onAddOS(cliente, aparelho, defeito, status);

    //zera o formulário para próximo cadastro
    setCliente("");
    setAparelho("");
    setDefeito("");
    setStatus("Aberto");
  }

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 border border-zinc-700/50 p-6 rounded-xl shadow-md h-fit flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-orange-300/90 border-b border-zinc-700 pb-2">
        Nova Ordem de Serviço
      </h3>

      <div>
        <label className="text-xs font-medium text-zinc-400 block mb-1">Nome do Cliente</label>
        <input
          type="text"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          placeholder="Ex: João Silva"
          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-400/50 transition-colors"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-zinc-400 block mb-1">Aparelho / Modelo</label>
        <input
          type="text"
          value={aparelho}
          onChange={(e) => setAparelho(e.target.value)}
          placeholder="Ex: iPhone 14 Pro Max"
          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-400/50 transition-colors"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-zinc-400 block mb-1">Status Inicial</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as OSStatus)}
          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-orange-400/50 transition-colors"
        >
          <option value="Aberto">Aberto</option>
          <option value="Em Andamento">Em Andamento</option>
          <option value="Finalizado">Finalizado</option>
        </select>
      </div>

      <div>
        <label className="text-xs font-medium text-zinc-400 block mb-1">Defeito Relatado</label>
        <textarea
          value={defeito}
          onChange={(e) => setDefeito(e.target.value)}
          placeholder="Descreva o problema detalhadamente..."
          rows={3}
          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-400/50 transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-orange-400/80 hover:bg-orange-400 text-zinc-950 font-semibold text-sm py-2.5 px-4 rounded-lg transition-colors cursor-pointer mt-2"
      >
        Salvar Ordem de Serviço
      </button>
    </form>
  );
}
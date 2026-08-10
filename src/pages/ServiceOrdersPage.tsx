import { useState, useEffect } from "react";
import axios from "axios";
import { getAllServiceOrders, createServiceOrder, deleteServiceOrder } from "../services/serviceOrderService";
import { getAllClients } from "../services/clientService";
import type { ServiceOrder, Client, ServiceOrderStatus } from "../types";

export function ServiceOrdersPage() {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [clientIdForm, setClientIdForm] = useState<number | "">("");
  const [device, setDevice] = useState("");
  const [issue, setIssue] = useState("");
  const [status, setStatus] = useState<ServiceOrderStatus>("open");

  useEffect(() => {
    async function loadData() {
      try {
        const [ordersData, clientsData] = await Promise.all([
          getAllServiceOrders(),
          getAllClients()
        ]);
        setOrders(ordersData);
        setClients(clientsData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  async function handleAddOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!clientIdForm || !device || !issue) {
      alert("Por favor, preencha todos os campos e selecione um cliente!");
      return;
    }

    try {
      const newOrder = await createServiceOrder({
        clientId: Number(clientIdForm),
        device,
        issue,
        status
      });
      setOrders([newOrder, ...orders]);
      
      setClientIdForm("");
      setDevice("");
      setIssue("");
      setStatus("open");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Motivo da recusa da API:", error.response?.data);
      } else {
        console.error("Erro ao criar OS:", error);
      }
    }
  }

  async function handleDeleteOrder(id: number) {
    const confirmar = window.confirm("Tem certeza que deseja excluir esta OS?");
    if (confirmar) {
      try {
        await deleteServiceOrder(id);
        setOrders(orders.filter(o => o.id !== id));
      } catch (error) {
        console.error("Erro ao excluir OS:", error);
      }
    }
  }

  if (isLoading) {
    return <h2 className="text-xl text-orange-300">Carregando Ordens de Serviço...</h2>;
  }

  const statusLabels = {
    'open': 'Aberto',
    'in_progress': 'Em Andamento',
    'done': 'Finalizado'
  };

  const statusStyles = {
    'open': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'in_progress': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'done': 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      
      <div className="lg:col-span-1 bg-zinc-800 p-6 rounded-xl border border-zinc-700/50 shadow-md flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-orange-300/90 border-b border-zinc-700 pb-2">Nova OS</h3>
        <form onSubmit={handleAddOrder} className="flex flex-col gap-4">
          
          <div>
            <label className="text-xs font-medium text-zinc-400 block mb-1">Cliente</label>
            <select
              value={clientIdForm}
              onChange={e => setClientIdForm(Number(e.target.value))}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100"
            >
              <option value="" disabled>Selecione um cliente...</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-400 block mb-1">Aparelho</label>
            <input 
              type="text" 
              value={device} 
              onChange={e => setDevice(e.target.value)} 
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-400 block mb-1">Status Inicial</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value as ServiceOrderStatus)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100"
            >
              <option value="open">Aberto</option>
              <option value="in_progress">Em Andamento</option>
              <option value="done">Finalizado</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-400 block mb-1">Defeito</label>
            <textarea 
              value={issue} 
              onChange={e => setIssue(e.target.value)} 
              rows={3}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 resize-none"
            />
          </div>

          <button type="submit" className="w-full bg-orange-400/80 hover:bg-orange-400 text-zinc-950 font-semibold text-sm py-2.5 rounded-lg mt-2 cursor-pointer transition-colors">
            Salvar Ordem de Serviço
          </button>
        </form>
      </div>

      <div className="lg:col-span-2">
        <h2 className="text-xl font-semibold mb-4 text-orange-300/90">
          OS Ativas ({orders.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orders.length === 0 ? (
            <p className="text-zinc-400 text-sm col-span-2">Nenhuma OS registrada.</p>
          ) : (
            orders.map(order => {
              const clientName = clients.find(c => c.id === order.clientId)?.name || "Cliente Desconhecido";

              return (
                <div key={order.id} className="bg-zinc-800 border border-zinc-700/50 rounded-xl p-5 shadow-sm flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-mono text-zinc-500">#{String(order.id).padStart(4, '0')}</span>
                      <div className="flex gap-2 items-center">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${statusStyles[order.status]}`}>
                          {statusLabels[order.status]}
                        </span>
                        <button onClick={() => handleDeleteOrder(order.id)} className="text-zinc-500 hover:text-red-400 text-xs font-semibold cursor-pointer">
                          Excluir
                        </button>
                      </div>
                    </div>
                    <h3 className="font-semibold text-zinc-100 text-lg leading-tight mb-1">{order.device}</h3>
                    <p className="text-sm text-zinc-400 font-medium mb-3">Cliente: <span className="text-zinc-300">{clientName}</span></p>
                  </div>
                  <div className="bg-zinc-900/50 rounded-lg p-3 border border-zinc-700/30">
                    <span className="text-xs text-zinc-500 block mb-1 font-medium">Defeito:</span>
                    <p className="text-sm text-zinc-300 italic">"{order.issue}"</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      
    </div>
  );
}
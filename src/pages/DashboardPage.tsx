import { useState, useEffect } from "react";
import { getAllServiceOrders, deleteServiceOrder } from "../services/serviceOrderService";
import { getAllClients } from "../services/clientService";
import type { ServiceOrder, Client } from "../types";

export function DashboardPage() {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [ordersData, clientsData] = await Promise.all([
          getAllServiceOrders(),
          getAllClients()
        ]);
        setOrders(ordersData);
        setClients(clientsData);
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadDashboardData();
  }, []);

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
    return <h2 className="text-xl text-orange-300">Carregando Painel Geral...</h2>;
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
    <div>
      <h2 className="text-xl font-semibold mb-6 text-orange-300/90 border-b border-zinc-700 pb-3">
        Painel Geral - Ordens de Serviço Ativas ({orders.length})
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.length === 0 ? (
          <p className="text-zinc-400 text-sm">Nenhuma Ordem de Serviço registrada no momento.</p>
        ) : (
          orders.map(order => {
            const clientName = clients.find(c => c.id === order.clientId)?.name || "Cliente Desconhecido";

            return (
              <div key={order.id} className="bg-zinc-800 border border-zinc-700/50 rounded-xl p-5 shadow-sm hover:border-zinc-600 transition-all flex flex-col justify-between gap-4">
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
  );
}
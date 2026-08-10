import { useState, useEffect } from "react";
import { getAllClients, createClient, deleteClient } from "../services/clientService";
import type { Client } from "../types";

export function ClientsPage() {
  // Estado da lista de clientes vindos da API
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Estados para capturar o que o usuário digita no formulário
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // O useEffect roda uma única vez ([]) quando a página é acessada
  useEffect(() => {
    async function fetchClients() {
      try {
        const data = await getAllClients(); // Busca na API
        setClients(data); // Salva no estado da tela
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      } finally {
        setIsLoading(false); // Remove o texto "Carregando..."
      }
    }
    fetchClients();
  }, []);

  // Função para lidar com o envio do formulário
  async function handleAddClient(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !phone || !email) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    try {
      // 1. Envia para a API criar no banco de dados
      const newClient = await createClient({ name, phone, email });
      // 2. Atualiza a lista na tela imediatamente
      setClients([newClient, ...clients]);
      
      // 3. Limpa os campos
      setName("");
      setPhone("");
      setEmail("");
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
    }
  }

  // Função para deletar cliente
  async function handleDeleteClient(id: number) {
    const confirmar = window.confirm("Tem certeza que deseja excluir este cliente?");
    if (confirmar) {
      try {
        await deleteClient(id); // Deleta na API
        setClients(clients.filter(c => c.id !== id)); // Remove da tela
      } catch (error) {
        console.error("Erro ao excluir cliente:", error);
      }
    }
  }

  // Se a API ainda não respondeu, mostra isso
  if (isLoading) {
    return <h2 className="text-xl text-orange-300">Carregando Clientes...</h2>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      
      {/* Coluna 1: Formulário */}
      <div className="lg:col-span-1 bg-zinc-800 p-6 rounded-xl border border-zinc-700/50 shadow-md flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-orange-300/90 border-b border-zinc-700 pb-2">Novo Cliente</h3>
        <form onSubmit={handleAddClient} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-zinc-400 block mb-1">Nome Completo</label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-400 block mb-1">Telefone</label>
            <input 
              type="text" 
              value={phone} 
              onChange={e => setPhone(e.target.value)} 
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-400 block mb-1">E-mail</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100"
            />
          </div>
          <button type="submit" className="w-full bg-orange-400/80 hover:bg-orange-400 text-zinc-950 font-semibold text-sm py-2.5 rounded-lg mt-2 cursor-pointer transition-colors">
            Cadastrar Cliente
          </button>
        </form>
      </div>

      {/* Coluna 2: Lista da API */}
      <div className="lg:col-span-2">
        <h2 className="text-xl font-semibold mb-4 text-orange-300/90">
          Clientes Cadastrados ({clients.length})
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {clients.length === 0 ? (
            <p className="text-zinc-400 text-sm">Nenhum cliente cadastrado ainda.</p>
          ) : (
            clients.map(client => (
              <div key={client.id} className="bg-zinc-800 border border-zinc-700/50 rounded-xl p-5 shadow-sm flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-zinc-100 text-lg mb-1">{client.name}</h3>
                  <p className="text-sm text-zinc-400">{client.email} • {client.phone}</p>
                </div>
                <button onClick={() => handleDeleteClient(client.id)} className="text-zinc-500 hover:text-red-400 text-xs font-semibold cursor-pointer">
                  Excluir
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      
    </div>
  );
}
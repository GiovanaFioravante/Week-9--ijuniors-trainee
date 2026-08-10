import { Outlet, Link } from "react-router";
import { Header } from "./Header";

export function MainLayout() {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 flex flex-col">
      <Header />
      
      {/* Navegação de Rotas */}
      <nav className="bg-zinc-800 border-b border-zinc-700 px-6 py-3 flex gap-6">
        <Link to="/" className="text-sm font-medium text-zinc-300 hover:text-orange-400 transition-colors">Dashboard</Link>
        <Link to="/clients" className="text-sm font-medium text-zinc-300 hover:text-orange-400 transition-colors">Clientes</Link>
        <Link to="/service-orders" className="text-sm font-medium text-zinc-300 hover:text-orange-400 transition-colors">Ordens de Serviço</Link>
      </nav>

      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
import { useAuth } from "../contexts/AuthContext";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-zinc-800 border-b border-zinc-700 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold text-white tracking-wide">
          G.F. iRepair
        </h1>
      </div>

      <div className="flex items-center gap-4 text-sm text-zinc-400 font-medium">
        {user?.email}
        <button
          onClick={logout}
          className="text-zinc-500 hover:text-red-400 text-xs font-semibold cursor-pointer"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
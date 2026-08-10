export function Header() {
  return (
    <header className="bg-zinc-800 border-b border-zinc-700 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">

        <h1 className="text-xl font-bold text-white tracking-wide">
          G.F. iRepair
        </h1>
      </div>

      <div className="flex items-center gap-2 text-sm text-zinc-400 font-medium">
        Painel do Técnico
      </div>
    </header>
  );
}
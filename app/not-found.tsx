import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[50vh] grid place-items-center text-center space-y-4">
      <h1 className="text-4xl font-bold">404 — Página no encontrada</h1>
      <p className="text-slate-400">La ruta que buscaste no existe o fue movida.</p>
      <div className="flex gap-3 justify-center">
        <Link href="/" className="rounded-xl px-5 py-3 border border-white/10 hover:border-white/20 transition">
          Ir al inicio
        </Link>
        <Link href="/proyectos" className="rounded-xl px-5 py-3 border border-primary/40 hover:border-primary/70 transition">
          Ver proyectos
        </Link>
      </div>
    </div>
  );
}

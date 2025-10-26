import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "../../../data/projects";

// Opción A: usando async/await
export default async function ProyectoDetalle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // 👈 params es Promise en Next 16
  const norm = slug.trim().toLowerCase();

  const p = projects.find((x) => x.slug.trim().toLowerCase() === norm);
  if (!p) {
    // Si querés mostrar una página 404 de Next:
    // return notFound();
    // O mantener el debug:
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">⚠️ No se encontró el proyecto</h1>
        <p><b>Slug recibido:</b> {norm || "(vacío)"}</p>
        <p><b>Slugs disponibles:</b> {projects.map((x) => x.slug).join(", ")}</p>
        <Link href="/proyectos" className="inline-flex items-center rounded-xl px-4 py-2 border border-white/10 hover:border-white/20 transition">
          ← Volver a proyectos
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <nav className="text-sm text-slate-400">
        <Link href="/" className="hover:text-white">Inicio</Link> <span>/</span>{" "}
        <Link href="/proyectos" className="hover:text-white">Proyectos</Link> <span>/</span>{" "}
        <span className="text-white">{p.title}</span>
      </nav>

      <header className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{p.title}</h1>
        <p className="text-slate-400 max-w-2xl">{p.description}</p>
        <div className="flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span key={s} className="text-xs px-2 py-1 rounded-lg border border-white/10">{s}</span>
          ))}
          <span className="text-xs px-2 py-1 rounded-lg border border-white/10">{p.year}</span>
        </div>
      </header>
    </div>
  );
}

/* --------
   Opción B (equivalente): usar `use()` de React
   import { use } from "react";
   export default function ProyectoDetalle({ params }: { params: Promise<{ slug: string }>}) {
     const { slug } = use(params);
     ...
   }
--------- */

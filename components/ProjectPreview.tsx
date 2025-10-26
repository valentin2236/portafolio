"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export type Project = {
  slug: string;
  title: string;
  description: string;
  year: string;
  stack: string[];
  image?: string;
  repo?: string;
  demo?: string;
  url?: string;
};

export function ProjectPreview({ projects }: { projects: Project[] }) {
  const featured = projects.slice(0, 2);

  return (
    <section className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-semibold">Proyectos destacados</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {featured.map((p, i) => (
          <motion.div
            key={p.slug}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.25 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] group"
          >
            <div className="relative h-56">
              <Image
                src={p.image ?? "/proyectos/default.jpg"}
                alt={p.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500 pointer-events-none"
                sizes="(min-width: 768px) 50vw, 100vw"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0  transition-opacity pointer-events-none" />
            </div>

            <div className="p-4 flex items-end justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="text-sm text-slate-400 line-clamp-2">{p.description}</p>
              </div>

              {p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 px-3 py-1.5 text-sm border border-primary/40 rounded-lg hover:border-primary transition bg-black/30 backdrop-blur-[1px]"
                >
                  Ver más
                </a>
              ) : (
                <Link
                  href={`/proyectos/${p.slug}`}
                  className="shrink-0 px-3 py-1.5 text-sm border border-primary/40 rounded-lg hover:border-primary transition bg-black/30 backdrop-blur-[1px]"
                >
                  Ver más
                </Link>
              )}
            </div>

            <motion.div
              className="absolute inset-0 border-2 border-primary/60 rounded-2xl opacity-0 group-hover:opacity-100 blur-[2px] pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ProjectsHero } from "@/components/ProjectsHero";
import { projects } from "@/data/projects";

export default function ProyectosPage() {
  const gallery = projects.slice(0, 6);
  const sizes = ["col-span-2 row-span-2", "col-span-1", "col-span-1", "col-span-2", "col-span-1", "col-span-1"];

  return (
    <div className="space-y-16">
      <ProjectsHero />

      <section id="grid" className="space-y-8">
        <h2 className="text-2xl md:text-3xl font-semibold">Proyectos</h2>

        <motion.div
          className="grid sm:grid-cols-3 auto-rows-[180px] sm:auto-rows-[220px] gap-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {gallery.map((p, i) => (
            <motion.div
              key={p.slug}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.9 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
              }}
              whileHover={{ scale: 1.04 }}
              className={`relative group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] ${sizes[i % sizes.length]}`}
            >
              {/* Imagen (no captura clicks) */}
              <Image
                src={p.image ?? "/proyectos/default.jpg"}
                alt={p.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-110 pointer-events-none"
                priority={i < 3}
              />

              {/* Overlay (visual, no bloquea clicks) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />

              {/* Contenido interactivo arriba de todo */}
              <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end z-10">
                <div>
                  <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                  <p className="text-sm text-slate-400">{p.year}</p>
                </div>

                {/* Botón dinámico */}
                {p.url ? (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-sm border border-primary/40 rounded-lg hover:border-primary transition bg-black/30 backdrop-blur-[1px]"
                  >
                    Ver
                  </a>
                ) : (
                  <Link
                    href={`/proyectos/${p.slug}`}
                    className="px-3 py-1.5 text-sm border border-primary/40 rounded-lg hover:border-primary transition bg-black/30 backdrop-blur-[1px]"
                  >
                    Ver
                  </Link>
                )}
              </div>

              {/* Glow verde (visual, no bloquea) */}
              <motion.div
                className="absolute inset-0 border-2 border-primary/60 rounded-2xl opacity-0 group-hover:opacity-100 blur-[2px] pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}

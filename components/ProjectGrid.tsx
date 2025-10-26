"use client";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import type { Project } from "../data/projects";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
};

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="show"
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {projects.map((p) => (
        <motion.li
          key={p.url}
          variants={item}
          whileHover={{ y: -4 }}
          className="card"
        >
          <h3 className="font-semibold">{p.title}</h3>
          <p className="text-sm text-slate-400 mt-1">{p.description}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span
                key={s}
                className="text-xs px-2 py-1 rounded-lg border border-white/10"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-4">
            <Link
              href={`/proyectos/${p.url}`}
              className="inline-flex items-center rounded-xl px-4 py-2 border border-primary/40 hover:border-primary/70 transition"
            >
              Ver detalle
            </Link>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
}

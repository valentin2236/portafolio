"use client";
import { motion } from "framer-motion";

type Item = {
  company: string;
  role: string;
  period: string;
  bullets: string[];
};

const items: Item[] = [
  {
    company: "Freelance",
    role: "Frontend Developer",
    period: "2023 — Presente",
    bullets: [
      "Landing pages y dashboards con Next.js",
      "Animaciones y microinteracciones (Framer Motion)",
      "Mejora de rendimiento (LCP/FCP, imágenes, SSR)"
    ],
  },
  {
    company: "Proyecto Personal",
    role: "UI Engineer",
    period: "2024 — 2025",
    bullets: [
      "Portafolio con 3D (React Three Fiber)",
      "Diseño visual y accesibilidad",
      "Integración con email/Resend para contacto"
    ],
  },
];

export function ExperienceTimeline() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-semibold">Experiencia</h2>
      <div className="relative pl-6">
        {/* línea vertical */}
        <div className="absolute left-2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/70 to-transparent" />
        <div className="space-y-8">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-primary shadow-[0_0_12px] shadow-primary/50" />
              <h3 className="font-semibold">{it.role} · <span className="text-primary">{it.company}</span></h3>
              <p className="text-xs text-slate-400 mb-2">{it.period}</p>
              <ul className="text-slate-300 list-disc ml-4 space-y-1">
                {it.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

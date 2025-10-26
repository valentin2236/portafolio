"use client";
import { motion, Variants } from "framer-motion";
import { Accessibility, GaugeCircle, LayoutGrid, Rocket, CodeXml } from "lucide-react";

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
};

const cards = [
  {
    icon: LayoutGrid,
    title: "Desarrollo Web",
    desc: "Creacion de paginas web modernas y responsivas con HTML5, CSS y JavaScript",
  },
  {
    icon: CodeXml,
    title: "Soporte Tecnico",
    desc: "Mantenimiento de PC, solucion de problemas tecnicos y asesoramiento informatico.",
  },
  {
    icon: GaugeCircle,
    title: "Diseño Grafico",
    desc: "Diseños personalizados en Canva: logos, flayers y publicaciones para redes sociales",
  },
];

export function WhatIDo() {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Rocket className="w-5 h-5 text-primary" />
        <h2 className="text-2xl md:text-3xl font-semibold">Lo que hago</h2>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {cards.map(({ icon: Icon, title, desc }) => (
          <motion.div
            key={title}
            variants={item}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <div className="flex items-center gap-3">
              <span className="inline-grid place-items-center w-10 h-10 rounded-xl border border-white/10 bg-white/5">
                <Icon className="w-5 h-5 text-primary" />
              </span>
              <h3 className="font-semibold">{title}</h3>
            </div>
            <p className="text-slate-400 mt-2">{desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export function AboutTeaser() {
  return (
    <section className="grid lg:grid-cols-[1.2fr_.8fr] gap-8 items-center">
      <div className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-semibold">Un poco sobre mí</h2>
        <p className="text-slate-400 max-w-2xl">
          Soy un desarrollador web y técnico en informática con formación
           en programación Full-Stack. Me apasiona crear soluciones digitales
            que combinen funcionalidad con diseño atractivo.
        </p>
        <Link href="/sobre-mi" className="rounded-xl px-5 py-3 border border-white/10 hover:border-white/20 transition inline-block">
          Conocer más
        </Link>
      </div>

      <motion.div
        className="rounded-2xl border border-white/10 bg-white/5 p-6"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.3 }}
      >
        <ul className="space-y-2 text-sm text-slate-300">
          <li>• HTML, CSS y JavaScript</li>
          <li>• TailwindCSS, Bootstrap</li>
          <li>• Accesibilidad y performance</li>
          <li>• Integraciones (APIs, emailing, forms)</li>
        </ul>
      </motion.div>
    </section>
  );
}

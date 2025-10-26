"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export function ContactCTA() {
  return (
    <motion.section
      className="rounded-2xl border border-white/10 bg-gradient-to-tr from-primary/10 via-transparent to-transparent p-6 md:p-8"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-xl md:text-2xl font-semibold">¿Tenés una idea o proyecto?</h3>
          <p className="text-slate-400">Hablemos sobre cómo puedo ayudarte a construirlo.</p>
        </div>
        <Link href="/contacto" className="rounded-xl px-5 py-3 border border-primary/40 hover:border-primary/70 transition">
          Ir a contacto
        </Link>
      </div>
    </motion.section>
  );
}

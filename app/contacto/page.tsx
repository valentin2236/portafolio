// app/contacto/page.tsx
"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Github, Linkedin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

export default function ContactoPage() {
  return (
    <main className="relative max-w-5xl mx-auto px-4 py-16 space-y-24">
      {/* Fondo animado (detrás del contenido) */}

      {/* HEADER */}
      <section className="text-center space-y-6">
        <motion.h1
          className="text-4xl md:text-5xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contacto
        </motion.h1>
        <motion.p
          className="text-slate-400 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Si querés colaborar, proponer un proyecto o simplemente saludar, ¡mandame un mensaje!
        </motion.p>
      </section>

      {/* INFO RÁPIDA */}
      <section className="grid md:grid-cols-3 gap-8 text-center">
        {[
          {
            icon: <Phone size={28} />,
            title: "Telefono",
            value: "3863 56 2084",
            href: "tel:+54 3863 56 2084",
          },
          {
            icon: <MapPin size={28} />,
            title: "Ubicación",
            value: "Monteros, Tucumán, Argentina",
          },
          {
            icon: <Github size={28} />,
            title: "GitHub",
            value: "github.com/valentin2236",
            href: "https://github.com/valentin2236",
          },
        ].map((info, i) => (
          <motion.a
            key={i}
            href={info.href || "#"}
            target={info.href ? "_blank" : undefined}
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="group p-6 rounded-xl border border-white/10 hover:border-primary/60 transition flex flex-col items-center gap-2"
          >
            <div className="text-primary">{info.icon}</div>
            <p className="text-slate-200 font-semibold">{info.title}</p>
            <p className="text-slate-400 text-sm group-hover:text-slate-300 transition">
              {info.value}
            </p>
          </motion.a>
        ))}
      </section>

      {/* FORMULARIO IMPORTADO */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto space-y-6"
      >
        <h2 className="text-center text-2xl font-semibold text-primary">Enviame un mensaje</h2>
        <ContactForm />
      </motion.section>

      {/* REDES SOCIALES */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-3"
      >
        <p className="text-slate-400">También podés encontrarme en</p>
        <div className="flex justify-center gap-6">
          <a href="https://www.linkedin.com/in/valentin-arriola-53950a21a/" target="_blank" rel="noopener noreferrer">
            <Linkedin className="text-slate-400 hover:text-primary transition" />
          </a>
          <a href="https://github.com/valentin2236" target="_blank" rel="noopener noreferrer">
            <Github className="text-slate-400 hover:text-primary transition" />
          </a>
        </div>
      </motion.section>
    </main>
  );
}

// app/sobre-mi/page.tsx
"use client";

import { motion } from "framer-motion";
import { Briefcase, Code, Users, Lightbulb, Cpu, Palette } from "lucide-react";
import { AboutHeader } from "@/components/AboutHeader";

export default function SobreMiPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-16 space-y-24">
      {/* Header con foto y texto — imagen a la izquierda */}
      <AboutHeader
        title="SOBRE MÍ"
        subtitle="Valentín Arriola"
        bio="Soy un desarrollador web y técnico en informática con formación en programación Full-Stack. Me apasiona crear soluciones digitales que combinen funcionalidad con diseño atractivo. Mi experiencia incluye desarrollo de páginas web, diseño gráfico en Canva, mantenimiento de equipos informáticos y atención al cliente. Me destaco por mi versatilidad y capacidad de adaptación a diferentes proyectos. Completé mi formación en Rolling-code (2020) donde me especialicé en tecnologías web modernas como HTML5, CSS y JavaScript. Busco constantemente aprender y mejorar mis habilidades técnicas."
        imageSrc="/fotovalentinarriola.png"
        reverse // imagen a la izquierda en desktop
      />

      {/* EXPERIENCIA LABORAL */}
      <section className="space-y-10">
        <h2 className="text-3xl font-semibold text-center">Experiencia laboral</h2>
        <div className="relative border-l border-primary/40 pl-10 space-y-10 max-w-3xl mx-auto">
          {[
            {
              cargo: "Desarrollador Web — Proyecto institutiona",
              empresa: "Proyecto institutional",
              periodo: "2025",
              tareas: [
                "Encargado del desarrollo front-end de un sitio institucional",
                "Implementación de diseño responsive, animaciones e interactividad",
                "Trabajo en equipo con videoconferencias mostrando avances, utilizando frameworks como Bootstrap y tecnologías HTML, CSS y JavaScript",
              ],
            },
            {
              cargo: "Repartidor",
              empresa: "Castillo SACIFIA",
              periodo: "2020 — 2023",
              tareas: [
                "Organización de entregas por zona y control de mercadería",
                "Atención al cliente personalizada durante el servicio.",
                "Manejo de depósito y logística",
                "Conducción de vehículo propio y trabajo en equipo"
              ],
            },
            {
              cargo: "Gerente",
              empresa: "Bar Familiar",
              periodo: "2022 — 2024",
              tareas: [
                "Administración general del local y supervisión del personal",
                "Control de caja, ingresos y egresos",
                "Manejo de stock y deposito",
                "Atención al cliente y apoyo en cocina"
              ],
            },
            {
              cargo: "Vendedor",
              empresa: "Coco Kids",
              periodo: " 2025",
              tareas: [
                "Atención al cliente personalizada y asesoramiento en compras",
                "Soporte en ventas y trabajo en equipo",
                "Control de stock y organización del deposito",
              ],
            },
            
          ].map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {/* Punto verde con mejor separación */}
              <div className="absolute -left-[25px] top-3 w-4 h-4 rounded-full bg-primary shadow-[0_0_12px] shadow-primary/50" />

              <h3 className="text-xl font-semibold mb-1">{exp.cargo}</h3>
              <p className="text-slate-400 text-sm mb-3">
                {exp.empresa} · {exp.periodo}
              </p>
              <ul className="text-slate-300 list-disc ml-5 space-y-1">
                {exp.tareas.map((t, j) => (
                  <li key={j}>{t}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HABILIDADES */}
      <section className="space-y-10">
        <h2 className="text-3xl font-semibold text-center">Habilidades</h2>

        {/* Técnicas */}
        <div className="text-center space-y-5">
          <h3 className="text-xl text-primary font-medium">Técnicas</h3>
          <div className="grid sm:grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
            {[
              { icon: <Code size={32} />, name: "HTML / CSS" },
              { icon: <Cpu size={32} />, name: "Node.js / Express" },
              { icon: <Palette size={32} />, name: "Tailwind / UI Design" },
              { icon: <Lightbulb size={32} />, name: "JavaScript / Animación" },
              { icon: <Briefcase size={32} />, name: "SQLite / API REST" },
              { icon: <Code size={32} />, name: "Git / LocalStorage" },
            ].map((skill, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center gap-2 p-4 border border-white/10 rounded-xl hover:border-primary/60 transition"
              >
                <div className="text-primary">{skill.icon}</div>
                <p className="text-slate-300 text-sm">{skill.name}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Blandas */}
        <div className="text-center space-y-5">
          <h3 className="text-xl text-primary font-medium">Blandas</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
            {[
              { icon: <Users size={28} />, name: "Trabajo en equipo" },
              { icon: <Lightbulb size={28} />, name: "Creatividad e innovación" },
              { icon: <Briefcase size={28} />, name: "Responsabilidad" },
              { icon: <Palette size={28} />, name: "Atención al detalle" },
              { icon: <Cpu size={28} />, name: "Resolución de problemas" },
              { icon: <Code size={28} />, name: "Aprendizaje constante" },
            ].map((skill, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.08 }}
                className="flex flex-col items-center gap-2 p-4 border border-white/10 rounded-xl hover:border-primary/60 transition"
              >
                <div className="text-primary">{skill.icon}</div>
                <p className="text-slate-300 text-sm">{skill.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="rounded-2xl border border-white/10 bg-gradient-to-tr from-primary/10 via-transparent to-transparent p-6 md:p-8">
       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
           <h3 className="text-xl md:text-2xl font-semibold">¿Trabajamos juntos?</h3>
           <p className="text-slate-400 mb-4">
             Me apasiona crear experiencias interactivas y visualmente atractivas.
             Si tenés un proyecto o idea, ¡hablemos!
           </p>
        </div>
          <a
            href="/contacto"
            className="rounded-xl px-5 py-3 border border-primary/40 hover:border-primary/70 transition"
          >
            Contactame
          </a>
      </div>
      </section>
    </main>
  );
}

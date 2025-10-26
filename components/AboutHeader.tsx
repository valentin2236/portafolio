"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useCallback } from "react";

type Props = {
  title?: string;
  subtitle?: string;
  bio?: string;
  imageSrc?: string;
  reverse?: boolean; // true => imagen a la izquierda (en desktop)
};

export function AboutHeader({
  title = "Sobre mí",
  subtitle = "Valentín Arriola",
  bio = "Soy un desarrollador web y técnico en informática con formación en programación Full-Stack. Me apasiona crear soluciones digitales que combinen funcionalidad con diseño atractivo.",
  imageSrc = "/fotovalentinarriola.png",
  reverse = false,
}: Props) {
  // Tilt 3D sutil con framer-motion
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-10, 10]);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mx.set(x - 0.5);
    my.set(y - 0.5);
  }, [mx, my]);

  const handleLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return (
    <section className={`grid lg:grid-cols-2 gap-10 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
      {/* TEXTO — anima al montar (no depende de scroll) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-5"
      >
        <p className="text-sm tracking-wider text-slate-400">{title}</p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          {subtitle.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="text-primary">{subtitle.split(" ").slice(-1)[0]}</span>
        </h1>
        <p className="text-slate-400 max-w-xl">{bio}</p>

        <div className="flex gap-3 pt-2">
          <a href="/CV_Valentin_Arriola-1.pdf" target="_blank" className="rounded-xl px-5 py-3 border border-primary/40 hover:border-primary/70 transition">
            Descargar CV
          </a>
          <a href="/contacto" className="rounded-xl px-5 py-3 border border-white/10 hover:border-white/20 transition">
            Contacto
          </a>
        </div>
      </motion.div>

      {/* FOTO — también anima al montar y tiene tilt al mouse */}
      <motion.div
        className="relative h-[260px] w-[260px] sm:h-[260px] [perspective:1000px]"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        <motion.div
          style={{ rotateX, rotateY }}
          className="relative h-full rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
        >
          {/* Borde/glow */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-primary/40" />
          <div className="pointer-events-none absolute -inset-px rounded-2xl blur-md bg-primary/10 opacity-0 hover:opacity-100 transition" />

          {/* Imagen */}
          <Image
            src={imageSrc}
            alt="Foto de perfil"
            fill
            priority
            sizes="(min-width: 1024px) 480px, 100vw"
            className="object-cover"
          />

          {/* Shimmer/scan diagonal */}
          <motion.div
            aria-hidden
            initial={{ x: "-150%" }}
            animate={{ x: ["-150%", "150%"] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(115deg, transparent 40%, rgba(57,255,20,0.10) 50%, transparent 60%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

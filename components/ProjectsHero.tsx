"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Slide = { src: string; alt: string };
const DURATION_MS = 3000; // 3s por imagen
const EASING = [0.16, 1, 0.3, 1] as const;

export function ProjectsHero() {
  // Tus imágenes (podés cambiar rutas y textos)
  const slides: Slide[] = useMemo(
    () => [
      { src: "/proyectos/tienda de componentes.png", alt: "Dashboard moderno" },
      { src: "/proyectos/rollingbank.png", alt: "Landing con animaciones" },
      { src: "/proyectos/academia tesla.png", alt: "E-commerce minimal" },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (hover) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), DURATION_MS);
    return () => clearInterval(id);
  }, [hover, slides.length]);

  // 3 efectos distintos (rotan por índice: 0,1,2…)
  function variants(effect: number) {
    switch (effect) {
      case 0: // Zoom + Rotate + Blur
        return {
          enter: { opacity: 0, scale: 1.12, rotate: -5, filter: "blur(6px)" },
          center: { opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: EASING } },
          exit:   { opacity: 0, scale: 0.98, rotate: 5, filter: "blur(6px)", transition: { duration: 0.4,  ease: EASING } },
        };
      case 1: // Flip 3D
        return {
          enter: { opacity: 0, rotateY: 35, x: 40, filter: "blur(6px)" } as any,
          center:{ opacity: 1, rotateY: 0,  x: 0,  filter: "blur(0px)", transition: { duration: 0.6,  ease: EASING } } as any,
          exit:  { opacity: 0, rotateY: -35,x: -40,filter: "blur(6px)", transition: { duration: 0.45, ease: EASING } } as any,
        };
      default: // Mask circular
        return {
          enter:  { opacity: 0.6, clipPath: "circle(0% at 50% 50%)",   filter: "blur(8px)" },
          center: { opacity: 1,   clipPath: "circle(140% at 50% 50%)", filter: "blur(0px)", transition: { duration: 0.6, ease: EASING } },
          exit:   { opacity: 0,   clipPath: "circle(0% at 50% 50%)",   filter: "blur(6px)", transition: { duration: 0.45, ease: EASING } },
        };
    }
  }

  const effect = index % 3;
  const slideVariants = variants(effect);

  return (
    <section className="grid lg:grid-cols-2 gap-10 items-center pt-9">
      {/* IMÁGENES A LA IZQUIERDA */}
      <div className="relative order-1 lg:order-none h-[340px] sm:h-[420px]">
        <div
          className="relative h-full rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${slides[index].src}-${effect}`}
              className="absolute inset-0"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <motion.div
                className="absolute inset-0"
                animate={
                  effect === 0
                    ? { scale: [1.02, 1.06, 1.02], y: [-6, 6, -6] }
                    : effect === 1
                    ? { rotate: [-0.4, 0.4, -0.4] }
                    : { scale: [1.0, 1.05, 1.0] }
                }
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src={slides[index].src}
                  alt={slides[index].alt}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>

              <motion.div
                className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-black/60 to-transparent flex items-center px-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-xs sm:text-sm text-slate-300">{slides[index].alt}</div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="absolute -bottom-5 left-0 right-0 flex justify-center gap-5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2.5 w-2.5 rounded-full transition ${i === index ? "bg-primary" : "bg-white/20 hover:bg-white/40"}`}
              aria-label={`Ir al slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* TEXTO A LA DERECHA */}
      <div className="space-y-6">
        <p className="text-sm tracking-wider text-slate-400">SELECCIÓN DE PROYECTOS Y PRACTICAS</p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Mis <span className="text-primary">Proyectos</span>
        </h1>
        <p className="text-slate-400 max-w-xl">
          Interfaces modernas con foco en **rendimiento**, **accesibilidad** y **detalle visual**.
          Estos proyectos respaldan mis conocimientos en el mundo de la PROGRAMACION como este PORTAFOLIO
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="#grid" className="rounded-xl px-5 py-3 border border-primary/40 hover:border-primary/70 transition">
            Ver Proyectos
          </Link>
          <Link href="/contacto" className="rounded-xl px-5 py-3 border border-white/10 hover:border-white/20 transition">
            Proponer un proyecto
          </Link>
        </div>
      </div>
    </section>
  );
}

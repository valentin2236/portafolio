"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";

const navLinks = [
  { href: "/", label: "Inicio", match: (p: string) => p === "/" },
  { href: "/sobre-mi", label: "Sobre mí", match: (p: string) => p.startsWith("/sobre-mi") },
  { href: "/proyectos", label: "Proyectos", match: (p: string) => p.startsWith("/proyectos") },
  { href: "/contacto", label: "Contacto", match: (p: string) => p.startsWith("/contacto") },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = useCallback((match: (p: string) => boolean) => match(pathname || "/"), [pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className="font-bold text-primary text-lg hover:opacity-90 transition"
        >
          Valentín Arriola
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-6 text-sm relative">
            {navLinks.map(({ href, label, match }) => {
              const active = isActive(match);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative px-1 transition ${
                    active ? "text-primary" : "text-slate-300 hover:text-white"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {label}

                  {/* Animación del subrayado */}
                  <AnimatePresence mode="wait">
                    {active && (
                      <motion.span
                        key={href}
                        className="absolute left-0 right-0 -bottom-1 h-[2px] bg-primary"
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      />
                    )}
                  </AnimatePresence>
                </Link>
              );
            })}
          </div>
          <ThemeToggle />
        </div>

        {/* BURGER MENU */}
        <button
          onClick={() => setOpen(v => !v)}
          aria-label="Abrir menú"
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 hover:border-white/20 transition"
        >
          <div className="relative w-5 h-5 text-white">
            <span className={`absolute left-0 right-0 top-1 h-[2px] bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`absolute left-0 right-0 top-2.5 h-[2px] bg-current transition-opacity ${open ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-0 right-0 top-4 h-[2px] bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="md:hidden border-t border-white/10"
          >
            <div className="px-4 py-3 space-y-2 bg-black/70 backdrop-blur-lg">
              {navLinks.map(({ href, label, match }) => {
                const active = isActive(match);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`block w-full rounded-lg px-3 py-2 text-sm transition ${
                      active
                        ? "text-primary bg-white/[0.04] border border-primary/40"
                        : "text-slate-300 hover:text-white hover:bg-white/[0.03]"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {label}
                  </Link>
                );
              })}

              {/* Separador */}
              <div className="h-px bg-white/10 my-2" />

              {/* Tema toggle en mobile */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Tema</span>
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

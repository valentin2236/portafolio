"use client";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Leer estado inicial (coincide con el script anti-flash)
  useEffect(() => {
    setMounted(true);
    try {
      const ls = localStorage.getItem("theme");
      const mq = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(ls ? ls === "dark" : mq);
    } catch {}
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    const root = document.documentElement;
    if (next) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.documentElement.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.documentElement.style.colorScheme = "light";
    }
  };

  // Evita hidratar ícono incorrecto
  if (!mounted) {
    return (
      <button
        aria-label="Cambiar tema"
        className="rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300"
        style={{ opacity: 0.6 }}
      >
        Tema
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label="Cambiar tema"
      className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm hover:border-white/20 transition"
      title={isDark ? "Cambiar a claro" : "Cambiar a oscuro"}
    >
      <span className="inline-block w-4 h-4">
        {isDark ? "🌙" : "☀️"}
      </span>
      <span className="text-slate-300">{isDark ? "Oscuro" : "Claro"}</span>
    </button>
  );
}

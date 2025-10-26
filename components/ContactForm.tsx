"use client";
import { useState } from "react";

type FormState = "idle" | "sending" | "ok" | "error";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name.trim()) return "El nombre es obligatorio.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Email inválido.";
    if (form.message.trim().length < 10) return "El mensaje debe tener al menos 10 caracteres.";
    return null;
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (v) { setError(v); return; }
    setError(null);
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Error al enviar");
      setState("ok");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setState("error");
      setError("No se pudo enviar. Intentá nuevamente.");
    } finally {
      setTimeout(() => setState("idle"), 2500);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm text-slate-300">Nombre</label>
        <input
          id="name" name="name" value={form.name} onChange={onChange}
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-primary/60"
          placeholder="Tu nombre"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm text-slate-300">Email</label>
        <input
          id="email" name="email" type="email" value={form.email} onChange={onChange}
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-primary/60"
          placeholder="tucorreo@dominio.com"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm text-slate-300">Mensaje</label>
        <textarea
          id="message" name="message" rows={6} value={form.message} onChange={onChange}
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-primary/60 resize-y"
          placeholder="Contame sobre tu proyecto o consulta…"
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        disabled={state === "sending"}
        className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-medium border border-primary/40 hover:border-primary/70 disabled:opacity-60 transition"
      >
        {state === "sending" ? "Enviando…" : state === "ok" ? "¡Enviado!" : "Enviar"}
      </button>
    </form>
  );
}

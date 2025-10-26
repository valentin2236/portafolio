import { NextResponse } from "next/server";

// Fuerza runtime Node.js (no Edge) para evitar errores con dependencias de Node
export const runtime = "nodejs";

// Evita que Next intente pre-renderizar o cachear este endpoint
export const dynamic = "force-dynamic";

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(req: Request) {
  try {
    const { name, email, message } = (await req.json()) as ContactBody;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
    }

    // Si no hay clave, no rompemos el build: respondemos OK "simulado"
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO || "valentin.arriola@example.com";

    if (!apiKey) {
      // Log solo en server; no tirar error para no romper el build
      console.warn("[/api/contact] RESEND_API_KEY no configurada. Envío simulado.");
      return NextResponse.json({ ok: true, simulated: true });
    }

    // Import dinámico sólo si hay API key (evita fallos en build)
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const subject = `Nuevo contacto: ${name}`;
    const text =
      `Nombre: ${name}\n` +
      `Email: ${email}\n\n` +
      `Mensaje:\n${message}\n`;

    // Envío
    await resend.emails.send({
      from: "Portafolio <onboarding@resend.dev>", // puedes poner un domain verificado luego
      to,
      subject,
      replyTo: email,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact] Error:", err);
    return NextResponse.json({ error: "No se pudo enviar" }, { status: 500 });
  }
}

// Opcional: método GET para health check (útil para Vercel)
export async function GET() {
  return NextResponse.json({ ok: true });
}

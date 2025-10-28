// app/api/contact/route.ts
import { NextResponse } from "next/server";
import ContactEmail from "@/emails/ContactEmail";
import ThanksEmail from "@/emails/ThanksEmail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactBody = { name?: string; email?: string; message?: string };

export async function POST(req: Request) {
  try {
    const { name = "", email = "", message = "" } = (await req.json()) as ContactBody;

    if (!name.trim() || !email.trim() || !message.trim()) {
      return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
    }

    const apiKey    = process.env.RESEND_API_KEY;
    const toOwner   = process.env.CONTACT_TO || "valentin.arriola@example.com";
    const fromEmail = process.env.FROM_EMAIL || "Portafolio <onboarding@resend.dev>";
    const autoReply = (process.env.SEND_AUTOREPLY ?? "true").toLowerCase() !== "false";

    // Construí una URL absoluta para emails (necesario para imágenes)
    // Prioridad: SITE_URL > VERCEL_URL
    const host =
      process.env.SITE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

    const siteUrl: string | undefined = host;
    const logoUrl: string | undefined = host ? `${host}/favicon.png` : undefined;

    if (!apiKey && process.env.VERCEL_ENV === "production") {
      return NextResponse.json({ error: "Falta RESEND_API_KEY" }, { status: 500 });
    }
    if (!apiKey) {
      console.warn("[/api/contact] RESEND_API_KEY ausente. Envío simulado.");
      return NextResponse.json({ ok: true, simulated: true });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    // 1) Email para vos (detalle)
    const ownerSubject = `Nuevo contacto: ${name}`;
    const ownerText =
      `Nombre: ${name}\n` +
      `Email: ${email}\n\n` +
      `Mensaje:\n${message}\n`;

    const ownerPromise = resend.emails.send({
      from: fromEmail,
      to: toOwner,
      subject: ownerSubject,
      replyTo: email,
      text: ownerText,
      react: ContactEmail({ name, email, message, siteUrl }),
    });

    // 2) Auto-respuesta para el usuario
    const userPromise = autoReply
      ? resend.emails.send({
          from: fromEmail,      // ideal: dominio verificado en Resend
          to: email,
          subject: "¡Gracias por escribir! ✅",
          replyTo: toOwner,     // si responden, te llega a vos
          text: `Hola ${name}, recibí tu mensaje y te responderé a este correo: ${email}.`,
          react: ThanksEmail({ name, email, siteUrl, logoUrl }),
        })
      : Promise.resolve(undefined);

    const [ownerRes, userRes] = await Promise.all([ownerPromise, userPromise]);

    if (ownerRes?.error) {
      console.error("Resend (owner) error:", ownerRes.error);
      return NextResponse.json({ error: "No se pudo enviar (owner)" }, { status: 502 });
    }
    if (userRes && "error" in userRes && userRes.error) {
      console.warn("Resend (user autoreply) error:", userRes.error);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact] Error:", err);
    return NextResponse.json({ error: "No se pudo enviar" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
}

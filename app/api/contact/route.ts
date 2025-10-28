// app/api/contact/route.ts
import { NextResponse } from "next/server";
import ContactEmail from "@/emails/ContactEmail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactBody = { name?: string; email?: string; message?: string };

export async function POST(req: Request) {
  try {
    const { name, email, message } = (await req.json()) as ContactBody;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO || "valentin.arriola@example.com";
    const siteUrl =
      process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : undefined;

    if (!apiKey && process.env.VERCEL_ENV === "production") {
      return NextResponse.json(
        { error: "Falta RESEND_API_KEY en producción" },
        { status: 500 }
      );
    }

    if (!apiKey) {
      console.warn("[/api/contact] RESEND_API_KEY ausente. Envío simulado.");
      return NextResponse.json({ ok: true, simulated: true });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const subject = `Nuevo contacto: ${name}`;
    const text =
      `Nombre: ${name}\n` +
      `Email: ${email}\n\n` +
      `Mensaje:\n${message}\n`;

    const res = await resend.emails.send({
      from: "Portafolio <onboarding@resend.dev>", // mejor: dominio verificado
      to,
      subject,
      replyTo: email, // ✔️ camelCase correcto
      text,                   // fallback para clientes que bloquean HTML
      react: ContactEmail({   // HTML profesional (plantilla React)
        name,
        email,
        message,
        siteUrl,
      }),
    });

    if (res.error) {
      console.error("[/api/contact] Resend error:", res.error);
      return NextResponse.json({ error: "Resend falló" }, { status: 502 });
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

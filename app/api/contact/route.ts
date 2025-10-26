import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function emailHTML({ name, email, message }: { name: string; email: string; message: string }) {
  // ⚠️ Los estilos inline son lo más compatible con clientes de correo
  return `
  <!doctype html>
  <html lang="es">
  <head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width"/>
    <title>Nuevo contacto</title>
  </head>
  <body style="background:#0b0b0b;margin:0;padding:40px 0;font-family:Inter,Arial,sans-serif;color:#e5e7eb;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="560" style="width:560px;background:#111111;border-radius:16px;border:1px solid #262626">
      <tr>
        <td style="padding:28px 32px;">
          <h1 style="margin:0;font-size:20px;line-height:28px;color:#39FF14;">Nuevo mensaje del portfolio</h1>
          <p style="margin:8px 0 20px 0;font-size:13px;color:#9ca3af;">Recibiste un nuevo mensaje desde el formulario de contacto.</p>

          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size:14px;line-height:22px;color:#e5e7eb;">
            <tr>
              <td style="padding:10px 0;width:120px;color:#9ca3af;">Nombre</td>
              <td style="padding:10px 0;"><strong>${escapeHTML(name)}</strong></td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#9ca3af;">Email</td>
              <td style="padding:10px 0;"><a href="mailto:${escapeAttr(email)}" style="color:#39FF14;text-decoration:none;">${escapeHTML(email)}</a></td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#9ca3af;vertical-align:top;">Mensaje</td>
              <td style="padding:10px 0;">
                <div style="white-space:pre-wrap;border:1px solid #262626;border-radius:12px;background:#0f0f0f;padding:14px;">
                  ${escapeHTML(message)}
                </div>
              </td>
            </tr>
          </table>

          <p style="margin-top:24px;font-size:12px;color:#9ca3af;">
            Podés responderle directamente a este correo (usa Reply).
          </p>
        </td>
      </tr>
    </table>

    <p style="text-align:center;margin-top:16px;font-size:11px;color:#6b7280;">
      Enviado automáticamente desde tu portfolio — Next.js + Resend
    </p>
  </body>
  </html>
  `;
}

// Sanitizador simple para evitar inyección en HTML (suficiente para este caso)
function escapeHTML(str: string) {
  return String(str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
function escapeAttr(str: string) {
  // Igual que escapeHTML, pero más explícito semánticamente
  return escapeHTML(str);
}

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json({ ok: false, error: "Datos incompletos" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",   // Cuando verifiques un dominio, cambialo por algo@tudominio
      to: "valentinarriola04@gmail.com",                  // 👈 tu correo real
      subject: `Nuevo mensaje de ${name}`,
      html: emailHTML({ name, email, message }),
      text: `Nombre: ${name}\nEmail: ${email}\n\n${message}`, // fallback de texto                              // 👈 así podés responder directo al remitente
    });

    return Response.json({ ok: true });
  } catch (e) {
    console.error("Error al enviar email:", e);
    return Response.json({ ok: false, error: "Error al enviar email" }, { status: 500 });
  }
}

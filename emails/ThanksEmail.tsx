// emails/ThanksEmail.tsx
import * as React from "react";
import {
  Html, Head, Preview, Body, Container, Heading, Text, Section, Hr, Link, Img, Tailwind,
} from "@react-email/components";

type Props = { name: string; email: string; siteUrl?: string; logoUrl?: string };

export default function ThanksEmail({ name, email, siteUrl, logoUrl }: Props) {
  const safeSite = siteUrl || "";
  // Si no te pasan logoUrl desde el server, usá el favicon.png del proyecto
  const safeLogo = logoUrl || (safeSite ? `${safeSite}/favicon.png` : "");

  return (
    <Html>
      <Head />
      <Preview>¡Gracias por contactarte, {name}!</Preview>
      <Tailwind>
        <Body className="bg-[#0a0a0a] text-white">
          <Container className="mx-auto my-10 w-[600px] rounded-2xl border border-[#1b1b1b] bg-[#0f0f0f] p-8">

            {/* LOGO (si hay URL absoluta disponible) */}
            {safeLogo ? (
              <div className="w-full flex justify-center mb-6">
                <Img
                  src={safeLogo}
                  alt="Valentín Arriola"
                  width="120"
                  height="120"
                  style={{ display: "block" }}
                />
              </div>
            ) : null}

            <Heading className="m-0 text-[24px] font-bold text-[#39FF14]">
              ¡Gracias por tu mensaje!
            </Heading>

            <Section className="mt-6 rounded-xl border border-[#1b1b1b] bg-black p-6">
              <Text className="text-slate-200 leading-7">
                Hola {name || "👋"}, recibí tu mensaje y te voy a responder a este correo:
              </Text>
              <Text className="text-[#39FF14]">{email}</Text>

              <Hr className="my-5 border-[#1b1b1b]" />

              <Text className="text-sm text-slate-400">
                Si querés sumar más info o adjuntos, podés responder a este mail.
              </Text>
            </Section>

            {/* CTA */}
            {safeSite ? (
              <div className="mt-8 w-full flex justify-center">
                <Link
                  href={safeSite}
                  style={{
                    backgroundColor: "#39FF14",
                    color: "#000",
                    textDecoration: "none",
                    padding: "12px 20px",
                    borderRadius: "12px",
                    fontWeight: 600,
                  }}
                >
                  Ver mi portfolio
                </Link>
              </div>
            ) : null}

            {safeSite ? (
              <Text className="mt-6 text-center text-[13px] text-slate-500">
                Enviado desde <Link href={safeSite} className="text-[#39FF14]">tu portafolio</Link>
              </Text>
            ) : null}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

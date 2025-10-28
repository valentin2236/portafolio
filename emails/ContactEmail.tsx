// emails/ContactEmail.tsx
import * as React from "react";
import {
  Html, Head, Preview, Body, Container, Heading, Text,
  Section, Hr, Link, Tailwind,
} from "@react-email/components";

type Props = { name: string; email: string; message: string; siteUrl?: string };

export default function ContactEmail({ name, email, message, siteUrl }: Props) {
  const preview = `Nuevo contacto de ${name}`;
  const safeSite = siteUrl || "";

  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Tailwind>
        <Body className="bg-[#0a0a0a] text-white">
          <Container className="mx-auto my-10 w-[600px] rounded-2xl border border-[#1b1b1b] bg-[#0f0f0f] p-8">
            <Heading className="m-0 text-[24px] font-bold text-[#39FF14]">
              Nuevo mensaje desde tu Portafolio
            </Heading>

            <Section className="mt-6 rounded-xl border border-[#1b1b1b] bg-black p-6">
              <Text className="m-0 text-sm text-slate-400">Nombre</Text>
              <Text className="mt-1 text-[16px] font-medium">{name}</Text>

              <Hr className="my-5 border-[#1b1b1b]" />

              <Text className="m-0 text-sm text-slate-400">Email</Text>
              <Link
                href={`mailto:${email}`}
                className="mt-1 inline-block text-[16px] text-[#39FF14] underline"
              >
                {email}
              </Link>

              <Hr className="my-5 border-[#1b1b1b]" />

              <Text className="m-0 text-sm text-slate-400">Mensaje</Text>
              <Text className="mt-1 whitespace-pre-wrap leading-7 text-[15px] text-slate-200">
                {message}
              </Text>
            </Section>

            {safeSite && (
              <Text className="mt-6 text-center text-[13px] text-slate-500">
                Enviado desde <Link href={safeSite} className="text-[#39FF14]">tu portafolio</Link>
              </Text>
            )}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

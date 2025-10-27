// app/layout.tsx
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeScript } from "./theme-script";
import { PageTransition } from "@/components/PageTransition";
import { ParticlesBackground } from "@/components/ParticlesBackground";

export const metadata = {
  title: "Valentín Arriola — Portafolio",
  description: "Portafolio profesional con Next.js + Tailwind y animaciones 3D.",
  icons: {
    icon: "/favicon.png", // 👈 tu logo aquí
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="bg-white text-slate-900 dark:bg-black dark:text-slate-100 antialiased relative overflow-x-hidden">
        {/* Fondo global */}
        <ParticlesBackground />

        {/* Navbar */}
        <Navbar />

        {/* Transición entre páginas */}
        <main className="max-w-6xl mx-auto px-4 py-10 relative z-10">
          <PageTransition>{children}</PageTransition>
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}

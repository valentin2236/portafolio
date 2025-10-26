// components/ParticlesBackground.tsx
"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { loadSlim } from "@tsparticles/slim";
import { initParticlesEngine } from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";

const Particles = dynamic(() => import("@tsparticles/react").then(m => m.default), {
  ssr: false,
});

export function ParticlesBackground() {
  const initialized = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready) return null;

  const options: ISourceOptions = {
    background: { color: "transparent" },
    fullScreen: { enable: false },
    fpsLimit: 60,
    detectRetina: true,
    particles: {
      number: {
        value: 40,
        density: { enable: true }, // ← quitar "area"
      },
      color: { value: "#00ff99" },
      links: { enable: true, color: "#00ff99", opacity: 0.15, distance: 120 },
      move: { enable: true, speed: 0.6, outModes: "out" },
      opacity: { value: 0.4 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
  };

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Particles id="tsparticles" options={options} />
    </div>
  );
}

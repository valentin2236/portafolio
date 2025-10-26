"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";

/* ============== helpers ============== */
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function easeOutBack(t: number, s = 0.9) {
  const c1 = s, c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}
function usePrimaryColor(fallback = "#39FF14") {
  const [color, setColor] = useState(fallback);
  useEffect(() => {
    const span = document.createElement("span");
    span.className = "text-primary";
    span.style.position = "fixed";
    span.style.opacity = "0";
    span.textContent = ".";
    document.body.appendChild(span);
    const c = getComputedStyle(span).color;
    document.body.removeChild(span);
    const m = c.match(/\d+/g);
    if (m && m.length >= 3) {
      const [r, g, b] = m.map(Number);
      const hex = "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("");
      setColor(hex);
    }
  }, [fallback]);
  return color;
}

/* ============== geometría ============== */
function createRubikCubes(size = 3, gap = 0.06) {
  const cubes: { position: [number, number, number] }[] = [];
  const offset = (size - 1) / 2;
  for (let x = 0; x < size; x++)
    for (let y = 0; y < size; y++)
      for (let z = 0; z < size; z++)
        cubes.push({
          position: [
            (x - offset) * (1 + gap),
            (y - offset) * (1 + gap),
            (z - offset) * (1 + gap),
          ],
        });
  return cubes;
}

/* ============== subcubo: metal + bordes verdes ============== */
function SubCube({
  position,
  metal = "#1a1a1a",
  edge = "#39FF14",
}: {
  position: [number, number, number];
  metal?: string;
  edge?: string;
}) {
  const bodyRef = useRef<THREE.Mesh>(null!);
  const edgesRef = useRef<THREE.LineSegments>(null!);

  const bodyMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: metal,
        metalness: 0.95,
        roughness: 0.35,
        envMapIntensity: 1.2,
      }),
    [metal]
  );

  const size = 0.9;
  const geo = useMemo(() => new THREE.BoxGeometry(size, size, size), []);
  const edgeGeo = useMemo(() => new THREE.EdgesGeometry(geo), [geo]);
  const edgeMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color(edge),
        transparent: true,
        opacity: 0.85,
        linewidth: 1,
      }),
    [edge]
  );

  return (
    <group position={position}>
      <mesh ref={bodyRef} geometry={geo} material={bodyMat} />
      <lineSegments ref={edgesRef} geometry={edgeGeo} material={edgeMat} />
    </group>
  );
}

/* ============== cubo rubik con giros por capa y easing ============== */
const GAP = 0.06;
const STEP = 1 + GAP;

function snapStep(v: number) {
  return Math.round(v / STEP) * STEP;
}
function snapAngle(rad: number) {
  const q = Math.PI / 2;
  return Math.round(rad / q) * q;
}

function RubikCube({
  hover,
  edge,
  metal,
}: {
  hover: boolean;
  edge: string;
  metal: string;
}) {
  const group = useRef<THREE.Group>(null!);
  const cubes = useMemo(() => createRubikCubes(3, GAP), []);
  const clock = useRef(0);

  const rotatingRef = useRef(false);
  const layerGroupRef = useRef<THREE.Group | null>(null);
  const axisRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 1, 0));
  const axisNameRef = useRef<"x" | "y" | "z">("y");
  const layerIndexRef = useRef<number>(0);
  const targetAngleRef = useRef(0);
  const tRef = useRef(0);

  useFrame((_, dt) => {
    if (!group.current) return;

    group.current.rotation.y += dt * 0.18;
    group.current.rotation.x += dt * 0.08;

    clock.current += dt;

    if (!rotatingRef.current && clock.current > 2.2) {
      clock.current = 0;
      rotatingRef.current = true;
      tRef.current = 0;

      const axes: Array<"x" | "y" | "z"> = ["x", "y", "z"];
      const ax = axes[Math.floor(Math.random() * 3)];
      axisNameRef.current = ax;
      axisRef.current =
        ax === "x" ? new THREE.Vector3(1, 0, 0) :
        ax === "y" ? new THREE.Vector3(0, 1, 0) :
                      new THREE.Vector3(0, 0, 1);

      layerIndexRef.current = [-1, 0, 1][Math.floor(Math.random() * 3)];

      const lg = new THREE.Group();
      lg.position.set(0, 0, 0);
      lg.rotation.set(0, 0, 0);
      lg.updateMatrixWorld(true);

      group.current.add(lg);
      group.current.children
        .filter((child) => child !== lg)
        .forEach((child: any) => {
          const posOnAxis = child.position[ax];
          if (Math.round(posOnAxis / STEP) === layerIndexRef.current) {
            lg.attach(child);
          }
        });

      layerGroupRef.current = lg;
      targetAngleRef.current = (Math.PI / 2) * (Math.random() > 0.5 ? 1 : -1);
    }

    if (rotatingRef.current && layerGroupRef.current) {
      const speed = 1.15;
      tRef.current += dt * (1 / speed);
      const t = Math.min(tRef.current, 1);

      const e1 = easeInOutCubic(t);
      const back = easeOutBack(e1, 0.85);

      layerGroupRef.current.rotation.set(0, 0, 0);
      layerGroupRef.current.rotateOnAxis(axisRef.current, targetAngleRef.current * back);

      if (tRef.current >= 1) {
        layerGroupRef.current.rotation.set(0, 0, 0);
        layerGroupRef.current.rotateOnAxis(axisRef.current, targetAngleRef.current);

        const children = [...layerGroupRef.current.children];
        children.forEach((c) => {
          group.current!.attach(c);
          c.position.set(
            snapStep(c.position.x),
            snapStep(c.position.y),
            snapStep(c.position.z),
          );
          c.rotation.set(
            snapAngle(c.rotation.x),
            snapAngle(c.rotation.y),
            snapAngle(c.rotation.z),
          );
        });

        group.current.remove(layerGroupRef.current);
        layerGroupRef.current = null;
        rotatingRef.current = false;
      }
    }
  });

  return (
    <group ref={group}>
      {cubes.map((cube, i) => (
        <SubCube key={i} position={cube.position} metal={metal} edge={edge} />
      ))}
    </group>
  );
}

/* ============== partículas verdes sutiles alrededor ============== */
function FloatingParticles({ count = 220, color = "#39FF14" }) {
  const points = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 2;
      const th = Math.random() * 2 * Math.PI;
      const ph = Math.acos(2 * Math.random() - 1);
      arr[i * 3 + 0] = r * Math.sin(ph) * Math.cos(th);
      arr[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      arr[i * 3 + 2] = r * Math.cos(ph);
    }
    return arr;
  }, [count]);

  useFrame((_, dt) => {
    if (points.current) {
      points.current.rotation.y += dt * 0.02;
      points.current.rotation.x += dt * 0.005;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        {/* 🔧 cambio clave: usar args={[array, itemSize]} */}
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color={color} transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

/* ============== componente principal ============== */
export function Hero3D() {
  const [hover, setHover] = useState(false);
  const primary = usePrimaryColor("#39FF14");
  const metal = "#1a1a1a";

  return (
    <section className="grid lg:grid-cols-2 gap-10 items-center pt-5">
      {/* Texto */}
      <div className="space-y-6">
        <p className="text-sm tracking-wider text-slate-400">Desarrollador Web Full-Stack & Técnico en Informática</p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Hola, soy <span className="text-primary">Valentín</span>.<br />
          Diseño paginas web <span className="text-primary">Modernas y escalables</span>
        </h1>
        <p className="text-slate-400 max-w-xl">
          Transformo ideas en soluciones digitales funcionales y atractivas
        </p>
        <div className="flex gap-3 pt-3">
          <a href="/proyectos" className="border border-primary/50 px-5 py-3 rounded-xl hover:border-primary transition">
            Ver proyectos
          </a>
          <a href="/contacto" className="border border-white/10 px-5 py-3 rounded-xl hover:border-white/30 transition">
            Contacto
          </a>
        </div>
      </div>

      {/* 3D */}
      <div
        className="relative h-[420px] overflow-hidden"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Canvas dpr={[1, 2]} style={{ background: "black" }}>
          <color attach="background" args={["#000000"]} />
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />

          {/* Luces */}
          <ambientLight intensity={0.35} />
          <pointLight position={[4, 4, 4]} intensity={2} color={primary} />
          <pointLight position={[-4, -4, -4]} intensity={1.2} color={primary} />
          <fog attach="fog" args={["#000000", 4, 10]} />

          <FloatingParticles color={primary} />
          <RubikCube hover={hover} edge={primary} metal={metal} />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={!hover}
            autoRotateSpeed={0.55}
          />
        </Canvas>
      </div>
    </section>
  );
}

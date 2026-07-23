"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { FiberSpool, type SpoolVariant } from "./FiberSpool";
import { TelecomTower } from "./TelecomTower";
import { FiberBend } from "./FiberBend";
import { ParticleGrid } from "./ParticleGrid";
import { SpoolFallback } from "./SpoolFallback";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type SceneType = "spool" | "telecom" | "bend";

interface SceneCanvasProps {
  type?: SceneType;
  interactive?: boolean;
  autoRotate?: boolean;
  scrollUnwind?: number;
  className?: string;
  height?: string;
  force3D?: boolean;
  spoolVariant?: SpoolVariant;
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <hemisphereLight args={["#99E8FF", "#071e33", 0.5]} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-3, 2, -2]} intensity={0.55} color="#00D4FF" />
      <pointLight position={[0, 2, 3]} intensity={0.85} color="#00D4FF" />
      <pointLight position={[-2, -1, -2]} intensity={0.25} color="#6ECFFF" />
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-[#00D4FF]/30 border-t-[#00D4FF]" />
    </div>
  );
}

function SceneObject({
  type,
  interactive,
  autoRotate,
  scrollUnwind,
  hovered,
  spoolVariant,
}: {
  type: SceneType;
  interactive: boolean;
  autoRotate: boolean;
  scrollUnwind: number;
  hovered: boolean;
  spoolVariant: SpoolVariant;
}) {
  if (type === "bend") return <FiberBend />;
  if (type === "telecom") return <TelecomTower />;
  return (
    <FiberSpool
      interactive={interactive}
      autoRotate={autoRotate}
      scrollUnwind={scrollUnwind}
      hovered={hovered}
      variant={spoolVariant}
    />
  );
}

export function SceneCanvas({
  type = "spool",
  interactive = false,
  autoRotate = true,
  scrollUnwind = 0,
  className = "",
  height = "100%",
  force3D = true,
  spoolVariant = "default",
}: SceneCanvasProps) {
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  // Same 3D scene as desktop on mobile; SVG fallback only for reduced-motion or explicit force3D=false
  const useFallback = prefersReducedMotion || (isMobile && !force3D && !interactive);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className={`relative ${className}`} style={{ height }}>
        <LoadingFallback />
      </div>
    );
  }

  if (useFallback) {
    return (
      <div className={`relative ${className}`} style={{ height }}>
        <SpoolFallback type={type} variant={spoolVariant} className="h-full w-full" />
      </div>
    );
  }

  return (
    <div
      className={`relative touch-pan-y ${className}`}
      style={{ height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onPointerDown={() => setHovered(true)}
    >
      <Canvas
        dpr={isMobile ? [1, 1.5] : [1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: isMobile ? "default" : "high-performance",
        }}
        style={{ background: "transparent", touchAction: interactive ? "none" : "pan-y" }}
      >
        <PerspectiveCamera makeDefault position={[0, 1.5, 5]} fov={isMobile ? 42 : 40} />
        <SceneLights />
        {type !== "bend" && <ParticleGrid />}

        <Suspense fallback={null}>
          <SceneObject
            type={type}
            interactive={interactive}
            autoRotate={autoRotate}
            scrollUnwind={scrollUnwind}
            hovered={hovered}
            spoolVariant={spoolVariant}
          />
        </Suspense>

        {interactive && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate
            enableDamping
            dampingFactor={0.08}
            rotateSpeed={isMobile ? 0.7 : 0.9}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
            autoRotate={false}
          />
        )}
      </Canvas>

      {interactive && (
        <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-[#8BA4BC]/60">
          {isMobile ? "Покрутите пальцем" : "Покрутите мышью"}
        </p>
      )}
    </div>
  );
}
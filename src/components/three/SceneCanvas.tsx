"use client";

import { Suspense, useState, useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { FiberSpool, type SpoolVariant } from "./FiberSpool";
import { TelecomTower } from "./TelecomTower";
import { FiberBend } from "./FiberBend";
import { ParticleGrid } from "./ParticleGrid";
import { SpoolFallback } from "./SpoolFallback";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

type SceneType = "spool" | "telecom" | "bend";

interface SceneCanvasProps {
  type?: SceneType;
  interactive?: boolean;
  autoRotate?: boolean;
  scrollUnwind?: number;
  className?: string;
  height?: string;
  /** When true, try WebGL even on narrow screens. Default: desktop only. */
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

function hasWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: false }) ||
      canvas.getContext("webgl", { failIfMajorPerformanceCaveat: false }) ||
      canvas.getContext("experimental-webgl");
    return Boolean(gl);
  } catch {
    return false;
  }
}

function isLowEndDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  // Only hard signals — do not key off hardwareConcurrency (4-core desktops are fine)
  if (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) return true;
  if (nav.connection?.saveData) return true;
  const et = nav.connection?.effectiveType;
  if (et === "slow-2g" || et === "2g") return true;
  return false;
}

export function SceneCanvas({
  type = "spool",
  interactive = false,
  autoRotate = true,
  scrollUnwind = 0,
  className = "",
  height = "100%",
  force3D = false,
  spoolVariant = "default",
}: SceneCanvasProps) {
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);

  const isNarrow = useMediaQuery("(max-width: 1023px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const coarsePointer = useMediaQuery("(pointer: coarse)");

  const webglOk = useMemo(() => (mounted ? hasWebGL() : false), [mounted]);

  // Phones/tablets: SVG fallback. Desktop with WebGL: 3D.
  // force3D only overrides when WebGL is available and device is not low-end.
  const useFallback =
    !mounted ||
    webglFailed ||
    !webglOk ||
    prefersReducedMotion ||
    isLowEndDevice() ||
    ((isNarrow || coarsePointer) && !force3D);

  useEffect(() => setMounted(true), []);

  const shellClass = `relative ${className}`;
  const shellStyle = { height };

  if (!mounted) {
    return (
      <div className={shellClass} style={shellStyle}>
        <LoadingFallback />
      </div>
    );
  }

  if (useFallback) {
    return (
      <div className={shellClass} style={shellStyle}>
        <SpoolFallback type={type} variant={spoolVariant} className="h-full w-full" />
      </div>
    );
  }

  return (
    <ErrorBoundary
      fallback={
        <div className={shellClass} style={shellStyle}>
          <SpoolFallback type={type} variant={spoolVariant} className="h-full w-full" />
        </div>
      }
      onError={() => setWebglFailed(true)}
    >
      <div
        className={`relative touch-pan-y ${className}`}
        style={shellStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Canvas
          dpr={[1, 1.25]}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "default",
            failIfMajorPerformanceCaveat: true,
          }}
          style={{ background: "transparent", touchAction: interactive ? "none" : "pan-y" }}
          onCreated={({ gl }) => {
            const canvas = gl.domElement;
            const onLost = (e: Event) => {
              e.preventDefault();
              setWebglFailed(true);
            };
            canvas.addEventListener("webglcontextlost", onLost, false);
          }}
        >
          <PerspectiveCamera makeDefault position={[0, 1.5, 5]} fov={40} />
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
              rotateSpeed={0.9}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 1.5}
              autoRotate={false}
            />
          )}
        </Canvas>

        {interactive && (
          <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-[#8BA4BC]/60">
            Покрутите мышью
          </p>
        )}
      </div>
    </ErrorBoundary>
  );
}

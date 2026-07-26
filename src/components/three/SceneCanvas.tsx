"use client";

import { Suspense, useState, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
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

/** Warm sun that ramps in on hover — key light + fill + soft glow disc. */
function SunHoverLight({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const dirRef = useRef<THREE.DirectionalLight>(null);
  const fillRef = useRef<THREE.PointLight>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  const intensity = useRef(0);

  useFrame((state, delta) => {
    const target = active ? 1 : 0;
    intensity.current = THREE.MathUtils.damp(intensity.current, target, 6, delta);
    const k = intensity.current;

    if (dirRef.current) {
      dirRef.current.intensity = k * 2.6;
      dirRef.current.color.setRGB(1, 0.92 + k * 0.06, 0.72 + k * 0.1);
      // Aim at spool center
      dirRef.current.target.position.set(0, 0, 0);
      dirRef.current.target.updateMatrixWorld();
    }
    if (fillRef.current) {
      fillRef.current.intensity = k * 1.8;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(0.6 + k * 0.95);
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = k * 0.65;
      glowRef.current.visible = k > 0.02;
      glowRef.current.lookAt(state.camera.position);
    }
    if (coronaRef.current) {
      coronaRef.current.scale.setScalar(1.1 + k * 1.5);
      const mat = coronaRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = k * 0.28;
      coronaRef.current.visible = k > 0.02;
      coronaRef.current.lookAt(state.camera.position);
      coronaRef.current.rotateZ(state.clock.elapsedTime * 0.2);
    }
    // Subtle bob while lit
    if (groupRef.current) {
      groupRef.current.position.y = 3.2 + Math.sin(state.clock.elapsedTime * 0.8) * 0.06 * k;
    }
  });

  return (
    <group ref={groupRef} position={[3.8, 3.2, 2.4]}>
      <directionalLight ref={dirRef} intensity={0} color="#FFE7A8" />
      <pointLight ref={fillRef} intensity={0} color="#FFD27A" distance={14} decay={2} />
      {/* Sun disc */}
      <mesh ref={glowRef} visible={false}>
        <circleGeometry args={[0.55, 32]} />
        <meshBasicMaterial
          color="#FFE566"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Soft corona */}
      <mesh ref={coronaRef} visible={false}>
        <circleGeometry args={[0.95, 32]} />
        <meshBasicMaterial
          color="#FFB347"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function SceneLights({ sunActive }: { sunActive: boolean }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <hemisphereLight args={["#99E8FF", "#071e33", 0.5]} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-3, 2, -2]} intensity={0.55} color="#00D4FF" />
      <pointLight position={[0, 2, 3]} intensity={0.85} color="#00D4FF" />
      <SunHoverLight active={sunActive} />
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

  const webglOk = useMemo(() => (mounted ? hasWebGL() : false), [mounted]);

  // Prefer 3D spool on all devices with WebGL (incl. mobile).
  // force3D keeps 3D even if the device looks constrained; low-end / reduced-motion still fall back.
  const useFallback =
    !mounted ||
    webglFailed ||
    !webglOk ||
    prefersReducedMotion ||
    (isLowEndDevice() && !force3D);

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
        className={`relative touch-pan-y ${className} ${hovered && type === "spool" ? "spool-sun-lit" : ""}`}
        style={shellStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Canvas
          dpr={isNarrow ? [1, 1.5] : [1, 1.5]}
          gl={{
            antialias: !isNarrow,
            alpha: true,
            powerPreference: isNarrow ? "high-performance" : "default",
            failIfMajorPerformanceCaveat: false,
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
          <PerspectiveCamera
            makeDefault
            position={isNarrow ? [0, 1.2, 4.2] : [0, 1.5, 5]}
            fov={isNarrow ? 42 : 40}
          />
          <SceneLights sunActive={hovered && type === "spool"} />
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

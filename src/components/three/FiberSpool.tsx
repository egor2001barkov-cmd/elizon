"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

export type SpoolVariant = "default" | "realistic";

interface FiberSpoolProps {
  interactive?: boolean;
  autoRotate?: boolean;
  scrollUnwind?: number;
  hovered?: boolean;
  variant?: SpoolVariant;
}

const WINDING_COLORS = {
  default: ["#00D4FF", "#4DE8FF", "#0099CC"],
  realistic: ["#D62828", "#C41E1E", "#E63946"],
} as const;

const SILVER = { color: "#C8CCD4", metalness: 0.92, roughness: 0.18 };
const RED_CORE = { color: "#8B1520", metalness: 0.35, roughness: 0.45 };

function FiberWindings({
  unwind = 0,
  variant = "default",
}: {
  unwind?: number;
  variant?: SpoolVariant;
}) {
  const windings = useMemo(() => {
    const palette = WINDING_COLORS[variant];
    const items: { radius: number; y: number; color: string }[] = [];
    const layers = 28;
    for (let i = 0; i < layers; i++) {
      items.push({
        radius: 1.15 + i * 0.045 - unwind * 0.02,
        y: -0.55 + i * 0.038,
        color: palette[i % 3],
      });
    }
    return items;
  }, [unwind, variant]);

  return (
    <group>
      {windings.map((w, i) => (
        <mesh key={i} position={[0, w.y, 0]} rotation={[Math.PI / 2, 0, i * 0.15]}>
          <torusGeometry args={[w.radius, 0.018, 8, 64]} />
          <meshStandardMaterial
            color={w.color}
            emissive={w.color}
            emissiveIntensity={variant === "realistic" ? 0.05 : 0.15}
            metalness={variant === "realistic" ? 0.25 : 0.6}
            roughness={variant === "realistic" ? 0.55 : 0.25}
          />
        </mesh>
      ))}
    </group>
  );
}

function UnwoundFiber({ amount }: { amount: number }) {
  if (amount < 0.05) return null;

  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const segments = 40;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      pts.push(
        new THREE.Vector3(
          1.8 + t * 2.5 * amount,
          0.3 - t * 0.8,
          Math.sin(t * Math.PI * 3) * 0.3 * amount
        )
      );
    }
    return pts;
  }, [amount]);

  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);

  return (
    <mesh>
      <tubeGeometry args={[curve, 64, 0.012, 8, false]} />
      <meshStandardMaterial
        color="#00D4FF"
        emissive="#00D4FF"
        emissiveIntensity={0.4}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

export function FiberSpool({
  interactive = false,
  autoRotate = true,
  scrollUnwind = 0,
  hovered = false,
  variant = "default",
}: FiberSpoolProps) {
  const isRealistic = variant === "realistic";
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Same continuous spin on mobile and desktop (even when interactive controls exist)
    if (autoRotate) {
      groupRef.current.rotation.y += delta * 0.35;
    }

    if (hovered) {
      targetRotation.current.y += delta * 0.45;
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        Math.sin(state.clock.elapsedTime * 0.5) * 0.08,
        0.05
      );
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={groupRef} scale={1.1}>
        {/* Left flange */}
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry args={[1.65, 1.65, 0.12, 48]} />
          <meshStandardMaterial
            color={isRealistic ? SILVER.color : "#1a3a5c"}
            metalness={isRealistic ? SILVER.metalness : 0.7}
            roughness={isRealistic ? SILVER.roughness : 0.3}
          />
        </mesh>
        {/* Right flange */}
        <mesh position={[0, -0.55, 0]}>
          <cylinderGeometry args={[1.65, 1.65, 0.12, 48]} />
          <meshStandardMaterial
            color={isRealistic ? SILVER.color : "#1a3a5c"}
            metalness={isRealistic ? SILVER.metalness : 0.7}
            roughness={isRealistic ? SILVER.roughness : 0.3}
          />
        </mesh>
        {/* Core barrel */}
        <mesh>
          <cylinderGeometry args={[0.55, 0.55, 1.0, 32]} />
          <meshStandardMaterial
            color={isRealistic ? RED_CORE.color : "#0d2840"}
            metalness={isRealistic ? RED_CORE.metalness : 0.5}
            roughness={isRealistic ? RED_CORE.roughness : 0.4}
          />
        </mesh>
        {/* Fiber windings */}
        <FiberWindings unwind={scrollUnwind} variant={variant} />
        {/* Unwound fiber trail */}
        <UnwoundFiber amount={scrollUnwind} />
        {/* Glass fiber tip glow */}
        <mesh position={[1.65 + scrollUnwind * 2, 0.1, 0]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.5}
            chromaticAberration={0.1}
            anisotropy={0.3}
            distortion={0.2}
            distortionScale={0.2}
            temporalDistortion={0.1}
            color="#00D4FF"
          />
        </mesh>
        {/* Center hub detail */}
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.15, 16]} />
          <meshStandardMaterial
            color={isRealistic ? "#A8ADB8" : "#00D4FF"}
            emissive={isRealistic ? "#888" : "#00D4FF"}
            emissiveIntensity={isRealistic ? 0.08 : 0.3}
            metalness={0.9}
            roughness={isRealistic ? 0.15 : 0.1}
          />
        </mesh>
      </group>
    </Float>
  );
}
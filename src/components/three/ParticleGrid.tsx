"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const STAR_COUNT = 160;

/**
 * Twinkling star field around the hero spool (and telecom scenes).
 * Soft cyan + white points only — no cross-shaped sparkles.
 */
export function ParticleGrid() {
  const pointsRef = useRef<THREE.Points>(null);
  const phasesRef = useRef<Float32Array | null>(null);

  const { positions, colors, phases, baseColors } = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3);
    const colors = new Float32Array(STAR_COUNT * 3);
    const baseColors = new Float32Array(STAR_COUNT * 3);
    const phases = new Float32Array(STAR_COUNT);

    const cyan = new THREE.Color("#00D4FF");
    const white = new THREE.Color("#E8F7FF");
    const soft = new THREE.Color("#6ECFFF");

    for (let i = 0; i < STAR_COUNT; i++) {
      // Sphere shell around the spool so stars frame the product
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.2 + Math.random() * 4.5;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.75;
      positions[i * 3 + 2] = r * Math.cos(phi) - 1.2;

      const roll = Math.random();
      const c = roll > 0.72 ? white : roll > 0.35 ? cyan : soft;
      const brightness = 0.35 + Math.random() * 0.65;
      baseColors[i * 3] = c.r * brightness;
      baseColors[i * 3 + 1] = c.g * brightness;
      baseColors[i * 3 + 2] = c.b * brightness;
      colors[i * 3] = baseColors[i * 3];
      colors[i * 3 + 1] = baseColors[i * 3 + 1];
      colors[i * 3 + 2] = baseColors[i * 3 + 2];
      phases[i] = Math.random() * Math.PI * 2;
    }

    return { positions, colors, phases, baseColors };
  }, []);

  phasesRef.current = phases;

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.018;
      pointsRef.current.rotation.x = Math.sin(t * 0.07) * 0.04;

      const geo = pointsRef.current.geometry;
      const colorAttr = geo.getAttribute("color") as THREE.BufferAttribute;
      const arr = colorAttr.array as Float32Array;
      const ph = phasesRef.current;
      if (ph) {
        for (let i = 0; i < STAR_COUNT; i++) {
          const twinkle =
            0.45 + 0.55 * (0.5 + 0.5 * Math.sin(t * (1.1 + (i % 5) * 0.27) + ph[i]));
          arr[i * 3] = baseColors[i * 3] * twinkle;
          arr[i * 3 + 1] = baseColors[i * 3 + 1] * twinkle;
          arr[i * 3 + 2] = baseColors[i * 3 + 2] * twinkle;
        }
        colorAttr.needsUpdate = true;
      }
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

export function FiberBend() {
  const fiberRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const curve = useRef(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2, 0, 0),
      new THREE.Vector3(-0.8, 0, 0),
      new THREE.Vector3(-0.15, 0.6, 0),
      new THREE.Vector3(0.1, 0.75, 0),
      new THREE.Vector3(0.5, 0.5, 0),
      new THREE.Vector3(1.2, 0.1, 0),
      new THREE.Vector3(2.5, 0, 0),
    ])
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const bend = 0.75 + Math.sin(t * 0.8) * 0.15;

    curve.current.points[2].y = bend;
    curve.current.points[3].y = bend + 0.15;

    if (fiberRef.current) {
      const prev = fiberRef.current.geometry;
      fiberRef.current.geometry = new THREE.TubeGeometry(curve.current, 64, 0.025, 8, false);
      prev.dispose();
    }

    if (glowRef.current) {
      glowRef.current.position.set(0.1, bend + 0.15, 0);
    }
  });

  return (
    <Float speed={0.8} floatIntensity={0.2}>
      <group scale={1.2}>
        <mesh ref={fiberRef}>
          <tubeGeometry args={[curve.current, 64, 0.025, 8, false]} />
          <meshStandardMaterial
            color="#00D4FF"
            emissive="#00D4FF"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.15}
          />
        </mesh>

        {/* Индикатор радиуса изгиба */}
        <mesh position={[0, 0.75, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.075, 0.003, 8, 32]} />
          <meshBasicMaterial color="#00D4FF" transparent opacity={0.5} />
        </mesh>

        <mesh ref={glowRef}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial
            color="#00D4FF"
            emissive="#00D4FF"
            emissiveIntensity={1}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Support block */}
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[4, 0.05, 0.3]} />
          <meshStandardMaterial color="#1a3a5c" metalness={0.4} roughness={0.6} />
        </mesh>
      </group>
    </Float>
  );
}
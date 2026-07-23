"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function SignalRing({ radius, y }: { radius: number; y: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + radius) * 0.05);
      (ref.current.material as THREE.MeshBasicMaterial).opacity =
        0.15 + Math.sin(state.clock.elapsedTime * 1.5 + radius) * 0.1;
    }
  });

  return (
    <mesh ref={ref} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.008, 8, 48]} />
      <meshBasicMaterial color="#00D4FF" transparent opacity={0.2} />
    </mesh>
  );
}

export function TelecomTower() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  return (
    <Float speed={1} floatIntensity={0.3}>
      <group ref={groupRef} scale={1.4}>
        {/* Mast */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.1, 2.8, 8]} />
          <meshStandardMaterial color="#1e3a5f" metalness={0.7} roughness={0.35} />
        </mesh>

        {/* Cross arms */}
        {[0.6, 1.2, 1.8].map((y) => (
          <mesh key={y} position={[0, y - 0.8, 0]}>
            <boxGeometry args={[1.2, 0.04, 0.04]} />
            <meshStandardMaterial color="#2d4a6f" metalness={0.6} roughness={0.4} />
          </mesh>
        ))}

        {/* Antennas */}
        {[-0.5, 0, 0.5].map((x) => (
          <mesh key={x} position={[x, 1.6, 0]}>
            <boxGeometry args={[0.06, 0.4, 0.06]} />
            <meshStandardMaterial
              color="#00D4FF"
              emissive="#00D4FF"
              emissiveIntensity={0.3}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        ))}

        {/* Signal rings */}
        <SignalRing radius={0.5} y={1.8} />
        <SignalRing radius={0.8} y={1.8} />
        <SignalRing radius={1.1} y={1.8} />

        {/* Base */}
        <mesh position={[0, -1.5, 0]}>
          <cylinderGeometry args={[0.35, 0.4, 0.2, 16]} />
          <meshStandardMaterial color="#0A2540" metalness={0.5} roughness={0.5} />
        </mesh>

        {/* Fiber cable down */}
        <mesh position={[0.15, -0.5, 0.1]} rotation={[0, 0, 0.1]}>
          <cylinderGeometry args={[0.015, 0.015, 1.2, 8]} />
          <meshStandardMaterial
            color="#00D4FF"
            emissive="#00D4FF"
            emissiveIntensity={0.4}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
}
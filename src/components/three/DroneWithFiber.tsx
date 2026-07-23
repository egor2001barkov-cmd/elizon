"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function Propeller({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 12;
  });

  return (
    <group position={position}>
      <mesh ref={ref}>
        <boxGeometry args={[0.5, 0.02, 0.08]} />
        <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.5, 0.02, 0.08]} />
        <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
}

function FiberModule() {
  return (
    <group position={[0, -0.35, 0]}>
      <mesh>
        <boxGeometry args={[0.35, 0.15, 0.25]} />
        <meshStandardMaterial color="#0A2540" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0, -0.05, 0.1]}>
        <cylinderGeometry args={[0.12, 0.12, 0.08, 16]} />
        <meshStandardMaterial
          color="#00D4FF"
          emissive="#00D4FF"
          emissiveIntensity={0.4}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0, -0.2, 0.15]} rotation={[0.3, 0, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.6, 8]} />
        <meshStandardMaterial
          color="#00D4FF"
          emissive="#00D4FF"
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

export function DroneWithFiber() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.03;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.05;
    }
  });

  const arms: [number, number, number][] = [
    [0.55, 0, 0.55],
    [-0.55, 0, 0.55],
    [0.55, 0, -0.55],
    [-0.55, 0, -0.55],
  ];

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} scale={1.3}>
        {/* Body */}
        <mesh>
          <boxGeometry args={[0.4, 0.1, 0.4]} />
          <meshStandardMaterial color="#1e3a5f" metalness={0.6} roughness={0.35} />
        </mesh>
        {/* Arms */}
        {arms.map((pos, i) => (
          <group key={i}>
            <mesh position={pos}>
              <boxGeometry args={[0.6, 0.04, 0.04]} />
              <meshStandardMaterial color="#2d4a6f" metalness={0.5} roughness={0.4} />
            </mesh>
            <Propeller position={[pos[0] * 1.15, 0.08, pos[2] * 1.15]} />
          </group>
        ))}
        {/* Camera */}
        <mesh position={[0, -0.08, 0.15]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
        </mesh>
        <FiberModule />
      </group>
    </Float>
  );
}
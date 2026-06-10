"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import type { Mesh } from "three";

/**
 * Lightweight R3F hero accent: a single slowly drifting, softly distorted
 * translucent sphere in the navy/teal palette. Low-poly and low-cost to
 * protect Core Web Vitals.
 *
 * Rendering is fully gated by the wrapper (HeroAccent): this module is only
 * ever mounted on larger screens, when motion is allowed, and is dynamically
 * imported with ssr:false so it never blocks LCP.
 */

function DriftingBlob() {
  const mesh = useRef<Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    // Very slow rotation — premium, never distracting.
    mesh.current.rotation.x = t * 0.08;
    mesh.current.rotation.y = t * 0.1;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.8}>
      <mesh ref={mesh} scale={2.4}>
        {/* Low-poly icosphere — cheap geometry. */}
        <icosahedronGeometry args={[1, 6]} />
        <MeshDistortMaterial
          color="#2FD2C4"
          emissive="#0D1F3C"
          emissiveIntensity={0.35}
          roughness={0.35}
          metalness={0.15}
          transparent
          opacity={0.55}
          distort={0.35}
          speed={1.2}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 6], fov: 45 }}
      frameloop="always"
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} color="#7fe3da" />
      <directionalLight position={[-4, -2, 2]} intensity={0.5} color="#3a6ad6" />
      <DriftingBlob />
    </Canvas>
  );
}

"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

/** کره زمین وایرفریم با چرخش آرام */
function Globe({ detail }: { detail: number }) {
  const wire = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (wire.current) wire.current.rotation.y += delta * 0.18;
    if (core.current) core.current.rotation.y -= delta * 0.08;
  });

  return (
    <group>
      <mesh ref={core}>
        <sphereGeometry args={[1.42, detail, detail]} />
        <meshStandardMaterial
          color="#0A0E27"
          emissive="#6C63FF"
          emissiveIntensity={0.35}
          roughness={0.45}
          metalness={0.6}
        />
      </mesh>
      <mesh ref={wire}>
        <sphereGeometry args={[1.75, detail, detail]} />
        <meshBasicMaterial color="#00D9A3" wireframe transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

/** حلقه‌های مداری درخشان */
function OrbitalRings() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.z += delta * 0.06;
      group.current.rotation.x += delta * 0.02;
    }
  });
  return (
    <group ref={group}>
      <mesh rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[2.5, 0.012, 12, 160]} />
        <meshBasicMaterial color="#6C63FF" transparent opacity={0.85} />
      </mesh>
      <mesh rotation={[Math.PI / 1.8, 0.4, 0]}>
        <torusGeometry args={[3.05, 0.009, 12, 160]} />
        <meshBasicMaterial color="#00D9A3" transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 2.9, -0.5, 0.3]}>
        <torusGeometry args={[3.55, 0.007, 12, 140]} />
        <meshBasicMaterial color="#FFD93D" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

/** ذرات شناور در فضا */
function Particles({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = 3.6 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      array[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      array[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      array[i * 3 + 2] = radius * Math.cos(phi);
    }
    return array;
  }, [count]);

  useFrame((_, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.03;
      points.current.rotation.x += delta * 0.008;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color="#8B84FF" transparent opacity={0.85} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/** مکعب‌های شناور نماد تکنولوژی */
function FloatingCubes({ count }: { count: number }) {
  const cubes = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        id: index,
        position: [
          (Math.random() - 0.5) * 9,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 5 - 1,
        ] as [number, number, number],
        scale: 0.1 + Math.random() * 0.2,
        speed: 0.6 + Math.random() * 1.4,
        color: ["#6C63FF", "#00D9A3", "#FF6B6B", "#FFD93D"][index % 4],
      })),
    [count],
  );

  return (
    <>
      {cubes.map((cube) => (
        <Float key={cube.id} speed={cube.speed} rotationIntensity={1.4} floatIntensity={1.8}>
          <mesh position={cube.position} scale={cube.scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={cube.color}
              emissive={cube.color}
              emissiveIntensity={0.55}
              metalness={0.7}
              roughness={0.25}
              transparent
              opacity={0.85}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

/** پارالاکس بر اساس حرکت موس */
function ParallaxRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    const targetX = state.pointer.y * 0.28;
    const targetY = state.pointer.x * 0.42;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 3, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 3, delta);
  });
  return <group ref={group}>{children}</group>;
}

/** صحنه سه‌بعدی هیرو — کره زمین، حلقه‌ها، ذرات و مکعب‌ها */
export default function Hero3DScene({ mobile = false }: { mobile?: boolean }) {
  const detail = mobile ? 18 : 32;
  const particleCount = mobile ? 320 : 800;
  const cubeCount = mobile ? 6 : 12;

  return (
    <Canvas
      dpr={mobile ? [1, 1.4] : [1, 2]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.55} />
      <pointLight position={[6, 5, 6]} intensity={140} color="#6C63FF" />
      <pointLight position={[-7, -4, 3]} intensity={110} color="#00D9A3" />
      <pointLight position={[0, 6, -6]} intensity={70} color="#FFD93D" />
      <spotLight position={[0, 8, 4]} angle={0.5} penumbra={1} intensity={60} color="#FF6B6B" />

      <Stars radius={90} depth={40} count={mobile ? 900 : 2200} factor={3.4} saturation={0} fade speed={0.7} />

      <ParallaxRig>
        <Globe detail={detail} />
        <OrbitalRings />
        <FloatingCubes count={cubeCount} />
      </ParallaxRig>
      <Particles count={particleCount} />
    </Canvas>
  );
}

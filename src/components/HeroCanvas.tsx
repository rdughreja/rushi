"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useMemo, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Floating geometric shapes - Fixed version
function FloatingShapes({ count = 15, spread = 20, speed = 0.3 }) {
  const shapesRef = useRef<THREE.Mesh[]>([]);
  const groupRef = useRef<THREE.Group>(null);

  // Pre-create geometries and materials
  const geometries = useMemo(() => [
    new THREE.OctahedronGeometry(1, 0),
    new THREE.IcosahedronGeometry(1, 0),
    new THREE.TetrahedronGeometry(1, 0),
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.DodecahedronGeometry(1, 0),
  ], []);

  const materials = useMemo(() => [
    new THREE.MeshPhysicalMaterial({
      color: 0x00d4ff,
      metalness: 0.3,
      roughness: 0.2,
      transparent: true,
      opacity: 0.15,
      transmission: 0.3,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    }),
    new THREE.MeshPhysicalMaterial({
      color: 0xff006e,
      metalness: 0.4,
      roughness: 0.3,
      transparent: true,
      opacity: 0.15,
      transmission: 0.3,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    }),
    new THREE.MeshPhysicalMaterial({
      color: 0x8338ec,
      metalness: 0.2,
      roughness: 0.4,
      transparent: true,
      opacity: 0.15,
      transmission: 0.3,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    }),
  ], []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    shapesRef.current.forEach((mesh, i) => {
      const offset = i * 0.5;
      mesh.rotation.x += 0.001 * speed;
      mesh.rotation.y += 0.002 * speed;
      mesh.position.y = Math.sin(time * speed + offset) * 0.5;
      mesh.position.x = Math.cos(time * speed * 0.7 + offset) * 0.3;
    });
    
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.02 * speed;
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: count }).map((_, i) => {
        const geometry = geometries[i % geometries.length];
        const material = materials[i % materials.length];
        return (
          <mesh
            key={i}
            ref={(el) => { if (el) shapesRef.current[i] = el; }}
            position={[
              (Math.random() - 0.5) * spread,
              (Math.random() - 0.5) * spread * 0.5,
              (Math.random() - 0.5) * spread,
            ]}
            scale={[0.3 + Math.random() * 0.7, 0.3 + Math.random() * 0.7, 0.3 + Math.random() * 0.7]}
            castShadow
            receiveShadow
          >
            <primitive object={geometry} />
            <primitive object={material} />
          </mesh>
        );
      })}
    </group>
  );
}

// Neural network visualization
function NeuralNetwork({ nodeCount = 50, connectionDistance = 3 }) {
  const nodesRef = useRef<(THREE.Mesh & { material: THREE.MeshBasicMaterial })[]>([]);
  const linesRef = useRef<THREE.LineSegments & { material: THREE.LineBasicMaterial }>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  const positionsRef = useRef<Float32Array>(null);

  const nodePositions = useMemo(() =>
    Array.from({ length: nodeCount }, () => [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 20,
    ] as [number, number, number]),
  [nodeCount]);

  useEffect(() => {
    if (!geometryRef.current) return;
    
    const positions = new Float32Array(nodeCount * nodeCount * 6);
    let index = 0;

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = nodePositions[i][0] - nodePositions[j][0];
        const dy = nodePositions[i][1] - nodePositions[j][1];
        const dz = nodePositions[i][2] - nodePositions[j][2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < connectionDistance) {
          positions[index++] = nodePositions[i][0];
          positions[index++] = nodePositions[i][1];
          positions[index++] = nodePositions[i][2];
          positions[index++] = nodePositions[j][0];
          positions[index++] = nodePositions[j][1];
          positions[index++] = nodePositions[j][2];
        }
      }
    }

    positionsRef.current = new Float32Array(index);
    positionsRef.current.set(positions.slice(0, index));
    
    geometryRef.current.setAttribute('position', new THREE.BufferAttribute(positionsRef.current, 3));
    geometryRef.current.attributes.position.needsUpdate = true;
  }, [nodeCount, connectionDistance, nodePositions]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    nodesRef.current.forEach((mesh, i) => {
      const pos = nodePositions[i];
      mesh.position.y = pos[1] + Math.sin(time * 0.5 + i * 0.3) * 0.3;
      mesh.material.opacity = 0.4 + Math.sin(time * 2 + i) * 0.3;
      mesh.scale.setScalar(0.8 + Math.sin(time * 1.5 + i) * 0.3);
    });

    if (linesRef.current) {
      linesRef.current.material.opacity = 0.15 + Math.sin(time * 0.8) * 0.1;
    }
  });

  return (
    <group>
      <lineSegments ref={linesRef}>
        <bufferGeometry ref={geometryRef} />
        <lineBasicMaterial
          color={0x00d4ff}
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      {nodePositions.map((pos, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) nodesRef.current[i] = el as THREE.Mesh & { material: THREE.MeshBasicMaterial }; }}
          position={pos}
        >
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? 0x00d4ff : i % 3 === 1 ? 0xff006e : 0x8338ec}
            transparent
            opacity={0.6}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

// Particle field
function ParticleField({ count = 500, size = 30 }) {
  const pointsRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  useEffect(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * size;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i * 3] = 0; colors[i * 3 + 1] = 212/255; colors[i * 3 + 2] = 1;
      } else if (colorChoice < 0.66) {
        colors[i * 3] = 1; colors[i * 3 + 1] = 0; colors[i * 3 + 2] = 110/255;
      } else {
        colors[i * 3] = 131/255; colors[i * 3 + 1] = 56/255; colors[i * 3 + 2] = 1;
      }

      sizes[i] = Math.random() * 2 + 0.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometryRef.current = geometry;
  }, [count, size]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.01;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometryRef.current ?? undefined}>
      <shaderMaterial
        vertexShader={`
          attribute float size;
          varying vec3 vColor;
          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying vec3 vColor;
          void main() {
            float dist = length(gl_PointCoord - 0.5);
            if (dist > 0.5) discard;
            float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
            gl_FragColor = vec4(vColor, alpha * 0.6);
          }
        `}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        vertexColors
      />
    </points>
  );
}

// Hero 3D Scene
export function HeroCanvas({ className }: { className?: string }) {
  const [intersect, setIntersect] = useState(false);

  return (
    <Canvas
      className={cn("fixed inset-0 -z-10", className)}
      camera={{ position: [0, 0, 15], fov: 50 }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
      onCreated={({ gl }) => {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }}
    >
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 10, 50]} />
      
      {/* Lights */}
      <ambientLight intensity={0.5} color="#ffffff" />
      <directionalLight position={[5, 10, 5]} intensity={1} color="#00d4ff" />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#ff006e" />
      <pointLight position={[0, 5, 5]} intensity={0.5} color="#8338ec" decay={2} />
      
      {/* Floating shapes */}
      <FloatingShapes count={20} spread={25} speed={0.4} />
      
      {/* Neural network */}
      <NeuralNetwork nodeCount={40} connectionDistance={4} />
      
      {/* Particle field */}
      <ParticleField count={800} size={35} />
      
      {/* Mouse interaction raycasting */}
      <Html
        wrapperClass={cn("pointer-events-none", intersect && "pointer-events-auto")}
        center
        position={[0, 0, 0]}
        onPointerOver={() => setIntersect(true)}
        onPointerOut={() => setIntersect(false)}
      >
        <div className="pointer-events-auto" />
      </Html>
    </Canvas>
  );
}

// Section 3D Backgrounds
export function SectionCanvas({ 
  children, 
  className, 
  type = "particles" 
}: { 
  children?: React.ReactNode;
  className?: string;
  type?: "particles" | "grid" | "waves";
}) {
  return (
    <Canvas
      className={cn("absolute inset-0 -z-10 pointer-events-none", className)}
      camera={{ position: [0, 0, 20], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["transparent"]} />
      
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 10, 5]} intensity={0.5} color="#00d4ff" />
      <directionalLight position={[-5, 5, -5]} intensity={0.3} color="#ff006e" />
      
      {type === "particles" && <ParticleField count={300} size={25} />}
      {type === "grid" && <GridField />}
      {type === "waves" && <WaveField />}
      
      {children}
    </Canvas>
  );
}

function GridField() {
  const gridRef = useRef<THREE.LineSegments & { material: THREE.LineBasicMaterial }>(null);
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.material.opacity = 0.05 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.03;
    }
  });

  return (
    <lineSegments ref={gridRef}>
      <planeGeometry args={[50, 50, 50, 50]} />
      <lineBasicMaterial color="#00d4ff" transparent opacity={0.05} />
    </lineSegments>
  );
}

function WaveField() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const positions = meshRef.current.geometry.attributes.position;
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const z = positions.getZ(i);
        positions.setY(i, Math.sin(x * 0.5 + time) * Math.cos(z * 0.5 + time) * 0.5);
      }
      positions.needsUpdate = true;
      meshRef.current.geometry.computeVertexNormals();
    }
  });

  return (
    <mesh ref={meshRef} rotation-x={-Math.PI / 2} position-y={-5}>
      <planeGeometry args={[60, 60, 60, 60]} />
      <meshPhysicalMaterial
        color="#050505"
        metalness={0.1}
        roughness={0.8}
        transparent
        opacity={0.3}
        wireframe
      />
    </mesh>
  );
}
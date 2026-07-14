// components/ThreeVisualizer.tsx
"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
import * as THREE from "three";

interface VisualizerProps {
  color: string;
  wheels: string;
  spoiler: string;
  suspension: string;
  isDriving: boolean;
}

// Procedural 3D Car Model Component
function ProceduralCar({ color, wheels, spoiler, suspension, isDriving }: VisualizerProps) {
  const chassisRef = useRef<THREE.Group>(null);
  const frontLeftWheel = useRef<THREE.Mesh>(null);
  const frontRightWheel = useRef<THREE.Mesh>(null);
  const rearLeftWheel = useRef<THREE.Mesh>(null);
  const rearRightWheel = useRef<THREE.Mesh>(null);

  // Animate wheel rotation if in drive mode
  useFrame((state, delta) => {
    if (isDriving) {
      const rotationSpeed = 8 * delta;
      if (frontLeftWheel.current) frontLeftWheel.current.rotation.x += rotationSpeed;
      if (frontRightWheel.current) frontRightWheel.current.rotation.x += rotationSpeed;
      if (rearLeftWheel.current) rearLeftWheel.current.rotation.x += rotationSpeed;
      if (rearRightWheel.current) rearRightWheel.current.rotation.x += rotationSpeed;
    }
  });

  // Calculate suspension height offsets
  let suspensionOffset = 0; // normal
  if (suspension === "lowered") suspensionOffset = -0.15;
  if (suspension === "raised") suspensionOffset = 0.25;

  // Wheel styling variables
  let wheelColor = "#111111";
  let wheelRadius = 0.4;
  let wheelWidth = 0.25;
  if (wheels === "chrome") wheelColor = "#d1d5db";
  if (wheels === "beadlock") wheelColor = "#ff3333";
  if (wheels === "deepdish") {
    wheelColor = "#f59e0b";
    wheelWidth = 0.32;
  }

  return (
    <group>
      {/* 3D Car Body Chassis (Translates on Y axis depending on suspension setup) */}
      <group ref={chassisRef} position={[0, 0.45 + suspensionOffset, 0]}>
        {/* Underbody chassis block */}
        <mesh castShadow receiveShadow position={[0, 0.25, 0]}>
          <boxGeometry args={[3.2, 0.4, 1.4]} />
          <meshStandardMaterial color={color} metalness={0.9} roughness={0.15} />
        </mesh>

        {/* Cabin Glass top */}
        <mesh castShadow position={[-0.2, 0.7, 0]}>
          <boxGeometry args={[1.5, 0.5, 1.2]} />
          <meshStandardMaterial color="#0f172a" metalness={1.0} roughness={0.05} transparent opacity={0.8} />
        </mesh>

        {/* Headlights (Front is along +X axis) */}
        <mesh position={[1.61, 0.25, 0.4]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[1.61, 0.25, -0.4]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>

        {/* Tail lights (Rear is along -X axis) */}
        <mesh position={[-1.61, 0.25, 0.4]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.05, 0.1, 0.2]} />
          <meshBasicMaterial color="#ff3333" />
        </mesh>
        <mesh position={[-1.61, 0.25, -0.4]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.05, 0.1, 0.2]} />
          <meshBasicMaterial color="#ff3333" />
        </mesh>

        {/* Spoiler Additions */}
        {spoiler !== "none" && (
          <group position={[-1.4, 0.55, 0]}>
            {/* Spoiler struts mount */}
            <mesh castShadow position={[0, 0.1, 0.35]}>
              <boxGeometry args={[0.08, 0.25, 0.05]} />
              <meshStandardMaterial color="#111" />
            </mesh>
            <mesh castShadow position={[0, 0.1, -0.35]}>
              <boxGeometry args={[0.08, 0.25, 0.05]} />
              <meshStandardMaterial color="#111" />
            </mesh>
            {/* Spoiler wing blade (raised GT is larger and red/blue color tipped) */}
            <mesh castShadow position={[0.05, 0.22, 0]}>
              <boxGeometry args={spoiler === "gt" ? [0.35, 0.04, 1.6] : [0.25, 0.03, 1.3]} />
              <meshStandardMaterial color={spoiler === "gt" ? "#0066ff" : "#1e293b"} metalness={0.9} roughness={0.1} />
            </mesh>
          </group>
        )}
      </group>

      {/* 3D Wheels Setup (Rotates independently of suspension chassis) */}
      <group position={[0, 0.4, 0]}>
        {/* Front Left Wheel */}
        <mesh ref={frontLeftWheel} castShadow position={[1.0, 0, 0.75]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[wheelRadius, wheelRadius, wheelWidth, 24]} />
          <meshStandardMaterial color={wheelColor} metalness={wheels === "chrome" ? 0.9 : 0.4} roughness={0.3} />
        </mesh>
        
        {/* Front Right Wheel */}
        <mesh ref={frontRightWheel} castShadow position={[1.0, 0, -0.75]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[wheelRadius, wheelRadius, wheelWidth, 24]} />
          <meshStandardMaterial color={wheelColor} metalness={wheels === "chrome" ? 0.9 : 0.4} roughness={0.3} />
        </mesh>

        {/* Rear Left Wheel */}
        <mesh ref={rearLeftWheel} castShadow position={[-1.0, 0, 0.75]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[wheelRadius, wheelRadius, wheelWidth, 24]} />
          <meshStandardMaterial color={wheelColor} metalness={wheels === "chrome" ? 0.9 : 0.4} roughness={0.3} />
        </mesh>

        {/* Rear Right Wheel */}
        <mesh ref={rearRightWheel} castShadow position={[-1.0, 0, -0.75]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[wheelRadius, wheelRadius, wheelWidth, 24]} />
          <meshStandardMaterial color={wheelColor} metalness={wheels === "chrome" ? 0.9 : 0.4} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

export default function ThreeVisualizer({ color, wheels, spoiler, suspension, isDriving }: VisualizerProps) {
  return (
    <div className="w-full h-full min-h-[420px] bg-gradient-radial from-slate-900 to-black rounded-lg overflow-hidden relative">
      <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center text-text-secondary text-sm">Initializing 3D Canvas WebGL...</div>}>
        <Canvas shadows camera={{ position: [4, 2, 4], fov: 40 }}>
          {/* Ambient environment base lighting */}
          <ambientLight intensity={0.4} />
          
          {/* Directional studio lights with shadows config */}
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight position={[-5, 4, -5]} intensity={0.4} />
          <spotLight position={[0, 5, 0]} intensity={0.8} angle={0.6} penumbra={1} castShadow />

          {/* Procedural Car Chassis */}
          <ProceduralCar 
            color={color} 
            wheels={wheels} 
            spoiler={spoiler} 
            suspension={suspension} 
            isDriving={isDriving} 
          />

          {/* Studio floor ground with reflections */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <shadowMaterial opacity={0.4} />
          </mesh>

          {/* Reference grids */}
          <Grid
            renderOrder={-1}
            position={[0, -0.01, 0]}
            args={[10, 10]}
            cellSize={0.5}
            cellThickness={0.5}
            cellColor="#1e293b"
            sectionSize={2}
            sectionThickness={1.2}
            sectionColor="#334155"
            fadeDistance={25}
          />

          {/* Orbit configurations */}
          <OrbitControls 
            enableZoom={true} 
            maxPolarAngle={Math.PI / 2.1} 
            minDistance={2} 
            maxDistance={12} 
          />
        </Canvas>
      </Suspense>
    </div>
  );
}

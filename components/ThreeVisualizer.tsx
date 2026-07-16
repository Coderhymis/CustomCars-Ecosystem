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
  type?: string;             // 'suv' | 'coupe' | 'hatchback'
  paintFinish?: string;      // 'glossy' | 'matte' | 'chrome'
  neonColor?: string;        // 'blue' | 'red' | 'green' | 'purple' | 'off'
  headlightsActive?: boolean;
}

// Procedural 3D Car Model Component
function ProceduralCar({ 
  color, 
  wheels, 
  spoiler, 
  suspension, 
  isDriving, 
  type = "suv", 
  paintFinish = "glossy", 
  neonColor = "off", 
  headlightsActive = false 
}: VisualizerProps) {
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

  // Calculate suspension height offsets based on suspension selection & car type
  let suspensionOffset = 0; // normal
  if (suspension === "lowered") suspensionOffset = -0.15;
  if (suspension === "raised") suspensionOffset = 0.25;

  // Adapt suspension defaults based on vehicle class
  let baseHeight = 0.45;
  if (type === "suv") baseHeight = 0.65;
  if (type === "coupe") baseHeight = 0.35;

  // Paint Finish settings
  let metalness = 0.6;
  let roughness = 0.15;
  if (paintFinish === "matte") {
    metalness = 0.1;
    roughness = 0.75;
  } else if (paintFinish === "chrome") {
    metalness = 1.0;
    roughness = 0.02;
  }

  // Wheel styling variables
  let wheelColor = "#111111";
  let wheelRadius = 0.4;
  let wheelWidth = 0.25;
  
  if (type === "suv") {
    wheelRadius = 0.5;
    wheelWidth = 0.32;
  }
  
  if (wheels === "chrome") wheelColor = "#f3f4f6";
  if (wheels === "beadlock") wheelColor = "#b91c1c";
  if (wheels === "deepdish") {
    wheelColor = "#d97706";
    wheelWidth = type === "suv" ? 0.38 : 0.32;
  }

  // Neon Underglow Color Hex Maps
  const neonHexMap: Record<string, string> = {
    blue: "#3b82f6",
    red: "#ef4444",
    green: "#10b981",
    purple: "#a855f7",
    off: ""
  };
  const activeNeonHex = neonHexMap[neonColor];

  // Headlight illumination color
  const lightColor = headlightsActive ? "#fffaed" : "#333333";

  return (
    <group>
      {/* 3D Car Body Chassis (Translates on Y axis depending on suspension setup) */}
      <group ref={chassisRef} position={[0, baseHeight + suspensionOffset, 0]}>
        
        {/* Render body depending on vehicle type */}
        {type === "suv" && (
          <>
            {/* SUV Rugged Lower Chassis */}
            <mesh castShadow receiveShadow position={[0, 0.35, 0]}>
              <boxGeometry args={[3.0, 0.7, 1.5]} />
              <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
            </mesh>
            {/* SUV Tall Boxy Cabin */}
            <mesh castShadow position={[-0.2, 0.95, 0]}>
              <boxGeometry args={[1.6, 0.6, 1.3]} />
              <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} transparent opacity={0.8} />
            </mesh>
            {/* SUV Roof Rack bars */}
            <mesh position={[-0.2, 1.28, 0.4]}>
              <boxGeometry args={[1.5, 0.05, 0.05]} />
              <meshStandardMaterial color="#1e293b" />
            </mesh>
            <mesh position={[-0.2, 1.28, -0.4]}>
              <boxGeometry args={[1.5, 0.05, 0.05]} />
              <meshStandardMaterial color="#1e293b" />
            </mesh>
          </>
        )}

        {type === "coupe" && (
          <>
            {/* Coupe Low-profile Chassis */}
            <mesh castShadow receiveShadow position={[0, 0.2, 0]}>
              <boxGeometry args={[3.4, 0.4, 1.4]} />
              <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
            </mesh>
            {/* Coupe Sleek Aerodynamic Cabin */}
            <mesh castShadow position={[-0.3, 0.55, 0]}>
              <boxGeometry args={[1.6, 0.4, 1.15]} />
              <meshStandardMaterial color="#090d16" metalness={1.0} roughness={0.02} transparent opacity={0.75} />
            </mesh>
            {/* Rear Sport Diffuser */}
            <mesh position={[-1.7, 0.08, 0]}>
              <boxGeometry args={[0.1, 0.15, 1.1]} />
              <meshStandardMaterial color="#111" roughness={0.9} />
            </mesh>
          </>
        )}

        {type === "hatchback" && (
          <>
            {/* Hatchback Compact Chassis */}
            <mesh castShadow receiveShadow position={[0, 0.25, 0]}>
              <boxGeometry args={[2.7, 0.5, 1.35]} />
              <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
            </mesh>
            {/* Hatchback Flat-back Cabin */}
            <mesh castShadow position={[-0.4, 0.65, 0]}>
              <boxGeometry args={[1.3, 0.45, 1.15]} />
              <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} transparent opacity={0.8} />
            </mesh>
          </>
        )}

        {/* Headlights (Front is along +X axis) */}
        <mesh position={[type === "coupe" ? 1.71 : type === "hatchback" ? 1.36 : 1.51, 0.25, 0.45]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
          <meshBasicMaterial color={lightColor} />
        </mesh>
        <mesh position={[type === "coupe" ? 1.71 : type === "hatchback" ? 1.36 : 1.51, 0.25, -0.45]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
          <meshBasicMaterial color={lightColor} />
        </mesh>

        {/* Forward Headlight Beam Spotlight Projection */}
        {headlightsActive && (
          <group position={[1.8, 0.25, 0]}>
            <spotLight
              position={[0, 0, 0]}
              angle={0.65}
              penumbra={0.5}
              intensity={4}
              distance={8}
              color="#fffaed"
              target-position={[10, 0, 0]}
            />
          </group>
        )}

        {/* Tail lights (Rear is along -X axis) */}
        <mesh position={[type === "coupe" ? -1.71 : type === "hatchback" ? -1.36 : -1.51, 0.25, 0.45]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.05, 0.1, 0.25]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
        <mesh position={[type === "coupe" ? -1.71 : type === "hatchback" ? -1.36 : -1.51, 0.25, -0.45]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.05, 0.1, 0.25]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>

        {/* Spoiler Additions */}
        {spoiler !== "none" && (
          <group position={[type === "coupe" ? -1.5 : type === "hatchback" ? -1.2 : -1.3, type === "suv" ? 0.8 : 0.45, 0]}>
            {/* Spoiler struts */}
            <mesh castShadow position={[0, 0.1, 0.35]}>
              <boxGeometry args={[0.08, 0.25, 0.05]} />
              <meshStandardMaterial color="#111" />
            </mesh>
            <mesh castShadow position={[0, 0.1, -0.35]}>
              <boxGeometry args={[0.08, 0.25, 0.05]} />
              <meshStandardMaterial color="#111" />
            </mesh>
            {/* Spoiler wing blade (raised GT is larger and colored) */}
            <mesh castShadow position={[0.05, 0.22, 0]}>
              <boxGeometry args={spoiler === "gt" ? [0.35, 0.04, 1.6] : [0.25, 0.03, 1.3]} />
              <meshStandardMaterial color={spoiler === "gt" ? color : "#1e293b"} metalness={0.9} roughness={0.1} />
            </mesh>
          </group>
        )}

        {/* Underglow Neon mesh/glow ring visualization */}
        {activeNeonHex && (
          <group position={[0, -0.2, 0]}>
            {/* Visual glow tube */}
            <mesh>
              <boxGeometry args={[2.2, 0.03, 1.1]} />
              <meshBasicMaterial color={activeNeonHex} transparent opacity={0.65} wireframe />
            </mesh>
            {/* Downward light casting */}
            <pointLight position={[0, -0.1, 0]} intensity={3.5} distance={1.8} color={activeNeonHex} />
          </group>
        )}

      </group>

      {/* 3D Wheels Setup (Positioned relative to ground) */}
      <group position={[0, type === "suv" ? 0.5 : type === "coupe" ? 0.35 : 0.4, 0]}>
        {/* Front Left Wheel */}
        <mesh ref={frontLeftWheel} castShadow position={[1.0, 0, 0.75]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[wheelRadius, wheelRadius, wheelWidth, 24]} />
          <meshStandardMaterial color={wheelColor} metalness={wheels === "chrome" ? 0.95 : 0.3} roughness={wheels === "chrome" ? 0.05 : 0.4} />
        </mesh>
        
        {/* Front Right Wheel */}
        <mesh ref={frontRightWheel} castShadow position={[1.0, 0, -0.75]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[wheelRadius, wheelRadius, wheelWidth, 24]} />
          <meshStandardMaterial color={wheelColor} metalness={wheels === "chrome" ? 0.95 : 0.3} roughness={wheels === "chrome" ? 0.05 : 0.4} />
        </mesh>

        {/* Rear Left Wheel */}
        <mesh ref={rearLeftWheel} castShadow position={[-1.0, 0, 0.75]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[wheelRadius, wheelRadius, wheelWidth, 24]} />
          <meshStandardMaterial color={wheelColor} metalness={wheels === "chrome" ? 0.95 : 0.3} roughness={wheels === "chrome" ? 0.05 : 0.4} />
        </mesh>

        {/* Rear Right Wheel */}
        <mesh ref={rearRightWheel} castShadow position={[-1.0, 0, -0.75]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[wheelRadius, wheelRadius, wheelWidth, 24]} />
          <meshStandardMaterial color={wheelColor} metalness={wheels === "chrome" ? 0.95 : 0.3} roughness={wheels === "chrome" ? 0.05 : 0.4} />
        </mesh>
      </group>
    </group>
  );
}

export default function ThreeVisualizer({ 
  color, 
  wheels, 
  spoiler, 
  suspension, 
  isDriving, 
  type = "suv", 
  paintFinish = "glossy", 
  neonColor = "off", 
  headlightsActive = false 
}: VisualizerProps) {
  return (
    <div className="w-full h-full min-h-[420px] bg-gradient-radial from-slate-950 to-black rounded-lg overflow-hidden relative">
      <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center text-text-secondary text-sm">Initializing 3D Canvas WebGL...</div>}>
        <Canvas shadows camera={{ position: [4, 1.8, 3.8], fov: 40 }}>
          {/* Ambient environment base lighting */}
          <ambientLight intensity={0.35} />
          
          {/* Directional studio lights with shadows config */}
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight position={[-5, 4, -5]} intensity={0.4} />
          <spotLight position={[0, 6, 0]} intensity={1.2} angle={0.8} penumbra={1} castShadow />

          {/* Procedural Car Chassis */}
          <ProceduralCar 
            color={color} 
            wheels={wheels} 
            spoiler={spoiler} 
            suspension={suspension} 
            isDriving={isDriving} 
            type={type}
            paintFinish={paintFinish}
            neonColor={neonColor}
            headlightsActive={headlightsActive}
          />

          {/* Studio floor ground with reflections */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <shadowMaterial opacity={0.45} />
          </mesh>

          {/* Reference grids */}
          <Grid
            renderOrder={-1}
            position={[0, -0.01, 0]}
            args={[12, 12]}
            cellSize={0.5}
            cellThickness={0.5}
            cellColor="#1e293b"
            sectionSize={2}
            sectionThickness={1.2}
            sectionColor="#3b82f6"
            fadeDistance={20}
          />

          {/* Orbit configurations */}
          <OrbitControls 
            enableZoom={true} 
            maxPolarAngle={Math.PI / 2.05} 
            minDistance={2.2} 
            maxDistance={10} 
          />
        </Canvas>
      </Suspense>
    </div>
  );
}

"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, Lightformer } from "@react-three/drei";
import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

// Main floating knot component
const FloatingKnot: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={5.5} floatIntensity={0.5}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <torusKnotGeometry args={[3, 1, 256, 32]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={5}
          thickness={2}
          roughness={0.1}
          transmission={0.9}
          ior={1.5}
          chromaticAberration={0.02}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.2}
          color="#ffffff"
        />
      </mesh>
    </Float>
  );
};

// Camera rig for smooth mouse interaction
const CameraRig: React.FC = () => {
  useFrame((state) => {
    // Smooth camera movement based on mouse position
    const targetX = Math.sin(-state.pointer.x) * 3;
    const targetY = state.pointer.y * 2;
    const targetZ = 15 + Math.cos(state.pointer.x) * 5;
    
    // Smooth interpolation
    state.camera.position.lerp(
      new THREE.Vector3(targetX, targetY, targetZ),
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });
  
  return null;
};

// Main Three.js scene component
const HeroThreeScene: React.FC = () => {
  return (
    <div className="absolute inset-0 h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        shadows
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.2} />
        <spotLight
          position={[20, 20, 10]}
          penumbra={1}
          castShadow
          angle={0.2}
          intensity={2}
          color="#ffffff"
        />
        
        {/* Environment with HDR */}
        <Environment
          files="/3d-scenes/photo_studio_01_1k.hdr"
          background={false}
          blur={0.5}
        >
          <Lightformer
            intensity={8}
            position={[10, 5, 0]}
            scale={[10, 50, 1]}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
          />
        </Environment>
        
        {/* Main floating knot */}
        <FloatingKnot />
        
        {/* Contact shadows for grounding */}
        <ContactShadows
          scale={50}
          position={[0, -7.5, 0]}
          blur={2}
          far={20}
          opacity={0.3}
        />
        
        {/* Camera rig for interaction */}
        <CameraRig />
      </Canvas>
    </div>
  );
};

export default HeroThreeScene;
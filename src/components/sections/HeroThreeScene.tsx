"use client";
import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, Lightformer } from "@react-three/drei";
import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

interface FloatingKnotProps {
  isMobile: boolean;
}

// Main floating knot component with mobile optimizations
const FloatingKnot: React.FC<FloatingKnotProps> = ({ isMobile }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Simplified rotation - slower on mobile for better performance
      meshRef.current.rotation.x = state.clock.elapsedTime * (isMobile ? 0.15 : 0.2);
      meshRef.current.rotation.y = state.clock.elapsedTime * (isMobile ? 0.08 : 0.1);
    }
  });

  // Mobile: Much lower polygon count (64 segments) vs Desktop (128 segments)
  const segments = isMobile ? 64 : 128;
  const radialSegments = isMobile ? 8 : 16;

  return (
    <Float speed={1.5} rotationIntensity={5.5} floatIntensity={0.5}>
      <mesh ref={meshRef} castShadow={!isMobile} receiveShadow={!isMobile} scale={isMobile ? 0.6 : 1}>
        <torusKnotGeometry args={[3, 1, segments, radialSegments]} />
        {isMobile ? (
          // Mobile: Use MeshStandardMaterial with emissive for better compatibility
          // Transmission materials can fail on some mobile devices
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.2}
            metalness={0.3}
            emissive="#ffffff"
            emissiveIntensity={0.2}
            transparent={true}
            opacity={0.9}
          />
        ) : (
          // Desktop: Full quality transmission material
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
        )}
      </mesh>
    </Float>
  );
};

// Camera rig for smooth mouse interaction (desktop only)
interface CameraRigProps {
  isMobile: boolean;
}

const CameraRig: React.FC<CameraRigProps> = ({ isMobile }) => {
  useFrame((state) => {
    // Don't run camera rig on mobile to save performance
    if (isMobile) return;
    
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
interface HeroThreeSceneProps {
  isMobile: boolean;
}

const HeroThreeScene: React.FC<HeroThreeSceneProps> = ({ isMobile }) => {
  return (
    <div className="absolute inset-0 h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 15], fov: isMobile ? 55 : 60 }}
        gl={{ 
          alpha: true, 
          antialias: !isMobile, // Disable antialiasing on mobile
          powerPreference: isMobile ? "low-power" : "high-performance"
        }}
        dpr={isMobile ? [1, 1] : [1, 2]} // Lower DPR on mobile (no high DPI)
        shadows={!isMobile} // Disable shadows on mobile
        frameloop="always" // Always render, don't pause on performance issues
      >
        {/* Lighting setup */}
        <ambientLight intensity={isMobile ? 0.4 : 0.2} />
        {isMobile ? (
          // Mobile: Enhanced lighting for better visibility
          <>
            <directionalLight position={[20, 20, 10]} intensity={2} color="#ffffff" />
            <directionalLight position={[-20, 10, -10]} intensity={0.8} color="#ffffff" />
          </>
        ) : (
          // Desktop: Full lighting with shadows
          <spotLight
            position={[20, 20, 10]}
            penumbra={1}
            castShadow
            angle={0.2}
            intensity={2}
            color="#ffffff"
          />
        )}
        
        {/* Environment with HDR - Wrap in Suspense for mobile compatibility */}
        <Suspense fallback={null}>
          <Environment
            files="/3d-scenes/photo_studio_01_1k.hdr"
            background={false}
            blur={isMobile ? 0.8 : 0.5} // More blur on mobile to reduce quality needs
          >
            {!isMobile && (
              // Desktop only: Lightformer for enhanced lighting
              <Lightformer
                intensity={8}
                position={[10, 5, 0]}
                scale={[10, 50, 1]}
                onUpdate={(self) => self.lookAt(0, 0, 0)}
              />
            )}
          </Environment>
        </Suspense>
        
        {/* Main floating knot */}
        <FloatingKnot isMobile={isMobile} />
        
        {/* Contact shadows for grounding (desktop only) */}
        {!isMobile && (
          <ContactShadows
            scale={50}
            position={[0, -7.5, 0]}
            blur={2}
            far={20}
            opacity={0.3}
          />
        )}
        
        {/* Camera rig for interaction (desktop only) */}
        <CameraRig isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default HeroThreeScene;
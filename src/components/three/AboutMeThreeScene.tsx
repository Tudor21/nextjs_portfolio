"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, Float, OrbitControls } from "@react-three/drei";
import { Model } from "@/components/three/Abstract_rainbow_translucent_pendant.jsx";
import { useMediaQuery } from "react-responsive";

const PendantScene: React.FC = () => {
   const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const scale = isMobile ? 3 : 2;
  return (
    <group>
      <Float speed={1} rotationIntensity={0.6} floatIntensity={0.6}>
        {/* The GLTF model */}
        <Model scale={scale} position={[0, 0, 0]} />
      </Float>
      <ContactShadows scale={40} position={[0, -3, 0]} blur={2} opacity={0.25} far={20} />
    </group>
  );
};

const AboutMeThreeScene: React.FC = () => {
  return (
    <div className="absolute inset-0 h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        shadows
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          <Environment files="/3d-scenes/photo_studio_01_1k.hdr" background={false} blur={0.7} />
          <PendantScene/>
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.5} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default AboutMeThreeScene;
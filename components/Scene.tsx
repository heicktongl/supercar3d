
import React, { Suspense } from 'react';
import { Canvas, ThreeElements } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, Stars, MeshReflectorMaterial, Html } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, ChromaticAberration, SMAA, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';
import { SceneConfig } from '../types';
import Car from './Car';

// Fix: Augment global JSX namespace to include react-three-fiber intrinsic elements
declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

interface SceneProps {
  config: SceneConfig;
}

const Loader = () => (
  <Html center>
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-2 border-white/10 border-t-white rounded-full animate-spin" />
      <span className="text-white/30 text-[9px] uppercase tracking-[0.3em] font-bold">Refinando Óptica</span>
    </div>
  </Html>
);

const Scene: React.FC<SceneProps> = ({ config }) => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: false, powerPreference: "high-performance" }}>
        <PerspectiveCamera makeDefault position={[5, 1.8, 5]} fov={28} />
        
        {/* Intrinsic elements augmented via ThreeElements extension */}
        <color attach="background" args={[config.bgGradientEnd]} />
        <fog attach="fog" args={[config.bgGradientStart, 12, 30]} />

        <ambientLight intensity={config.ambientIntensity} />
        
        <spotLight
          position={[10, 15, 10]}
          angle={0.25}
          penumbra={1}
          intensity={config.lightIntensity * 2.2}
          color={config.lightColor}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.00005}
          shadow-radius={config.shadowBlur * 2}
          shadow-camera-far={30}
          shadow-camera-near={1}
        />
        
        <pointLight 
          position={[-10, 5, -5]} 
          color={config.lightColor} 
          intensity={config.lightIntensity * 0.8} 
        />
        
        <spotLight
          position={[-5, 8, -15]}
          angle={0.4}
          penumbra={0.5}
          intensity={config.lightIntensity * 1.4}
          color={config.lightColor}
        />

        <rectAreaLight
          width={25}
          height={10}
          intensity={config.lightIntensity * 1.5}
          position={[0, 12, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          color={config.lightColor}
        />
        
        <Suspense fallback={<Loader />}>
          <Car config={config} />
          
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.06, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <MeshReflectorMaterial
              blur={[400, 100]}
              resolution={1024}
              mixBlur={1}
              mixStrength={60}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color={config.bgGradientStart}
              metalness={0.6}
            />
          </mesh>

          <ContactShadows 
            position={[0, -0.05, 0]} 
            opacity={config.shadowOpacity} 
            scale={12} 
            blur={config.shadowBlur} 
            far={3.5} 
            resolution={512}
          />
          
          <Environment preset="night" environmentIntensity={config.envMapIntensity * 0.6} />
        </Suspense>

        <Stars radius={200} depth={50} count={600} factor={4} saturation={0} fade speed={0.4} />

        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minDistance={4.5} 
          maxDistance={11}
          autoRotate={true}
          autoRotateSpeed={config.cameraSpeed}
          maxPolarAngle={Math.PI / 2.05}
        />

        <EffectComposer multisampling={0}>
          <SMAA />
          <Bloom 
            intensity={config.bloomIntensity * 0.4} 
            luminanceThreshold={1.1} 
            luminanceSmoothing={0.2} 
          />
          <DepthOfField 
            focusDistance={0.025} 
            focalLength={config.focalLength} 
            bokehScale={config.bokehScale} 
            height={480} 
          />
          <ChromaticAberration 
            offset={new THREE.Vector2(0.0006, 0.0006)} 
            radialModulation={true} 
            modulationOffset={0.5}
          />
          <Vignette eskil={false} offset={0.2} darkness={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default Scene;


import React, { useRef, useMemo } from 'react';
import { useFrame, ThreeElements } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { SceneConfig } from '../types';
import { CAR_MODEL_URL } from '../constants';

// Fix: Augment global JSX namespace to include react-three-fiber intrinsic elements
declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

interface CarProps {
  config: SceneConfig;
}

const Car: React.FC<CarProps> = ({ config }) => {
  const { scene } = useGLTF(CAR_MODEL_URL);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.012;
    }
  });

  useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const name = mesh.name.toLowerCase();
        
        if (name.includes('body') || name.includes('paint') || name.includes('car_body')) {
          mesh.material = new THREE.MeshPhysicalMaterial({
            color: config.paintColor,
            metalness: config.metalness,
            roughness: config.roughness,
            clearcoat: config.clearcoat,
            clearcoatRoughness: config.clearcoatRoughness,
            reflectivity: config.reflectivity,
            envMapIntensity: config.envMapIntensity,
          });
        } else if (name.includes('rim') || name.includes('wheel') || name.includes('spoke')) {
          mesh.material = new THREE.MeshPhysicalMaterial({
            color: config.rimColor,
            metalness: 1.0,
            roughness: 0.1,
            reflectivity: 1.0,
            envMapIntensity: config.envMapIntensity * 0.8,
          });
        } else if (name.includes('glass') || name.includes('windshield') || name.includes('window')) {
          mesh.material = new THREE.MeshPhysicalMaterial({
            color: '#ffffff',
            transparent: true,
            opacity: 0.15,
            metalness: 0.1,
            roughness: 0,
            transmission: 1.0,
            thickness: 1.5,
            envMapIntensity: config.envMapIntensity * 1.5,
          });
        } else if (name.includes('trim') || name.includes('plastic') || name.includes('carbon')) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: '#0a0a0a',
            roughness: 0.85,
            metalness: 0.1,
            envMapIntensity: config.envMapIntensity * 0.3,
          });
        } else if (name.includes('light') || name.includes('headlight')) {
          mesh.material = new THREE.MeshPhysicalMaterial({
            color: config.lightColor,
            emissive: config.lightColor,
            emissiveIntensity: 0.3 * config.lightIntensity,
            transparent: true,
            opacity: 0.9,
          });
        }
      }
    });
  }, [scene, config]);

  return (
    /* Intrinsic elements like group and primitive are now recognized */
    <group ref={groupRef} dispose={null} scale={1.8} position={[0, -0.05, 0]}>
      <primitive object={scene} />
    </group>
  );
};

useGLTF.preload(CAR_MODEL_URL);

export default Car;

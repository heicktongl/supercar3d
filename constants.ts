
import { SceneConfig } from './types';

export const DEFAULT_CONFIG: SceneConfig = {
  paintColor: '#cc0000',
  rimColor: '#111111',
  roughness: 0.05,
  metalness: 0.9,
  clearcoat: 1.0,
  clearcoatRoughness: 0.02,
  reflectivity: 1.0,
  lightIntensity: 1.8,
  lightColor: '#ffffff',
  ambientIntensity: 0.15,
  envMapIntensity: 2.0,
  shadowOpacity: 0.75,
  shadowBlur: 2.5,
  bgGradientStart: '#050505',
  bgGradientEnd: '#1a1a1a',
  cameraSpeed: 0.3,
  bloomIntensity: 0.6,
  bokehScale: 2.5,
  focalLength: 0.02,
  moodDescription: 'Engenharia italiana hiper-realista com profundidade de campo cinematográfica e iluminação de estúdio profissional.'
};

export const CAR_MODEL_URL = 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/models/gltf/ferrari.glb';

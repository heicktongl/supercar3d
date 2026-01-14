
export interface SceneConfig {
  paintColor: string;
  rimColor: string;
  roughness: number;
  metalness: number;
  clearcoat: number;
  clearcoatRoughness: number;
  reflectivity: number;
  lightIntensity: number;
  lightColor: string;
  ambientIntensity: number;
  envMapIntensity: number;
  shadowOpacity: number;
  shadowBlur: number;
  bgGradientStart: string;
  bgGradientEnd: string;
  cameraSpeed: number;
  bloomIntensity: number;
  bokehScale: number;
  focalLength: number;
  moodDescription: string;
}

export interface GeminiResponse {
  sceneConfig: SceneConfig;
  narrative: string;
}

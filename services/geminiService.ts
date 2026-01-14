
import { GoogleGenAI, Type } from "@google/genai";
import { SceneConfig, GeminiResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateMoodConfig(userPrompt: string): Promise<GeminiResponse> {
  // Use gemini-3-pro-preview for complex configuration generation tasks
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Você é um fotógrafo automotivo de renome mundial e diretor de iluminação 3D. Com base no conceito: "${userPrompt}", defina os parâmetros visuais e cinematográficos para uma vitrine 3D hiper-realista.

    Responda EXCLUSIVAMENTE com um objeto JSON.
    Parâmetros:
    - paintColor: Cor HEX para a carroceria.
    - rimColor: Cor HEX para as rodas.
    - roughness: 0-0.3.
    - metalness: 0.7-1.0.
    - clearcoat: 0.5-1.0.
    - clearcoatRoughness: 0.0-0.1.
    - reflectivity: 0.5-1.0.
    - lightIntensity: 1.0-4.0 (Luz principal).
    - lightColor: Cor HEX para as luzes.
    - ambientIntensity: 0.05-0.5.
    - envMapIntensity: 0.5-4.0.
    - shadowOpacity: 0.3-1.0.
    - shadowBlur: 1.0-4.0.
    - bgGradientStart: Cor HEX (fundo escuro).
    - bgGradientEnd: Cor HEX (fundo realce).
    - cameraSpeed: 0.1-1.0.
    - bloomIntensity: 0.0-2.0.
    - bokehScale: 0.0-5.0.
    - focalLength: 0.01-0.1.
    - moodDescription: Uma descrição poética EM PORTUGUÊS da atmosfera cinematográfica, destacando a qualidade das sombras e o setup de luz (ex: "iluminação dramática tipo noir", "brilho do deserto ao pôr do sol").`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          sceneConfig: {
            type: Type.OBJECT,
            properties: {
              paintColor: { type: Type.STRING },
              rimColor: { type: Type.STRING },
              roughness: { type: Type.NUMBER },
              metalness: { type: Type.NUMBER },
              clearcoat: { type: Type.NUMBER },
              clearcoatRoughness: { type: Type.NUMBER },
              reflectivity: { type: Type.NUMBER },
              lightIntensity: { type: Type.NUMBER },
              lightColor: { type: Type.STRING },
              ambientIntensity: { type: Type.NUMBER },
              envMapIntensity: { type: Type.NUMBER },
              shadowOpacity: { type: Type.NUMBER },
              shadowBlur: { type: Type.NUMBER },
              bgGradientStart: { type: Type.STRING },
              bgGradientEnd: { type: Type.STRING },
              cameraSpeed: { type: Type.NUMBER },
              bloomIntensity: { type: Type.NUMBER },
              bokehScale: { type: Type.NUMBER },
              focalLength: { type: Type.NUMBER },
              moodDescription: { type: Type.STRING },
            },
            required: ["paintColor", "rimColor", "roughness", "metalness", "clearcoat", "clearcoatRoughness", "reflectivity", "lightIntensity", "lightColor", "ambientIntensity", "envMapIntensity", "shadowOpacity", "shadowBlur", "bgGradientStart", "bgGradientEnd", "cameraSpeed", "bloomIntensity", "bokehScale", "focalLength", "moodDescription"]
          },
          narrative: { type: Type.STRING }
        },
        required: ["sceneConfig", "narrative"]
      }
    }
  });

  try {
    // Access response.text directly as a property, not a method
    return JSON.parse(response.text.trim());
  } catch (e) {
    console.error("Erro ao processar resposta do Gemini", e);
    throw new Error("Resposta inválida da IA");
  }
}

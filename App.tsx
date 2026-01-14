
import React, { useState, useCallback } from 'react';
import Scene from './components/Scene';
import Overlay from './components/Overlay';
import { DEFAULT_CONFIG } from './constants';
import { SceneConfig } from './types';
import { generateMoodConfig } from './services/geminiService';

const App: React.FC = () => {
  const [config, setConfig] = useState<SceneConfig>(DEFAULT_CONFIG);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdateMood = useCallback(async (userPrompt: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateMoodConfig(userPrompt);
      setConfig(result.sceneConfig);
    } catch (err) {
      console.error(err);
      setError("Falha ao gerar estética. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="relative w-screen h-screen bg-[#050505] overflow-hidden">
      {/* Overlay de gradiente de fundo para misturar com a cena 3D */}
      <div 
        className="absolute inset-0 pointer-events-none transition-colors duration-1000 z-0"
        style={{
          background: `radial-gradient(circle at center, transparent 0%, ${config.bgGradientEnd} 100%)`
        }}
      />

      {/* Canvas 3D Principal */}
      <Scene config={config} />

      {/* Controles da UI */}
      <Overlay 
        config={config} 
        onUpdateMood={handleUpdateMood} 
        isLoading={isLoading} 
      />

      {/* Alerta de Erro */}
      {error && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-500/80 backdrop-blur-md text-white text-xs px-6 py-3 rounded-full z-50">
          {error}
        </div>
      )}

      {/* Barra de Carregamento */}
      {isLoading && (
        <div className="absolute bottom-0 left-0 w-full h-1 z-50 overflow-hidden">
          <div className="h-full bg-white animate-[loading_2s_infinite_linear]" style={{ width: '100%', transformOrigin: 'left' }} />
        </div>
      )}

      <style>{`
        @keyframes loading {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.5); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
};

export default App;

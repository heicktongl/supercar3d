
import React, { useState } from 'react';
import { SceneConfig } from '../types';

interface OverlayProps {
  config: SceneConfig;
  onUpdateMood: (prompt: string) => void;
  isLoading: boolean;
}

const Overlay: React.FC<OverlayProps> = ({ config, onUpdateMood, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onUpdateMood(prompt);
      setPrompt('');
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 sm:p-12 z-10">
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-4xl font-light tracking-tighter text-white opacity-90">
          ZENITH <span className="font-bold text-white/100">AUTO</span>
        </h1>
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-semibold">
          Arquitetura de Iluminação via IA
        </p>
      </div>

      <div className="max-w-md pointer-events-auto transition-all duration-1000">
         <div className="bg-black/50 backdrop-blur-2xl p-6 rounded-3xl border border-white/5 shadow-2xl">
            <h3 className="text-white/30 text-[9px] uppercase tracking-[0.3em] mb-2 font-black">Perfil de Iluminação</h3>
            <p className="text-white/90 text-sm leading-relaxed font-light italic opacity-80">
              "{config.moodDescription}"
            </p>
         </div>
      </div>

      <div className="flex flex-col items-center gap-6 pointer-events-auto">
        <form 
          onSubmit={handleSubmit}
          className="w-full max-w-xl flex gap-2 bg-black/60 backdrop-blur-3xl p-2 rounded-full border border-white/10 shadow-2xl focus-within:border-white/20 transition-all"
        >
          <input 
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ajuste a atmosfera... (ex: 'Noir estilo Blade Runner', 'Oásis dourado')"
            className="flex-1 bg-transparent border-none outline-none px-6 py-3 text-white placeholder-white/20 text-sm"
            disabled={isLoading}
          />
          <button 
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className={`px-8 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
              isLoading 
              ? 'bg-white/5 text-white/20 cursor-not-allowed' 
              : 'bg-white text-black hover:bg-white/90 active:scale-95'
            }`}
          >
            {isLoading ? 'Calibrando...' : 'Sincronizar'}
          </button>
        </form>

        <div className="grid grid-cols-4 gap-4 text-[8px] uppercase tracking-[0.2em] text-white/30 font-bold bg-black/30 backdrop-blur-xl px-10 py-4 rounded-3xl border border-white/5">
          <div className="flex flex-col items-center">
            <span className="text-white/60 mb-1">Ótica</span>
            <span>{(config.envMapIntensity * 25).toFixed(0)}%</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white/60 mb-1">Exposição</span>
            <span>{(config.lightIntensity * 25).toFixed(0)}%</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white/60 mb-1">Contraste</span>
            <span>{(config.shadowOpacity * 100).toFixed(0)}%</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white/60 mb-1">Verniz</span>
            <span>{(config.clearcoat * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overlay;

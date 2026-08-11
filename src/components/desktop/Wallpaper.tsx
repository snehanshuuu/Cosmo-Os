import React from 'react';
import { useSettingsStore } from '../../stores/settingsStore';

export const Wallpaper: React.FC = () => {
  const { wallpaper } = useSettingsStore();

  const renderWallpaperStyle = () => {
    switch (wallpaper) {
      case 'quantum-matrix':
        return (
          <div className="absolute inset-0 bg-black overflow-hidden">
            {/* Unreal Engine 5 3D Rendered Quantum Data Matrix Wallpaper */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 scale-105 animate-[pulse_10s_ease-in-out_infinite]"
              style={{ backgroundImage: `url('/wallpapers/quantum_matrix.png')` }}
            />

            {/* Faint Ambient Glowing Neon Accents */}
            <div className="absolute top-10 left-1/4 w-96 h-96 bg-cosmos-lime/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-10 right-1/4 w-[32rem] h-[32rem] bg-cyan-500/15 rounded-full blur-[150px] pointer-events-none animate-[pulse_8s_ease-in-out_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />

            {/* Frosted Glass Geometric Grid Layer */}
            <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />
          </div>
        );

      case 'electric-grid':
        return (
          <div className="absolute inset-0 bg-cosmos-bg bg-cyber-grid">
            <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cosmos-lime/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute top-10 right-10 w-80 h-80 bg-lime-500/10 rounded-full blur-[100px] pointer-events-none" />
          </div>
        );

      case 'deep-space':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-[#050608] via-[#0d0f14] to-[#151922]">
            <div className="absolute top-1/3 left-1/4 w-[32rem] h-[32rem] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
          </div>
        );

      case 'nebula-flow':
        return (
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0f] via-[#14121e] to-[#0d161a]">
            <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-purple-500/10 rounded-full blur-[160px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-lime-400/10 rounded-full blur-[130px] pointer-events-none" />
          </div>
        );

      case 'obsidian-void':
        return <div className="absolute inset-0 bg-[#08090a]" />;

      default:
        if (wallpaper.startsWith('http') || wallpaper.startsWith('data:') || wallpaper.startsWith('/')) {
          return (
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
              style={{ backgroundImage: `url(${wallpaper})` }}
            />
          );
        }
        return <div className="absolute inset-0 bg-cosmos-bg bg-cyber-grid" />;
    }
  };

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {renderWallpaperStyle()}
      <div className="absolute inset-0 bg-black/15 backdrop-brightness-95 pointer-events-none" />
    </div>
  );
};

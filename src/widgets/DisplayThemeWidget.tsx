import React, { useState } from 'react';
import { useSettingsStore } from '../stores/settingsStore';
import { WallpaperPreset, AccentColor } from '../types';
import * as Icons from 'lucide-react';

export const DisplayThemeWidget: React.FC = () => {
  const { wallpaper, setWallpaper, accentColor, setAccentColor } = useSettingsStore();

  // Desktop Visual Effects toggles
  const [matrixRain, setMatrixRain] = useState(true);
  const [cyberGrid, setCyberGrid] = useState(true);
  const [glassBlur, setGlassBlur] = useState(true);

  const wallpaperPresets: { id: WallpaperPreset; label: string }[] = [
    { id: 'quantum-matrix', label: 'Quantum Matrix' },
    { id: 'electric-grid', label: 'Electric Grid' },
    { id: 'deep-space', label: 'Deep Space' },
    { id: 'nebula-flow', label: 'Nebula Flow' },
    { id: 'obsidian-void', label: 'Obsidian Void' },
  ];

  const accentColors: { id: AccentColor; hex: string; name: string }[] = [
    { id: 'electric-lime', hex: '#AAD622', name: 'Lime' },
    { id: 'cyber-cyan', hex: '#00F0FF', name: 'Cyan' },
    { id: 'neon-purple', hex: '#BF5AF2', name: 'Purple' },
    { id: 'solar-orange', hex: '#FF9F0A', name: 'Orange' },
  ];

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col gap-2.5 w-60 font-mono text-xs select-none"
    >
      {/* Header */}
      <div className="flex justify-between items-center text-[10px] text-cosmos-text-muted border-b border-white/10 pb-1">
        <div className="flex items-center gap-1.5 font-bold text-white uppercase tracking-wider">
          <Icons.Palette className="w-3.5 h-3.5 text-cosmos-lime-bright" />
          <span>DISPLAY & THEME CONTROL</span>
        </div>
        <span className="w-1.5 h-1.5 rounded-full bg-cosmos-lime shadow-lime-glow animate-pulse" />
      </div>

      {/* Desktop Visual Effects Toggles Grid */}
      <div className="flex flex-col gap-1.5 pt-0.5">
        <span className="text-[9px] text-cosmos-text-muted uppercase font-bold tracking-wider">
          VISUAL FX TOGGLES
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          {/* Matrix Rain Overlay */}
          <button
            onClick={() => setMatrixRain(!matrixRain)}
            className={`p-1.5 rounded flex items-center justify-between border transition-all ${
              matrixRain
                ? 'bg-cosmos-lime/20 border-cosmos-lime/50 text-cosmos-lime-bright'
                : 'bg-black/40 border-white/10 text-cosmos-text-muted'
            }`}
          >
            <span className="text-[10px] font-semibold">Matrix Rain</span>
            <span
              className={`w-2 h-2 rounded-full ${
                matrixRain ? 'bg-cosmos-lime shadow-[0_0_6px_#7CFF00]' : 'bg-white/20'
              }`}
            />
          </button>

          {/* Cyber Grid */}
          <button
            onClick={() => setCyberGrid(!cyberGrid)}
            className={`p-1.5 rounded flex items-center justify-between border transition-all ${
              cyberGrid
                ? 'bg-[#00F0FF]/20 border-[#00F0FF]/50 text-[#00F0FF]'
                : 'bg-black/40 border-white/10 text-cosmos-text-muted'
            }`}
          >
            <span className="text-[10px] font-semibold">Cyber Grid</span>
            <span
              className={`w-2 h-2 rounded-full ${
                cyberGrid ? 'bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]' : 'bg-white/20'
              }`}
            />
          </button>

          {/* Glass Blur */}
          <button
            onClick={() => setGlassBlur(!glassBlur)}
            className={`p-1.5 rounded flex items-center justify-between border transition-all ${
              glassBlur
                ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                : 'bg-black/40 border-white/10 text-cosmos-text-muted'
            }`}
          >
            <span className="text-[10px] font-semibold">Glass Blur</span>
            <span
              className={`w-2 h-2 rounded-full ${
                glassBlur ? 'bg-purple-400 shadow-[0_0_6px_#c084fc]' : 'bg-white/20'
              }`}
            />
          </button>

          {/* FX Status */}
          <div className="p-1.5 rounded bg-black/40 border border-white/10 flex items-center justify-between text-cosmos-text-muted">
            <span className="text-[10px]">Engine Status</span>
            <span className="text-[9px] font-bold text-cosmos-lime-bright">ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Wallpaper Engine Presets */}
      <div className="flex flex-col gap-1.5 pt-1 border-t border-white/10">
        <span className="text-[9px] text-cosmos-text-muted uppercase font-bold tracking-wider">
          WALLPAPER ENGINE PRESETS
        </span>
        <div className="flex flex-wrap gap-1">
          {wallpaperPresets.map((preset) => {
            const isSelected = wallpaper === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => setWallpaper(preset.id)}
                className={`px-2 py-1 rounded text-[10px] font-semibold transition-all border ${
                  isSelected
                    ? 'bg-cosmos-lime/20 border-cosmos-lime text-cosmos-lime-bright shadow-[0_0_8px_rgba(124,255,0,0.2)]'
                    : 'bg-black/40 border-white/10 text-cosmos-text-secondary hover:border-white/20 hover:text-white'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Accent Color Scheme Selector */}
      <div className="flex flex-col gap-1.5 pt-1 border-t border-white/10">
        <span className="text-[9px] text-cosmos-text-muted uppercase font-bold tracking-wider">
          COLOR SCHEME ACCENTS
        </span>
        <div className="flex items-center justify-between gap-1.5 bg-black/40 p-1.5 rounded border border-white/10">
          {accentColors.map((color) => {
            const isSelected = accentColor === color.id;
            return (
              <button
                key={color.id}
                onClick={() => setAccentColor(color.id)}
                className={`flex-1 py-1 rounded flex items-center justify-center gap-1 border transition-all ${
                  isSelected
                    ? 'border-white bg-white/10 text-white font-bold'
                    : 'border-transparent text-cosmos-text-muted hover:text-white'
                }`}
              >
                <span
                  style={{ backgroundColor: color.hex }}
                  className="w-2.5 h-2.5 rounded-full shadow-sm"
                />
                <span className="text-[9px]">{color.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

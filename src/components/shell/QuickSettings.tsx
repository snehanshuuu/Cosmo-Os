import React, { useState } from 'react';
import { GlassPanel } from '../primitives/GlassPanel';
import { useSettingsStore } from '../../stores/settingsStore';
import * as Icons from 'lucide-react';

interface QuickSettingsProps {
  onClose: () => void;
}

export const QuickSettings: React.FC<QuickSettingsProps> = ({ onClose }) => {
  const { reducedMotion, toggleReducedMotion } = useSettingsStore();
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [dnd, setDnd] = useState(false);

  return (
    <GlassPanel
      variant="modal"
      className="absolute top-10 right-4 z-50 p-4 w-80 flex flex-col gap-4 shadow-glass"
    >
      <div className="flex justify-between items-center border-b border-white/10 pb-2">
        <span className="font-mono text-xs font-bold text-white uppercase">Control Center</span>
        <button onClick={onClose} className="text-cosmos-text-muted hover:text-white">
          <Icons.X className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Toggles Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={() => setWifi(!wifi)}
          className={`p-3 rounded-lg flex items-center gap-3 border transition-all ${
            wifi
              ? 'bg-cosmos-lime/20 border-cosmos-lime/50 text-cosmos-lime-bright'
              : 'bg-white/5 border-white/10 text-cosmos-text-muted'
          }`}
        >
          <Icons.Wifi className="w-4 h-4" />
          <span className="font-mono text-xs font-semibold">Wi-Fi</span>
        </button>

        <button
          onClick={() => setBluetooth(!bluetooth)}
          className={`p-3 rounded-lg flex items-center gap-3 border transition-all ${
            bluetooth
              ? 'bg-cosmos-lime/20 border-cosmos-lime/50 text-cosmos-lime-bright'
              : 'bg-white/5 border-white/10 text-cosmos-text-muted'
          }`}
        >
          <Icons.Bluetooth className="w-4 h-4" />
          <span className="font-mono text-xs font-semibold">Bluetooth</span>
        </button>

        <button
          onClick={() => setDnd(!dnd)}
          className={`p-3 rounded-lg flex items-center gap-3 border transition-all ${
            dnd
              ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
              : 'bg-white/5 border-white/10 text-cosmos-text-muted'
          }`}
        >
          <Icons.Moon className="w-4 h-4" />
          <span className="font-mono text-xs font-semibold">Do Not Disturb</span>
        </button>

        <button
          onClick={toggleReducedMotion}
          className={`p-3 rounded-lg flex items-center gap-3 border transition-all ${
            reducedMotion
              ? 'bg-cosmos-lime/20 border-cosmos-lime/50 text-cosmos-lime-bright'
              : 'bg-white/5 border-white/10 text-cosmos-text-muted'
          }`}
        >
          <Icons.Zap className="w-4 h-4" />
          <span className="font-mono text-xs font-semibold">Accessibility</span>
        </button>
      </div>

      {/* Sliders */}
      <div className="flex flex-col gap-3 pt-2 border-t border-white/10">
        <div className="flex items-center gap-3">
          <Icons.Sun className="w-4 h-4 text-cosmos-text-muted" />
          <input
            type="range"
            defaultValue={85}
            className="w-full accent-cosmos-lime cursor-pointer"
          />
        </div>
        <div className="flex items-center gap-3">
          <Icons.Volume2 className="w-4 h-4 text-cosmos-text-muted" />
          <input
            type="range"
            defaultValue={60}
            className="w-full accent-cosmos-lime cursor-pointer"
          />
        </div>
      </div>
    </GlassPanel>
  );
};

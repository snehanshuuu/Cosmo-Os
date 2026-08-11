import React, { useState } from 'react';
import * as Icons from 'lucide-react';

export const QuickActionsWidget: React.FC = () => {
  const [wifi, setWifi] = useState(true);
  const [bt, setBt] = useState(true);

  const wifiSSID = 'Cosmos_5G';
  const btDevice = 'Cosmos Pods';

  return (
    <div className="flex flex-col gap-2 w-48 font-mono text-xs select-none">
      <div className="flex justify-between items-center text-[10px] text-cosmos-text-muted border-b border-white/10 pb-1">
        <span className="uppercase tracking-wider font-bold text-white">QUICK ACTIONS</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {/* Wi-Fi Toggle Tile */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setWifi(!wifi);
          }}
          className={`p-2.5 rounded-lg flex flex-col items-center justify-center gap-1 border transition-all duration-200 ${
            wifi
              ? 'bg-cosmos-lime/20 border-cosmos-lime/60 text-cosmos-lime-bright shadow-lime-glow ring-1 ring-cosmos-lime/40'
              : 'bg-black/40 border-white/10 text-cosmos-text-muted opacity-60 hover:opacity-80'
          }`}
          title={wifi ? `Connected to ${wifiSSID}` : 'Wi-Fi Disabled'}
        >
          <Icons.Wifi className={`w-4 h-4 ${wifi ? 'text-cosmos-lime-bright animate-pulse' : 'text-cosmos-text-muted'}`} />
          <span className="text-[11px] font-bold tracking-tight truncate w-full text-center">
            {wifi ? wifiSSID : 'Wi-Fi'}
          </span>
          <span className="text-[9px] text-cosmos-text-muted uppercase">
            {wifi ? 'Connected' : 'Off'}
          </span>
        </button>

        {/* Bluetooth Toggle Tile */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setBt(!bt);
          }}
          className={`p-2.5 rounded-lg flex flex-col items-center justify-center gap-1 border transition-all duration-200 ${
            bt
              ? 'bg-cyan-500/20 border-cyan-400/60 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.3)] ring-1 ring-cyan-400/40'
              : 'bg-black/40 border-white/10 text-cosmos-text-muted opacity-60 hover:opacity-80'
          }`}
          title={bt ? `Connected to ${btDevice}` : 'Bluetooth Disabled'}
        >
          <Icons.Bluetooth className={`w-4 h-4 ${bt ? 'text-cyan-400' : 'text-cosmos-text-muted'}`} />
          <span className="text-[11px] font-bold tracking-tight truncate w-full text-center">
            {bt ? btDevice : 'Bluetooth'}
          </span>
          <span className="text-[9px] text-cosmos-text-muted uppercase">
            {bt ? 'Connected' : 'Off'}
          </span>
        </button>
      </div>
    </div>
  );
};

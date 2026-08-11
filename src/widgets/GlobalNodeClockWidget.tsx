import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';

export const GlobalNodeClockWidget: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [is24h, setIs24h] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatZoneTime = (timeZone: string) => {
    try {
      return time.toLocaleTimeString([], {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: !is24h,
      });
    } catch (e) {
      return '12:00';
    }
  };

  const localTimeStr = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: !is24h,
  });

  const utcTime = formatZoneTime('UTC');
  const jstTime = formatZoneTime('Asia/Tokyo');
  const estTime = formatZoneTime('America/New_York');

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col gap-2 w-64 p-1 font-mono text-xs select-none"
    >
      {/* Header */}
      <div className="flex justify-between items-center text-[10px] text-cosmos-text-muted border-b border-white/10 pb-1.5">
        <div className="flex items-center gap-1.5 font-bold text-white uppercase tracking-wider">
          <Icons.Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span>GLOBAL NODE CLOCK</span>
        </div>
        <button
          onClick={() => setIs24h(!is24h)}
          className="px-2 py-0.5 rounded bg-white/10 text-cosmos-lime-bright font-bold text-[10px] hover:bg-cosmos-lime hover:text-black transition-colors"
        >
          {is24h ? '24H' : '12H'}
        </button>
      </div>

      {/* Main Digital Clock Readout */}
      <div className="text-3xl font-extrabold font-display text-white tracking-tight text-center py-1 drop-shadow-[0_0_12px_rgba(0,240,255,0.3)]">
        {localTimeStr}
      </div>

      {/* Minimalist World Grid Map Vector with Blinking Pulse Dots over Tech Hubs */}
      <div className="relative h-20 w-full bg-black/60 rounded-lg border border-white/10 p-2 overflow-hidden flex items-center justify-center bg-cyber-grid">
        {/* World Grid Silhouette Vector SVG */}
        <svg
          viewBox="0 0 200 100"
          className="w-full h-full opacity-25 stroke-cyan-400 fill-none"
          strokeWidth="0.8"
        >
          {/* Simple Vector Landmass Grids */}
          <path d="M 20,30 Q 30,20 45,35 T 60,50 T 40,75 Z" />
          <path d="M 85,25 Q 105,15 120,30 T 110,65 T 90,50 Z" />
          <path d="M 140,25 Q 165,20 180,35 T 175,60 Z" />
          <path d="M 150,70 Q 165,65 175,75 T 160,85 Z" />
        </svg>

        {/* Pulse Dot 1: London (UTC) */}
        <div
          className="absolute top-6 left-[48%] -translate-x-1/2 flex items-center gap-1 group cursor-pointer"
          title={`London (UTC): ${utcTime}`}
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00F0FF] animate-ping" />
          <span className="absolute w-2 h-2 rounded-full bg-cyan-400" />
          <span className="text-[8px] font-mono font-bold text-cyan-300 ml-3 bg-black/70 px-1 rounded border border-cyan-400/30">
            LON
          </span>
        </div>

        {/* Pulse Dot 2: Tokyo (JST) */}
        <div
          className="absolute top-7 left-[82%] -translate-x-1/2 flex items-center gap-1 group cursor-pointer"
          title={`Tokyo (JST): ${jstTime}`}
        >
          <span className="w-2 h-2 rounded-full bg-cosmos-lime shadow-lime-glow animate-ping" />
          <span className="absolute w-2 h-2 rounded-full bg-cosmos-lime" />
          <span className="text-[8px] font-mono font-bold text-cosmos-lime-bright ml-3 bg-black/70 px-1 rounded border border-cosmos-lime/30">
            TYO
          </span>
        </div>

        {/* Pulse Dot 3: Cyber City / NY (EST) */}
        <div
          className="absolute top-9 left-[26%] -translate-x-1/2 flex items-center gap-1 group cursor-pointer"
          title={`Cyber City (EST): ${estTime}`}
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#FFC107] animate-ping" />
          <span className="absolute w-2 h-2 rounded-full bg-amber-400" />
          <span className="text-[8px] font-mono font-bold text-amber-300 ml-3 bg-black/70 px-1 rounded border border-amber-400/30">
            EST
          </span>
        </div>
      </div>

      {/* 3 World Time Zones in Monospaced Font */}
      <div className="grid grid-cols-3 gap-1.5 text-center border-t border-white/10 pt-2">
        <div className="p-1.5 rounded bg-black/40 border border-white/5 flex flex-col">
          <span className="text-[9px] text-cosmos-text-muted font-bold uppercase">UTC / LON</span>
          <span className="text-xs font-mono font-bold text-cyan-300 mt-0.5">{utcTime}</span>
        </div>
        <div className="p-1.5 rounded bg-black/40 border border-white/5 flex flex-col">
          <span className="text-[9px] text-cosmos-text-muted font-bold uppercase">JST / TYO</span>
          <span className="text-xs font-mono font-bold text-cosmos-lime-bright mt-0.5">{jstTime}</span>
        </div>
        <div className="p-1.5 rounded bg-black/40 border border-white/5 flex flex-col">
          <span className="text-[9px] text-cosmos-text-muted font-bold uppercase">EST / CYBER</span>
          <span className="text-xs font-mono font-bold text-amber-300 mt-0.5">{estTime}</span>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';

export const SystemStatsWidget: React.FC = () => {
  const [stats, setStats] = useState({
    cpu: 24,
    ram: 68,
    storage: 45,
  });

  // History buffer for CPU/GPU load over last 10 seconds (10 data points)
  const [history, setHistory] = useState<number[]>([25, 30, 22, 45, 38, 50, 42, 60, 35, 24]);

  // Update CPU & RAM values every 1 second and record into 10-second history stream
  useEffect(() => {
    const interval = setInterval(() => {
      const newCpu = Math.floor(15 + Math.random() * 75);
      const newRam = Math.floor(55 + Math.random() * 32);

      setStats({
        cpu: newCpu,
        ram: newRam,
        storage: 45,
      });

      setHistory((prev) => [...prev.slice(-9), newCpu]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (val: number) => {
    if (val < 60) {
      return {
        text: 'text-[#7CFF00]',
        bg: 'bg-[#7CFF00]',
        shadow: 'shadow-[0_0_8px_#7CFF00]',
        hex: '#7CFF00',
      };
    } else if (val <= 85) {
      return {
        text: 'text-[#FFC107]',
        bg: 'bg-[#FFC107]',
        shadow: 'shadow-[0_0_8px_#FFC107]',
        hex: '#FFC107',
      };
    } else {
      return {
        text: 'text-[#FF5252]',
        bg: 'bg-[#FF5252]',
        shadow: 'shadow-[0_0_8px_#FF5252]',
        hex: '#FF5252',
      };
    }
  };

  const cpuColor = getStatusColor(stats.cpu);
  const ramColor = getStatusColor(stats.ram);
  const storageColor = getStatusColor(stats.storage);

  // SVG Chart Geometry Specs
  const svgWidth = 180;
  const svgHeight = 36;
  const numPoints = history.length;
  const points = history.map((val, idx) => {
    const x = (idx / (numPoints - 1)) * svgWidth;
    // Map value (0-100) to y coordinate (padded 4px from top & bottom)
    const y = svgHeight - (val / 100) * (svgHeight - 8) - 4;
    return { x, y };
  });

  const pathLine = points.reduce(
    (acc, p, idx) => `${acc} ${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)},${p.y.toFixed(1)}`,
    ''
  );
  const pathArea = `${pathLine} L ${svgWidth},${svgHeight} L 0,${svgHeight} Z`;

  return (
    <div className="flex flex-col gap-2.5 w-48 font-mono text-xs select-none">
      <div className="flex justify-between items-center text-[10px] text-cosmos-text-muted border-b border-white/10 pb-1">
        <span className="uppercase tracking-wider font-bold text-white">SYSTEM DIAGNOSTICS</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#7CFF00] shadow-[0_0_6px_#7CFF00] animate-pulse" />
      </div>

      {/* SVG Real-Time CPU/GPU Load History Chart (10s window) */}
      <div className="flex flex-col gap-1 bg-black/60 border border-white/10 rounded-lg p-2 relative overflow-hidden">
        <div className="flex justify-between text-[9px] font-mono text-cosmos-text-muted">
          <span className="uppercase font-bold text-white">CPU HISTORY (10S)</span>
          <span className={`font-bold ${cpuColor.text}`}>{stats.cpu}%</span>
        </div>

        <div className="h-10 w-full relative flex items-center justify-center">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="cpuLoadGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7CFF00" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#7CFF00" stopOpacity="0.0" />
              </linearGradient>
              <filter id="neonGlowLine" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#7CFF00" floodOpacity="0.8" />
              </filter>
            </defs>

            {/* Translucent Gradient Fill Underneath */}
            <path d={pathArea} fill="url(#cpuLoadGradient)" />

            {/* Bright Green Glow Line Stroke */}
            <path
              d={pathLine}
              fill="none"
              stroke="#7CFF00"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#neonGlowLine)"
              className="transition-all duration-300"
            />
          </svg>
        </div>
      </div>

      {/* Numerical Gauges */}
      <div className="flex flex-col gap-2 pt-0.5">
        {/* CPU Gauge */}
        <div>
          <div className="flex justify-between text-[10px] text-cosmos-text-secondary mb-1">
            <span>CPU LOAD</span>
            <span className={`font-bold transition-colors duration-300 ${cpuColor.text}`}>
              {stats.cpu}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-black/50 border border-white/10 rounded-full overflow-hidden">
            <div
              style={{ width: `${stats.cpu}%` }}
              className={`h-full ${cpuColor.bg} ${cpuColor.shadow} rounded-full transition-all duration-500 ease-out`}
            />
          </div>
        </div>

        {/* RAM Gauge */}
        <div>
          <div className="flex justify-between text-[10px] text-cosmos-text-secondary mb-1">
            <span>RAM USAGE</span>
            <span className={`font-bold transition-colors duration-300 ${ramColor.text}`}>
              {stats.ram}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-black/50 border border-white/10 rounded-full overflow-hidden">
            <div
              style={{ width: `${stats.ram}%` }}
              className={`h-full ${ramColor.bg} ${ramColor.shadow} rounded-full transition-all duration-500 ease-out`}
            />
          </div>
        </div>

        {/* Storage Gauge */}
        <div>
          <div className="flex justify-between text-[10px] text-cosmos-text-secondary mb-1">
            <span>STORAGE</span>
            <span className={`font-bold transition-colors duration-300 ${storageColor.text}`}>
              {stats.storage}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-black/50 border border-white/10 rounded-full overflow-hidden">
            <div
              style={{ width: `${stats.storage}%` }}
              className={`h-full ${storageColor.bg} ${storageColor.shadow} rounded-full transition-all duration-500 ease-out`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';

export const NetworkTelemetryWidget: React.FC = () => {
  const [downloadSpeed, setDownloadSpeed] = useState(142.4);
  const [uploadSpeed, setUploadSpeed] = useState(38.1);
  const [ping, setPing] = useState(12);

  // 10-second rolling bandwidth history buffers (10 points each)
  const [downHistory, setDownHistory] = useState<number[]>([120, 135, 142, 110, 155, 148, 138, 160, 145, 142.4]);
  const [upHistory, setUpHistory] = useState<number[]>([30, 35, 42, 28, 45, 38, 40, 50, 36, 38.1]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newDown = parseFloat((100 + Math.random() * 80).toFixed(1)); // 100 - 180 Mbps
      const newUp = parseFloat((25 + Math.random() * 30).toFixed(1));   // 25 - 55 Mbps
      const newPing = Math.floor(10 + Math.random() * 5);              // 10 - 14 ms

      setDownloadSpeed(newDown);
      setUploadSpeed(newUp);
      setPing(newPing);

      setDownHistory((prev) => [...prev.slice(-9), newDown]);
      setUpHistory((prev) => [...prev.slice(-9), newUp]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // SVG Sparkline geometry calculation
  const width = 200;
  const height = 40;

  const calculatePath = (data: number[], maxVal: number) => {
    const numPoints = data.length;
    const points = data.map((val, idx) => {
      const x = (idx / (numPoints - 1)) * width;
      const y = height - (val / maxVal) * (height - 8) - 4;
      return { x, y };
    });

    return points.reduce(
      (acc, p, idx) => `${acc} ${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)},${p.y.toFixed(1)}`,
      ''
    );
  };

  const downPath = calculatePath(downHistory, 200);
  const upPath = calculatePath(upHistory, 100);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col gap-2 w-56 font-mono text-xs select-none"
    >
      {/* Header */}
      <div className="flex justify-between items-center text-[10px] text-cosmos-text-muted border-b border-white/10 pb-1">
        <div className="flex items-center gap-1.5 font-bold text-white uppercase tracking-wider">
          <Icons.Wifi className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span>NETWORK TELEMETRY</span>
        </div>
        <div className="flex items-center gap-1 text-[9px] text-cosmos-lime-bright">
          <span className="w-1.5 h-1.5 rounded-full bg-cosmos-lime shadow-lime-glow animate-pulse" />
          <span>PING: {ping}ms</span>
        </div>
      </div>

      {/* Live Speed Metrics */}
      <div className="grid grid-cols-2 gap-2 pt-0.5">
        {/* Download Speed Tile */}
        <div className="p-2 rounded bg-black/50 border border-[#00E5FF]/30 flex flex-col gap-0.5 shadow-[0_0_10px_rgba(0,229,255,0.15)]">
          <span className="text-[9px] text-cosmos-text-muted font-bold uppercase tracking-wide">
            DOWNLOAD
          </span>
          <span className="text-sm font-bold text-[#00E5FF] tracking-tight">
            ▼ {downloadSpeed} <span className="text-[9px] font-normal text-white/70">Mbps</span>
          </span>
        </div>

        {/* Upload Speed Tile */}
        <div className="p-2 rounded bg-black/50 border border-[#7CFF00]/30 flex flex-col gap-0.5 shadow-[0_0_10px_rgba(124,255,0,0.15)]">
          <span className="text-[9px] text-cosmos-text-muted font-bold uppercase tracking-wide">
            UPLOAD
          </span>
          <span className="text-sm font-bold text-[#7CFF00] tracking-tight">
            ▲ {uploadSpeed} <span className="text-[9px] font-normal text-white/70">Mbps</span>
          </span>
        </div>
      </div>

      {/* Mini Dynamic Sparkline SVG Graph */}
      <div className="h-11 w-full bg-black/60 border border-white/10 rounded-lg p-1 relative overflow-hidden flex items-center justify-center">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="downCyanGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#00E5FF" floodOpacity="0.8" />
            </filter>
            <filter id="upGreenGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#7CFF00" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* Download Bandwidth Sparkline Path (Neon Cyan #00E5FF) */}
          <path
            d={downPath}
            fill="none"
            stroke="#00E5FF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#downCyanGlow)"
            className="transition-all duration-300"
          />

          {/* Upload Bandwidth Sparkline Path (Neon Green #7CFF00) */}
          <path
            d={upPath}
            fill="none"
            stroke="#7CFF00"
            strokeWidth="1.5"
            strokeDasharray="3 2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#upGreenGlow)"
            className="transition-all duration-300"
          />
        </svg>
      </div>
    </div>
  );
};

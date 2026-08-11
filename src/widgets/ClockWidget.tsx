import React, { useState, useEffect } from 'react';

export const ClockWidget: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [is24h, setIs24h] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: !is24h,
  });

  const dayName = time.toLocaleDateString([], { weekday: 'long' });
  const fullDate = time.toLocaleDateString([], {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col gap-2.5 w-64 p-1 font-mono">
      {/* Top Header & Toggle */}
      <div className="flex justify-between items-center text-[10px] text-cosmos-text-muted border-b border-white/10 pb-1.5">
        <span className="uppercase tracking-widest font-bold text-white">DIGITAL CLOCK</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIs24h(!is24h);
          }}
          className="px-2 py-0.5 rounded bg-white/10 text-cosmos-lime-bright font-bold text-[10px] hover:bg-cosmos-lime hover:text-black transition-colors"
        >
          {is24h ? '24H' : '12H'}
        </button>
      </div>

      {/* Prominent Large Digital Time Readout */}
      <div className="text-4xl font-extrabold font-display text-white tracking-tight text-center py-1 drop-shadow-[0_0_12px_rgba(170,214,34,0.3)]">
        {timeStr}
      </div>

      {/* Date & Day Information Below Time */}
      <div className="flex flex-col items-center border-t border-white/10 pt-2 gap-0.5">
        <span className="text-sm font-bold text-white uppercase tracking-wider">
          {dayName}
        </span>
        <span className="text-xs font-mono text-cosmos-lime-bright font-semibold">
          {fullDate}
        </span>
      </div>
    </div>
  );
};

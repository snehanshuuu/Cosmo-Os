import React from 'react';
import { useWindowStore } from '../stores/windowStore';

export const CalendarWidget: React.FC = () => {
  const { openApp } = useWindowStore();
  const now = new Date();
  const currentDay = now.getDate();
  const days = Array.from({ length: 28 }, (_, i) => i + 1);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openApp('calendar', 'Calendar', 'Calendar');
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col gap-2 w-48 font-mono text-xs cursor-pointer group"
      title="Click to open Calendar Application"
    >
      <div className="flex justify-between items-center text-[10px] text-cosmos-text-muted border-b border-white/10 pb-1">
        <span className="uppercase tracking-wider font-bold text-white group-hover:text-cosmos-lime-bright transition-colors">
          {now.toLocaleString('default', { month: 'short', year: 'numeric' })}
        </span>
        <span className="text-[9px] text-cosmos-lime-bright bg-cosmos-lime/10 px-1 rounded">OPEN</span>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[9px] text-cosmos-text-muted">
        <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[10px]">
        {days.map((day) => (
          <span
            key={day}
            className={`h-5 rounded flex items-center justify-center transition-all ${
              day === currentDay ? 'bg-cosmos-lime text-black font-bold shadow-lime-glow scale-105' : 'text-white hover:bg-white/10'
            }`}
          >
            {day}
          </span>
        ))}
      </div>
    </div>
  );
};

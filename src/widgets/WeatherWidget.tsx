import React from 'react';
import * as Icons from 'lucide-react';

export const WeatherWidget: React.FC = () => {
  return (
    <div className="flex flex-col gap-1 w-44 font-mono text-xs">
      <div className="flex justify-between items-center text-[10px] text-cosmos-text-muted border-b border-white/10 pb-1">
        <span className="uppercase tracking-wider">WEATHER</span>
        <span className="text-cosmos-lime-bright">CYBER CITY</span>
      </div>
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-2">
          <Icons.Sun className="w-6 h-6 text-amber-400" />
          <span className="text-2xl font-bold font-display text-white">72°F</span>
        </div>
      </div>
      <div className="text-[11px] text-cosmos-text-secondary mt-1">Clear Cyber Sky • H:76° L:62°</div>
    </div>
  );
};

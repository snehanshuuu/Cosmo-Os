import React from 'react';

export const SystemStatsWidget: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 w-44 font-mono text-xs">
      <div className="flex justify-between items-center text-[10px] text-cosmos-text-muted border-b border-white/10 pb-1">
        <span className="uppercase tracking-wider">SYSTEM DIAGNOSTICS</span>
      </div>

      <div className="flex flex-col gap-1.5">
        <div>
          <div className="flex justify-between text-[10px] text-cosmos-text-secondary mb-0.5">
            <span>CPU</span>
            <span className="text-cosmos-lime-bright font-bold">18%</span>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-[18%] bg-cosmos-lime shadow-lime-glow rounded-full" />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[10px] text-cosmos-text-secondary mb-0.5">
            <span>RAM</span>
            <span className="text-cosmos-lime-bright font-bold">42%</span>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-[42%] bg-cosmos-lime shadow-lime-glow rounded-full" />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[10px] text-cosmos-text-secondary mb-0.5">
            <span>STORAGE</span>
            <span className="text-cosmos-lime-bright font-bold">28%</span>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-[28%] bg-cosmos-lime shadow-lime-glow rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

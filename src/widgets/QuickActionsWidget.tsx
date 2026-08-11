import React, { useState } from 'react';
import * as Icons from 'lucide-react';

export const QuickActionsWidget: React.FC = () => {
  const [wifi, setWifi] = useState(true);
  const [bt, setBt] = useState(true);

  return (
    <div className="flex flex-col gap-2 w-44 font-mono text-xs">
      <div className="flex justify-between items-center text-[10px] text-cosmos-text-muted border-b border-white/10 pb-1">
        <span className="uppercase tracking-wider">QUICK ACTIONS</span>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setWifi(!wifi);
          }}
          className={`p-2 rounded flex flex-col items-center gap-1 border transition-all ${
            wifi ? 'bg-cosmos-lime/20 border-cosmos-lime/40 text-cosmos-lime-bright' : 'bg-white/5 border-white/10 text-cosmos-text-muted'
          }`}
        >
          <Icons.Wifi className="w-4 h-4" />
          <span className="text-[10px]">Wi-Fi</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setBt(!bt);
          }}
          className={`p-2 rounded flex flex-col items-center gap-1 border transition-all ${
            bt ? 'bg-cosmos-lime/20 border-cosmos-lime/40 text-cosmos-lime-bright' : 'bg-white/5 border-white/10 text-cosmos-text-muted'
          }`}
        >
          <Icons.Bluetooth className="w-4 h-4" />
          <span className="text-[10px]">BT</span>
        </button>
      </div>
    </div>
  );
};

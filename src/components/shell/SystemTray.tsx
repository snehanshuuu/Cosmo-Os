import React from 'react';
import * as Icons from 'lucide-react';

interface SystemTrayProps {
  onToggleCalendar: () => void;
  onToggleQuickSettings: () => void;
  onOpenSearch: () => void;
}

export const SystemTray: React.FC<SystemTrayProps> = ({
  onToggleCalendar,
  onToggleQuickSettings,
  onOpenSearch,
}) => {
  return (
    <div className="flex items-center gap-3 font-mono text-xs text-cosmos-text-primary select-none">
      {/* Global Search Shortcut Button with Spaced Styling */}
      <button
        onClick={onOpenSearch}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 hover:bg-white/15 text-cosmos-text-secondary hover:text-white transition-colors"
        title="Search (Cmd + K)"
      >
        <Icons.Search className="w-3.5 h-3.5 text-cosmos-lime-bright" />
        <span className="text-[10px] font-mono tracking-wide">Cmd + K</span>
      </button>

      {/* Quick Status Icon Group: Network & Battery */}
      <div className="flex items-center gap-2 px-2 py-0.5 rounded-md bg-black/40 border border-white/5">
        <div className="flex items-center gap-1 text-cosmos-lime-bright" title="Network Connected">
          <Icons.Wifi className="w-3.5 h-3.5" />
        </div>
        <div className="h-3 w-px bg-white/10" />
        <div className="flex items-center gap-1 text-cosmos-text-primary" title="Battery 98%">
          <Icons.Battery className="w-3.5 h-3.5 text-cosmos-lime" />
          <span className="text-[10px]">98%</span>
        </div>
      </div>

      {/* Quick Settings Toggle Button */}
      <button
        onClick={onToggleQuickSettings}
        className="p-1.5 rounded-md bg-white/5 border border-white/10 hover:bg-white/15 text-cosmos-text-secondary hover:text-white transition-colors"
        title="Quick Control Center"
      >
        <Icons.SlidersHorizontal className="w-3.5 h-3.5" />
      </button>

      {/* Dark Translucent Glass Admin Profile Badge with Subtle Green Border */}
      <button
        onClick={onToggleCalendar}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-cosmos-lime/40 text-cosmos-lime-bright hover:border-cosmos-lime hover:bg-cosmos-lime/15 transition-all shadow-sm group"
        title="User Profile & Calendar (Click to toggle)"
      >
        <div className="w-4 h-4 rounded-full bg-cosmos-lime/20 border border-cosmos-lime/60 text-cosmos-lime-bright flex items-center justify-center font-bold text-[9px] shadow-sm">
          <Icons.User className="w-2.5 h-2.5 stroke-[2.5]" />
        </div>
        <span className="text-[10px] font-mono font-bold tracking-tight">Admin</span>
      </button>
    </div>
  );
};

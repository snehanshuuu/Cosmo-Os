import React, { useState, useEffect } from 'react';
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
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3 font-mono text-xs text-cosmos-text-primary">
      {/* Global Search Button */}
      <button
        onClick={onOpenSearch}
        className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/10 hover:bg-white/15 text-cosmos-text-secondary hover:text-white transition-colors"
        title="Search (Cmd+K)"
      >
        <Icons.Search className="w-3.5 h-3.5 text-cosmos-lime-bright" />
        <span className="text-[10px]">Cmd+K</span>
      </button>

      {/* Network Indicator */}
      <div className="flex items-center gap-1 text-cosmos-lime-bright" title="Network Connected">
        <Icons.Wifi className="w-3.5 h-3.5" />
      </div>

      {/* Battery Indicator */}
      <div className="flex items-center gap-1 text-cosmos-text-primary" title="Battery 98%">
        <Icons.Battery className="w-4 h-4 text-cosmos-lime" />
        <span className="text-[11px]">98%</span>
      </div>

      {/* Quick Settings Toggle Button */}
      <button
        onClick={onToggleQuickSettings}
        className="p-1 rounded hover:bg-white/10 text-cosmos-text-secondary hover:text-white"
        title="Quick Control Center"
      >
        <Icons.SlidersHorizontal className="w-3.5 h-3.5" />
      </button>

      {/* Clock Widget Button */}
      <button
        onClick={onToggleCalendar}
        className="px-2 py-1 rounded hover:bg-white/10 font-bold text-white tracking-tight"
        title="Open Calendar"
      >
        {timeStr || '12:00 PM'}
      </button>
    </div>
  );
};

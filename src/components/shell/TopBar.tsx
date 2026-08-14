import React from 'react';
import { SystemTray } from './SystemTray';
import * as Icons from 'lucide-react';
import { useWindowStore } from '../../stores/windowStore';

interface TopBarProps {
  onToggleCalendar: () => void;
  onToggleQuickSettings: () => void;
  onOpenSearch: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onToggleCalendar,
  onToggleQuickSettings,
  onOpenSearch,
}) => {
  const { windows, activeWindowId } = useWindowStore();
  const activeWindow = windows.find((w) => w.id === activeWindowId);

  return (
    <div className="fixed top-0 left-0 right-0 h-8 z-40 bg-cosmos-surface/80 backdrop-blur-glass border-b border-white/10 px-4 flex items-center justify-between text-xs font-mono select-none">
      {/* Brand logo & Active App Menu */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 font-display font-extrabold text-white cursor-pointer hover:opacity-90 transition-opacity">
          <img
            src="/logo.png"
            alt="COSMOS OS Logo"
            className="w-5 h-5 rounded-full object-cover border border-cosmos-lime/80 shadow-[0_0_12px_rgba(124,255,0,0.6)]"
          />
          <span className="tracking-wider text-xs font-bold text-white">COSMOS OS</span>
        </div>

        {activeWindow && (
          <div className="flex items-center gap-1.5 text-cosmos-lime-bright border-l border-white/10 pl-3">
            <Icons.AppWindow className="w-3.5 h-3.5" />
            <span className="font-semibold">{activeWindow.title}</span>
          </div>
        )}
      </div>

      {/* System Tray Right Side */}
      <SystemTray
        onToggleCalendar={onToggleCalendar}
        onToggleQuickSettings={onToggleQuickSettings}
        onOpenSearch={onOpenSearch}
      />
    </div>
  );
};

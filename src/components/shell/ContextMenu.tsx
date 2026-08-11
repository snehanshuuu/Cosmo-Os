import React from 'react';
import { GlassPanel } from '../primitives/GlassPanel';
import { useWindowStore } from '../../stores/windowStore';
import { useWidgetStore } from '../../stores/widgetStore';
import * as Icons from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose }) => {
  const { openApp } = useWindowStore();
  const { resetDefaultWidgets } = useWidgetStore();

  const handleOpenSettings = () => {
    openApp('settings', 'System Settings', 'Sliders');
    onClose();
  };

  const handleOpenTerminal = () => {
    openApp('terminal', 'Cosmos Terminal', 'Terminal');
    onClose();
  };

  const handleResetWidgets = () => {
    resetDefaultWidgets();
    onClose();
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{ top: y, left: x }}
      className="fixed z-50 pointer-events-auto"
    >
      <GlassPanel
        variant="modal"
        className="w-52 p-1.5 flex flex-col gap-0.5 border border-white/20 shadow-2xl backdrop-blur-heavy text-xs font-mono"
      >
        <button
          onClick={handleOpenSettings}
          className="flex items-center gap-2 px-3 py-2 rounded text-cosmos-text-primary hover:bg-cosmos-lime/20 hover:text-cosmos-lime-bright transition-colors text-left"
        >
          <Icons.Image className="w-3.5 h-3.5 text-cosmos-lime" />
          <span>Change Wallpaper</span>
        </button>

        <button
          onClick={handleOpenTerminal}
          className="flex items-center gap-2 px-3 py-2 rounded text-cosmos-text-primary hover:bg-cosmos-lime/20 hover:text-cosmos-lime-bright transition-colors text-left"
        >
          <Icons.Terminal className="w-3.5 h-3.5" />
          <span>Open Terminal</span>
        </button>

        <button
          onClick={handleResetWidgets}
          className="flex items-center gap-2 px-3 py-2 rounded text-cosmos-text-primary hover:bg-cosmos-lime/20 hover:text-cosmos-lime-bright transition-colors text-left"
        >
          <Icons.Layout className="w-3.5 h-3.5 text-cyan-400" />
          <span>Reset All Widgets</span>
        </button>

        <div className="h-px bg-white/10 my-1" />

        <button
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-2 rounded text-cosmos-text-primary hover:bg-white/10 transition-colors text-left"
        >
          <Icons.RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Desktop</span>
        </button>
      </GlassPanel>
    </div>
  );
};

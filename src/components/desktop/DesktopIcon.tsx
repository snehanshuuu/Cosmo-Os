import React from 'react';
import * as Icons from 'lucide-react';
import { AppDefinition } from '../../types';
import { useWindowStore } from '../../stores/windowStore';

interface DesktopIconProps {
  app: AppDefinition;
  isSelected: boolean;
  onSelect: (e: React.MouseEvent, id: string) => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  app,
  isSelected,
  onSelect,
}) => {
  const { openApp } = useWindowStore();

  // Dynamically resolve Lucide Icon component
  const IconComponent = (Icons as unknown as Record<string, React.FC<{ className?: string }>>)[app.icon] || Icons.AppWindow;

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openApp(app.id, app.name, app.icon);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(e, app.id);
  };

  return (
    <div
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      className={`group relative flex flex-col items-center justify-center p-3 rounded-xl w-24 cursor-pointer transition-all duration-150 ${
        isSelected
          ? 'bg-cosmos-lime/15 border border-cosmos-lime-lime/70 shadow-lime-glow backdrop-blur-md'
          : 'hover:bg-white/10 hover:backdrop-blur-sm border border-transparent'
      }`}
    >
      {/* Icon enclosure matching Design.md */}
      <div
        className={`w-14 h-14 flex items-center justify-center rounded-2xl transition-all duration-200 ${
          isSelected
            ? 'bg-cosmos-lime text-black shadow-lime-glow scale-105'
            : 'bg-cosmos-surface-container-high/80 text-cosmos-text-primary group-hover:scale-105 group-hover:border group-hover:border-white/20'
        }`}
      >
        <IconComponent className="w-7 h-7" />
      </div>

      {/* Label matching Design.md JetBrains Mono / Hanken Grotesk */}
      <span
        className={`mt-2 text-xs font-mono tracking-tight text-center truncate max-w-full px-1 py-0.5 rounded ${
          isSelected
            ? 'text-cosmos-lime-bright font-semibold bg-black/60'
            : 'text-cosmos-text-primary drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'
        }`}
      >
        {app.name}
      </span>
    </div>
  );
};

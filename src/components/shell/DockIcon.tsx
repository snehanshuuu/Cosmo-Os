import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { AppDefinition } from '../../types';
import { useWindowStore } from '../../stores/windowStore';

interface DockIconProps {
  app: AppDefinition;
  isOpen: boolean;
  isMinimized: boolean;
  size: number;
}

export const DockIcon: React.FC<DockIconProps> = ({ app, isOpen, isMinimized, size }) => {
  const { openApp, windows, bringToFront } = useWindowStore();
  const [isHovered, setIsHovered] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  // Dynamic Lucide Icon
  const IconComp = (Icons as unknown as Record<string, React.FC<{ className?: string }>>)[app.icon] || Icons.AppWindow;

  const handleClick = () => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 500);

    const existingWindow = windows.find((w) => w.appId === app.id);
    if (existingWindow) {
      bringToFront(existingWindow.id);
    } else {
      openApp(app.id, app.name, app.icon);
    }
  };

  return (
    <div
      className="relative flex flex-col items-center group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Tooltip Badge */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          className="absolute -top-10 px-2.5 py-1 rounded-md bg-black/80 border border-white/15 text-[11px] font-mono text-white whitespace-nowrap shadow-lg backdrop-blur-md pointer-events-none z-50"
        >
          {app.name}
        </motion.div>
      )}

      {/* Dock Icon Enclosure with Hover translateY(-4px), transition 0.2s ease-in-out, and neon accent glow */}
      <motion.div
        animate={
          isBouncing
            ? { y: [0, -14, 0, -6, 0] }
            : { y: isHovered ? -4 : 0, scale: isHovered ? 1.15 : 1 }
        }
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        style={{
          width: size,
          height: size,
          boxShadow: isHovered ? '0 0 12px rgba(120, 255, 100, 0.3)' : undefined,
        }}
        className={`rounded-2xl flex items-center justify-center transition-all duration-200 ease-in-out dock-icon-wrapper ${
          isOpen
            ? 'bg-cosmos-surface-container-high/90 text-cosmos-lime-bright border border-cosmos-lime/40 shadow-lime-glow'
            : 'bg-cosmos-surface-container/70 text-cosmos-text-primary hover:bg-cosmos-surface-container-high hover:border hover:border-white/20'
        }`}
      >
        <IconComp className="w-6 h-6" />
      </motion.div>

      {/* Active Indicator Dot */}
      {isOpen && (
        <span
          className={`w-1.5 h-1.5 rounded-full mt-1 transition-all ${
            isMinimized ? 'bg-amber-400' : 'bg-cosmos-lime shadow-lime-glow'
          }`}
        />
      )}
    </div>
  );
};

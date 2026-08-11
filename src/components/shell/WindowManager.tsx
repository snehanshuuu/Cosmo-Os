import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useWindowStore } from '../../stores/windowStore';
import { Window } from './Window';

export const WindowManager: React.FC = () => {
  const { windows, activeWindowId } = useWindowStore();

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      <AnimatePresence>
        {windows.map((w) => (
          <div key={w.id} className="pointer-events-auto">
            <Window windowState={w} isActive={activeWindowId === w.id} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

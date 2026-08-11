import React from 'react';
import { useAppStore } from '../../stores/appStore';
import { useWindowStore } from '../../stores/windowStore';
import { useSettingsStore } from '../../stores/settingsStore';
import { DockIcon } from './DockIcon';
import { GlassPanel } from '../primitives/GlassPanel';

export const Dock: React.FC = () => {
  const { installedApps } = useAppStore();
  const { windows } = useWindowStore();
  const { dockSize, dockAutohide } = useSettingsStore();

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 transition-transform duration-300 ${
        dockAutohide ? 'translate-y-20 hover:translate-y-0' : 'translate-y-0'
      }`}
    >
      <GlassPanel
        variant="dock"
        className="px-4 py-2 flex items-center gap-3 border border-white/20 shadow-glass"
      >
        {installedApps.map((app) => {
          const activeWin = windows.find((w) => w.appId === app.id);
          const isOpen = !!activeWin;
          const isMinimized = activeWin?.state === 'minimized';

          return (
            <DockIcon
              key={app.id}
              app={app}
              isOpen={isOpen}
              isMinimized={isMinimized}
              size={dockSize}
            />
          );
        })}
      </GlassPanel>
    </div>
  );
};

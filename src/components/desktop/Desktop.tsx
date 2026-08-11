import React, { useState, useEffect } from 'react';
import { Wallpaper } from './Wallpaper';
import { DesktopIcon } from './DesktopIcon';
import { useAppStore } from '../../stores/appStore';
import { TopBar } from '../shell/TopBar';
import { WindowManager } from '../shell/WindowManager';
import { Dock } from '../shell/Dock';
import { NotificationStack } from '../shell/NotificationStack';
import { GlobalSearch } from '../shell/GlobalSearch';
import { CalendarPopup } from '../shell/CalendarPopup';
import { QuickSettings } from '../shell/QuickSettings';
import { ContextMenu } from '../shell/ContextMenu';
import { WidgetLayer } from '../../widgets/WidgetLayer';
import { CyberCatCompanion } from './CyberCatCompanion';
import { BackgroundCanvas } from './BackgroundCanvas';
import { useNotificationStore } from '../../stores/notificationStore';
import { useWindowStore } from '../../stores/windowStore';

export const Desktop: React.FC = () => {
  const { installedApps } = useAppStore();
  const { push: pushNotification } = useNotificationStore();
  const { closeActiveWindow, minimizeActiveWindow, cycleWindows } = useWindowStore();

  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  // Overlay States
  const [showSearch, setShowSearch] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showQuickSettings, setShowQuickSettings] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState<{ x: number; y: number } | null>(null);

  const desktopApps = installedApps.filter((app) => app.isDesktopShortcut);

  // Push welcome notification on initial load
  useEffect(() => {
    pushNotification({
      title: 'Cosmos OS Ready',
      message: 'System loaded into Production Readiness state with full accessibility & keyboard shortcuts.',
      type: 'info',
      duration: 5000,
    });
  }, []);

  // Global Keyboard Shortcuts (Cmd+K, Cmd+W, Cmd+M, Cmd+`, ESC)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmd = e.metaKey || e.ctrlKey;

      if (isCmd && e.key === 'k') {
        e.preventDefault();
        setShowSearch((prev) => !prev);
      } else if (isCmd && e.key.toLowerCase() === 'w') {
        e.preventDefault();
        closeActiveWindow();
      } else if (isCmd && e.key.toLowerCase() === 'm') {
        e.preventDefault();
        minimizeActiveWindow();
      } else if (isCmd && (e.key === '`' || e.key === '~')) {
        e.preventDefault();
        cycleWindows();
      } else if (e.key === 'Escape') {
        setShowSearch(false);
        setShowCalendar(false);
        setShowQuickSettings(false);
        setContextMenuPos(null);
        setSelectedAppId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleDesktopClick = (e: React.MouseEvent) => {
    setContextMenuPos(null);
    setShowCalendar(false);
    setShowQuickSettings(false);
    if (e.target === e.currentTarget) {
      setSelectedAppId(null);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenuPos({ x: e.clientX, y: e.clientY });
  };

  const handleSelectIcon = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setContextMenuPos(null);
    setSelectedAppId(id);
  };

  return (
    <main
      role="main"
      aria-label="Cosmos OS Desktop Canvas"
      onClick={handleDesktopClick}
      onContextMenu={handleContextMenu}
      className="relative w-screen h-screen overflow-hidden select-none bg-cosmos-bg text-cosmos-text-primary"
    >
      {/* Dynamic 3D Fiber Background Canvas Layer */}
      <BackgroundCanvas />

      {/* Background Wallpaper Layer */}
      <Wallpaper />

      {/* Interactive Desktop Widgets Layer */}
      <WidgetLayer />

      {/* Clickable Bottom-Left Cyber Cat Companion */}
      <CyberCatCompanion />

      {/* Top System Status Bar */}
      <TopBar
        onToggleCalendar={() => setShowCalendar((prev) => !prev)}
        onToggleQuickSettings={() => setShowQuickSettings((prev) => !prev)}
        onOpenSearch={() => setShowSearch(true)}
      />

      {/* Desktop Canvas Grid Icons Layer */}
      <div
        onClick={handleDesktopClick}
        aria-label="Desktop App Shortcuts"
        className="relative z-10 w-full h-full pt-12 p-6 flex flex-col flex-wrap gap-4 items-start align-content-start max-h-screen overflow-hidden pointer-events-none"
      >
        {desktopApps.map((app) => (
          <div key={app.id} className="pointer-events-auto">
            <DesktopIcon
              app={app}
              isSelected={selectedAppId === app.id}
              onSelect={handleSelectIcon}
            />
          </div>
        ))}
      </div>

      {/* Floating Multi-Window Manager */}
      <WindowManager />

      {/* Bottom Floating App Dock */}
      <Dock />

      {/* Overlays */}
      <NotificationStack />
      <GlobalSearch isOpen={showSearch} onClose={() => setShowSearch(false)} />
      {showCalendar && <CalendarPopup onClose={() => setShowCalendar(false)} />}
      {showQuickSettings && <QuickSettings onClose={() => setShowQuickSettings(false)} />}
      {contextMenuPos && (
        <ContextMenu
          x={contextMenuPos.x}
          y={contextMenuPos.y}
          onClose={() => setContextMenuPos(null)}
        />
      )}
    </main>
  );
};

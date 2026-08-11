import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../stores/appStore';
import { useWindowStore } from '../../stores/windowStore';
import { useWidgetStore } from '../../stores/widgetStore';
import { useNotificationStore } from '../../stores/notificationStore';
import { GlassPanel } from '../primitives/GlassPanel';
import * as Icons from 'lucide-react';
import { AppId } from '../../types';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchItem {
  id: string;
  type: 'app' | 'action';
  name: string;
  description: string;
  icon: string;
  appId?: AppId;
  action?: () => void;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose }) => {
  const { installedApps } = useAppStore();
  const { openApp } = useWindowStore();
  const { resetDashboardLayout } = useWidgetStore();
  const { push: pushNotification } = useNotificationStore();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const searchItems: SearchItem[] = [
    ...installedApps.map((app) => ({
      id: `app-${app.id}`,
      type: 'app' as const,
      name: app.name,
      description: app.description,
      icon: app.icon,
      appId: app.id,
    })),
    {
      id: 'action-reset-layout',
      type: 'action' as const,
      name: 'Reset Dashboard Layout',
      description: 'Clear custom widget positions & restore default grid layout presets',
      icon: 'Layout',
      action: () => {
        resetDashboardLayout();
        pushNotification({
          title: 'Dashboard Layout Reset',
          message: 'Restored default widget grid positions.',
          type: 'info',
          duration: 3000,
        });
      },
    },
  ];

  const filteredItems = searchItems.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + (filteredItems.length || 1)) % (filteredItems.length || 1));
      } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
        e.preventDefault();
        handleSelectItem(filteredItems[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, query, selectedIndex, filteredItems]);

  const handleSelectItem = (item: SearchItem) => {
    if (item.type === 'app' && item.appId) {
      openApp(item.appId, item.name, item.icon);
    } else if (item.type === 'action' && item.action) {
      item.action();
    }
    onClose();
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <GlassPanel variant="modal" className="w-full max-w-xl p-4 flex flex-col gap-3 shadow-glass">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-3">
          <Icons.Search className="w-5 h-5 text-cosmos-lime-bright" />
          <input
            type="text"
            autoFocus
            placeholder="Search apps, settings, commands... (Cmd + K)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="flex-1 bg-transparent font-mono text-sm text-white focus:outline-none placeholder:text-cosmos-text-muted"
          />
          <span className="text-[10px] font-mono text-cosmos-text-muted bg-white/10 px-2 py-0.5 rounded">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="flex flex-col gap-1 max-h-80 overflow-y-auto">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => {
              const ItemIconComp =
                (Icons as unknown as Record<string, React.FC<{ className?: string }>>)[item.icon] || Icons.AppWindow;
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  className={`p-3 rounded-lg flex items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-cosmos-lime/20 border border-cosmos-lime/40 text-white'
                      : 'hover:bg-white/5 text-cosmos-text-secondary'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-black/40 text-cosmos-lime-bright">
                      <ItemIconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-bold text-white block">{item.name}</span>
                      <span className="text-[11px] text-cosmos-text-muted">{item.description}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-cosmos-lime-bright uppercase bg-cosmos-lime/10 px-2 py-0.5 rounded">
                    {item.type === 'action' ? 'Execute' : 'Launch'}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="p-6 text-center text-xs font-mono text-cosmos-text-muted">
              No matching applications or system commands found.
            </div>
          )}
        </div>
      </GlassPanel>
    </div>
  );
};

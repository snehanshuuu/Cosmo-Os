import React from 'react';
import { useNotificationStore } from '../../stores/notificationStore';
import { GlassPanel } from '../primitives/GlassPanel';
import * as Icons from 'lucide-react';

export const NotificationStack: React.FC = () => {
  const { notifications, dismiss } = useNotificationStore();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-10 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-auto">
      {notifications.map((n) => (
        <GlassPanel
          key={n.id}
          variant="modal"
          className="p-3 flex items-start gap-3 border-l-4 border-l-cosmos-lime shadow-lg"
        >
          <Icons.Bell className="w-4 h-4 text-cosmos-lime-bright mt-0.5" />
          <div className="flex-1">
            <h5 className="font-mono text-xs font-bold text-white">{n.title}</h5>
            <p className="text-xs text-cosmos-text-secondary mt-0.5">{n.message}</p>
          </div>
          <button
            onClick={() => dismiss(n.id)}
            className="text-cosmos-text-muted hover:text-white"
          >
            <Icons.X className="w-3.5 h-3.5" />
          </button>
        </GlassPanel>
      ))}
    </div>
  );
};

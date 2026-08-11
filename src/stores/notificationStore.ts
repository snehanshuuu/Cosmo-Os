import { create } from 'zustand';
import { NotificationItem, NotificationType } from '../types';

interface NotificationStore {
  notifications: NotificationItem[];
  push: (notification: Omit<NotificationItem, 'id' | 'timestamp'>) => void;
  dismiss: (id: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],

  push: (notification) => {
    const id = `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newItem: NotificationItem = {
      ...notification,
      id,
      timestamp: Date.now(),
    };

    set((state) => ({
      notifications: [newItem, ...state.notifications],
    }));

    const duration = notification.duration || 4000;
    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      }, duration);
    }
  },

  dismiss: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },
}));

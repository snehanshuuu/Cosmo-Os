import { create } from 'zustand';
import { WidgetState, WidgetType, WindowPosition } from '../types';

const LOCAL_STORAGE_KEY = 'cosmos_os_widgets';

const DEFAULT_WIDGETS: WidgetState[] = [
  { id: 'w-clock', type: 'clock', position: { x: 30, y: 50 }, isVisible: true },
  { id: 'w-calendar', type: 'calendar', position: { x: 30, y: 185 }, isVisible: true },
  { id: 'w-weather', type: 'weather', position: { x: 30, y: 400 }, isVisible: true },
  { id: 'w-notes', type: 'notes', position: { x: 1220, y: 50 }, isVisible: true },
  { id: 'w-music', type: 'music', position: { x: 1220, y: 185 }, isVisible: true },
  { id: 'w-quick-actions', type: 'quick-actions', position: { x: 1220, y: 395 }, isVisible: true },
  { id: 'w-system-stats', type: 'system-stats', position: { x: 1220, y: 510 }, isVisible: true },
];

const loadWidgets = (): WidgetState[] => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('Failed to load widgets from localStorage', e);
  }
  return DEFAULT_WIDGETS;
};

interface WidgetStore {
  widgets: WidgetState[];
  updatePosition: (id: string, pos: WindowPosition) => void;
  toggleWidgetVisibility: (id: string) => void;
  toggleWidgetType: (type: WidgetType) => void;
  resetDefaultWidgets: () => void;
}

export const useWidgetStore = create<WidgetStore>((set, get) => ({
  widgets: loadWidgets(),

  updatePosition: (id: string, position: WindowPosition) => {
    const updated = get().widgets.map((w) => (w.id === id ? { ...w, position } : w));
    set({ widgets: updated });
    saveWidgets(updated);
  },

  toggleWidgetVisibility: (id: string) => {
    const updated = get().widgets.map((w) => (w.id === id ? { ...w, isVisible: !w.isVisible } : w));
    set({ widgets: updated });
    saveWidgets(updated);
  },

  toggleWidgetType: (type: WidgetType) => {
    const { widgets } = get();
    const existing = widgets.find((w) => w.type === type);
    let updated: WidgetState[];
    if (existing) {
      updated = widgets.map((w) => (w.type === type ? { ...w, isVisible: !w.isVisible } : w));
    } else {
      updated = [
        ...widgets,
        {
          id: `w-${type}-${Date.now()}`,
          type,
          position: { x: 50, y: 50 },
          isVisible: true,
        },
      ];
    }
    set({ widgets: updated });
    saveWidgets(updated);
  },

  resetDefaultWidgets: () => {
    set({ widgets: DEFAULT_WIDGETS });
    saveWidgets(DEFAULT_WIDGETS);
  },
}));

function saveWidgets(widgets: WidgetState[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(widgets));
  } catch (e) {
    console.warn('Failed to save widgets to localStorage', e);
  }
}

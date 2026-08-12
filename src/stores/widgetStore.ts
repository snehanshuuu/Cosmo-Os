import { create } from 'zustand';
import { WidgetState, WidgetType, WindowPosition } from '../types';

export const LOCAL_STORAGE_KEY = 'cosmos_widget_layout_v4';
export const LEGACY_STORAGE_KEY = 'cosmos_widget_layout_v3';

const DEFAULT_WIDGETS: WidgetState[] = [
  // Left Column (Column 1: x=40px, w=320px -> ends x=360px)
  { id: 'w-terminal-stream', type: 'terminal-stream', position: { x: 40, y: 160 }, isVisible: true },
  { id: 'w-system-stats', type: 'system-stats', position: { x: 40, y: 440 }, isVisible: true },

  // Center Column (Column 2: Clock x=380px w=340px -> ends x=720px | Mini Player x=740px w=300px -> ends x=1040px)
  { id: 'w-global-node-clock', type: 'global-node-clock', position: { x: 380, y: 160 }, isVisible: true },
  { id: 'w-music', type: 'music', position: { x: 740, y: 190 }, isVisible: true },

  // Right Column (Column 3: x=1060px)
  { id: 'w-network-telemetry', type: 'network-telemetry', position: { x: 1060, y: 50 }, isVisible: true },
  { id: 'w-calendar', type: 'calendar', position: { x: 1060, y: 270 }, isVisible: true },
  { id: 'w-notes', type: 'notes', position: { x: 1060, y: 500 }, isVisible: true },
  { id: 'w-quick-actions', type: 'quick-actions', position: { x: 1060, y: 700 }, isVisible: true },

  // Background/Hidden Widgets (Available in settings)
  { id: 'w-tasks', type: 'tasks', position: { x: 40, y: 680 }, isVisible: false },
  { id: 'w-weather', type: 'weather', position: { x: 40, y: 740 }, isVisible: false },
  { id: 'w-theme-display-control', type: 'theme-display-control', position: { x: 380, y: 440 }, isVisible: false },
];

const loadWidgets = (): WidgetState[] => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    if (saved) {
      const parsed: WidgetState[] = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const filtered = parsed.filter((w) => w.type !== 'clock');

        // Apply strict engineered grid alignment
        const terminalStream = filtered.find((w) => w.type === 'terminal-stream');
        if (terminalStream) terminalStream.position = { x: 40, y: 160 };

        const systemStats = filtered.find((w) => w.type === 'system-stats');
        if (systemStats) systemStats.position = { x: 40, y: 440 };

        const nodeClock = filtered.find((w) => w.type === 'global-node-clock');
        if (!nodeClock) {
          filtered.unshift({
            id: 'w-global-node-clock',
            type: 'global-node-clock',
            position: { x: 380, y: 160 },
            isVisible: true,
          });
        } else {
          nodeClock.position = { x: 380, y: 160 };
          nodeClock.isVisible = true;
        }

        const musicWidget = filtered.find((w) => w.type === 'music');
        if (musicWidget) {
          musicWidget.position = { x: 740, y: 190 };
          musicWidget.isVisible = true;
        }

        const tasksWidget = filtered.find((w) => w.type === 'tasks');
        if (tasksWidget) {
          tasksWidget.isVisible = false;
        }

        return filtered;
      }
    }
  } catch (e) {
    console.warn('Failed to load widgets from localStorage', e);
  }
  return DEFAULT_WIDGETS;
};

interface WidgetStore {
  widgets: WidgetState[];
  hydrateWidgetLayout: () => void;
  updatePosition: (id: string, pos: WindowPosition) => void;
  toggleWidgetVisibility: (id: string) => void;
  toggleWidgetType: (type: WidgetType) => void;
  resetDefaultWidgets: () => void;
  resetDashboardLayout: () => void;
}

export const useWidgetStore = create<WidgetStore>((set, get) => ({
  widgets: loadWidgets(),

  hydrateWidgetLayout: () => {
    const loaded = loadWidgets();
    set({ widgets: loaded });
  },

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

  resetDashboardLayout: () => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear layout from localStorage', e);
    }
    set({ widgets: DEFAULT_WIDGETS });
    saveWidgets(DEFAULT_WIDGETS);
  },
}));

function saveWidgets(widgets: WidgetState[]) {
  try {
    const serialized = JSON.stringify(widgets);
    localStorage.setItem(LOCAL_STORAGE_KEY, serialized);
    localStorage.setItem(LEGACY_STORAGE_KEY, serialized);
  } catch (e) {
    console.warn('Failed to save widgets to localStorage', e);
  }
}

import { create } from 'zustand';
import { WidgetState, WidgetType, WindowPosition } from '../types';

export const LOCAL_STORAGE_KEY = 'cosmos_widget_layout';
export const LEGACY_STORAGE_KEY = 'cosmos_os_widgets';

const DEFAULT_WIDGETS: WidgetState[] = [
  // Left Column: Terminal Stream -> System Diagnostics
  { id: 'w-terminal-stream', type: 'terminal-stream', position: { x: 30, y: 50 }, isVisible: true },
  { id: 'w-system-stats', type: 'system-stats', position: { x: 30, y: 350 }, isVisible: true },

  // Center Area: Global Node Clock (with integrated weather) & Mini Player
  { id: 'w-global-node-clock', type: 'global-node-clock', position: { x: 480, y: 190 }, isVisible: true },
  { id: 'w-music', type: 'music', position: { x: 770, y: 250 }, isVisible: true },

  // Right Column: Network Telemetry -> Calendar -> Quick Notes -> Quick Actions
  { id: 'w-network-telemetry', type: 'network-telemetry', position: { x: 1220, y: 50 }, isVisible: true },
  { id: 'w-calendar', type: 'calendar', position: { x: 1220, y: 300 }, isVisible: true },
  { id: 'w-notes', type: 'notes', position: { x: 1220, y: 560 }, isVisible: true },
  { id: 'w-quick-actions', type: 'quick-actions', position: { x: 1220, y: 730 }, isVisible: true },

  // Background/Hidden Widgets (Available in settings)
  { id: 'w-weather', type: 'weather', position: { x: 30, y: 650 }, isVisible: false },
  { id: 'w-theme-display-control', type: 'theme-display-control', position: { x: 770, y: 500 }, isVisible: false },
];

const loadWidgets = (): WidgetState[] => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    if (saved) {
      const parsed: WidgetState[] = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Remove legacy standard digital clock if present
        return parsed.filter((w) => w.type !== 'clock');
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

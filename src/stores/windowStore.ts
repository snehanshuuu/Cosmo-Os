import { create } from 'zustand';
import { WindowState, AppId, WindowPosition, WindowSize } from '../types';

interface WindowStore {
  windows: WindowState[];
  activeWindowId: string | null;
  highestZIndex: number;

  bringToFront: (id: string) => void;
  openApp: (appId: AppId, title?: string, icon?: string) => void;
  closeWindow: (id: string) => void;
  closeActiveWindow: () => void;
  minimizeWindow: (id: string) => void;
  minimizeActiveWindow: () => void;
  maximizeWindow: (id: string) => void;
  cycleWindows: () => void;
  updatePosition: (id: string, pos: WindowPosition) => void;
  updateSize: (id: string, size: WindowSize) => void;
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  activeWindowId: null,
  highestZIndex: 10,

  bringToFront: (id: string) => {
    const { windows, highestZIndex, activeWindowId } = get();
    if (activeWindowId === id) return;

    const newZIndex = highestZIndex + 1;
    set({
      activeWindowId: id,
      highestZIndex: newZIndex,
      windows: windows.map((w) =>
        w.id === id ? { ...w, zIndex: newZIndex, state: w.state === 'minimized' ? 'open' : w.state } : w
      ),
    });
  },

  openApp: (appId: AppId, title?: string, icon?: string) => {
    const { windows, highestZIndex } = get();

    // Check if app window already exists
    const existing = windows.find((w) => w.appId === appId);
    if (existing) {
      get().bringToFront(existing.id);
      return;
    }

    const id = `window-${appId}-${Date.now()}`;
    const newZIndex = highestZIndex + 1;
    const defaultPos: WindowPosition = {
      x: 100 + (windows.length % 5) * 30,
      y: 60 + (windows.length % 5) * 30,
    };
    const defaultSize: WindowSize = { width: 750, height: 480 };

    const newWindow: WindowState = {
      id,
      appId,
      title: title || appId.replace('-', ' ').toUpperCase(),
      icon: icon || 'AppWindow',
      position: defaultPos,
      size: defaultSize,
      zIndex: newZIndex,
      state: 'open',
    };

    set({
      windows: [...windows, newWindow],
      activeWindowId: id,
      highestZIndex: newZIndex,
    });
  },

  closeWindow: (id: string) => {
    const { windows, activeWindowId } = get();
    const remaining = windows.filter((w) => w.id !== id);
    let nextActiveId = activeWindowId;

    if (activeWindowId === id) {
      const highest = remaining.reduce(
        (max, w) => (w.zIndex > max.zIndex ? w : max),
        { zIndex: -1, id: null } as { zIndex: number; id: string | null }
      );
      nextActiveId = highest.id;
    }

    set({
      windows: remaining,
      activeWindowId: nextActiveId,
    });
  },

  closeActiveWindow: () => {
    const { activeWindowId } = get();
    if (activeWindowId) {
      get().closeWindow(activeWindowId);
    }
  },

  minimizeWindow: (id: string) => {
    const { windows, activeWindowId } = get();
    const updated = windows.map((w) =>
      w.id === id ? { ...w, state: 'minimized' as const } : w
    );

    let nextActiveId = activeWindowId;
    if (activeWindowId === id) {
      const openWindows = updated.filter((w) => w.state !== 'minimized');
      const highest = openWindows.reduce(
        (max, w) => (w.zIndex > max.zIndex ? w : max),
        { zIndex: -1, id: null } as { zIndex: number; id: string | null }
      );
      nextActiveId = highest.id;
    }

    set({
      windows: updated,
      activeWindowId: nextActiveId,
    });
  },

  minimizeActiveWindow: () => {
    const { activeWindowId } = get();
    if (activeWindowId) {
      get().minimizeWindow(activeWindowId);
    }
  },

  maximizeWindow: (id: string) => {
    const { windows } = get();
    set({
      windows: windows.map((w) => {
        if (w.id !== id) return w;
        if (w.state === 'maximized') {
          return {
            ...w,
            state: 'open',
            position: w.previousPosition || w.position,
            size: w.previousSize || w.size,
          };
        } else {
          return {
            ...w,
            state: 'maximized',
            previousPosition: w.position,
            previousSize: w.size,
          };
        }
      }),
    });
    get().bringToFront(id);
  },

  cycleWindows: () => {
    const { windows, activeWindowId } = get();
    const openWindows = windows.filter((w) => w.state !== 'minimized');
    if (openWindows.length <= 1) return;

    const currentIdx = openWindows.findIndex((w) => w.id === activeWindowId);
    const nextIdx = (currentIdx + 1) % openWindows.length;
    get().bringToFront(openWindows[nextIdx].id);
  },

  updatePosition: (id: string, pos: WindowPosition) => {
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, position: pos } : w)),
    }));
  },

  updateSize: (id: string, size: WindowSize) => {
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, size } : w)),
    }));
  },
}));

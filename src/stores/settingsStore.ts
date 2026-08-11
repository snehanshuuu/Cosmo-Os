import { create } from 'zustand';
import { SettingsState, WallpaperPreset, AccentColor } from '../types';

const LOCAL_STORAGE_KEY = 'cosmos_os_settings';

const defaultSettings: SettingsState = {
  wallpaper: 'quantum-matrix',
  accentColor: 'electric-lime',
  dockSize: 56,
  dockAutohide: false,
  theme: 'dark',
  reducedMotion: false,
};

const loadInitialSettings = (): SettingsState => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      return { ...defaultSettings, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn('Failed to read settings from localStorage', e);
  }
  return defaultSettings;
};

interface SettingsStore extends SettingsState {
  setWallpaper: (wallpaper: WallpaperPreset | string) => void;
  setAccentColor: (color: AccentColor) => void;
  setDockSize: (size: number) => void;
  toggleDockAutohide: () => void;
  toggleReducedMotion: () => void;
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  ...loadInitialSettings(),

  setWallpaper: (wallpaper) => {
    set({ wallpaper });
    saveSettings(get());
  },

  setAccentColor: (accentColor) => {
    set({ accentColor });
    saveSettings(get());
  },

  setDockSize: (dockSize) => {
    set({ dockSize });
    saveSettings(get());
  },

  toggleDockAutohide: () => {
    set((state) => {
      const next = { dockAutohide: !state.dockAutohide };
      saveSettings({ ...state, ...next });
      return next;
    });
  },

  toggleReducedMotion: () => {
    set((state) => {
      const next = { reducedMotion: !state.reducedMotion };
      saveSettings({ ...state, ...next });
      return next;
    });
  },
}));

function saveSettings(state: SettingsState) {
  try {
    const toSave: SettingsState = {
      wallpaper: state.wallpaper,
      accentColor: state.accentColor,
      dockSize: state.dockSize,
      dockAutohide: state.dockAutohide,
      theme: state.theme,
      reducedMotion: state.reducedMotion,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(toSave));
  } catch (e) {
    console.warn('Failed to save settings to localStorage', e);
  }
}

import { create } from 'zustand';
import { AppDefinition } from '../types';

const INITIAL_APPS: AppDefinition[] = [
  {
    id: 'file-explorer',
    name: 'File Explorer',
    icon: 'Folder',
    category: 'system',
    description: 'Browse workspace files, folders, and tags',
    isDesktopShortcut: false,
    defaultWidth: 800,
    defaultHeight: 520,
  },
  {
    id: 'calendar',
    name: 'Calendar',
    icon: 'Calendar',
    category: 'productivity',
    description: 'Schedule management, events, and monthly planning',
    isDesktopShortcut: false,
    defaultWidth: 780,
    defaultHeight: 540,
  },
  {
    id: 'settings',
    name: 'System Settings',
    icon: 'Sliders',
    category: 'system',
    description: 'Customize theme, wallpaper, dock, and preferences',
    isDesktopShortcut: false,
    defaultWidth: 780,
    defaultHeight: 540,
  },
  {
    id: 'calculator',
    name: 'Calculator',
    icon: 'Calculator',
    category: 'tools',
    description: 'Scientific and standard arithmetic calculator',
    isDesktopShortcut: false,
    defaultWidth: 340,
    defaultHeight: 460,
  },
  {
    id: 'notes',
    name: 'Cosmos Notes',
    icon: 'FileText',
    category: 'productivity',
    description: 'Quick scratchpad and rich note taking',
    isDesktopShortcut: false,
    defaultWidth: 640,
    defaultHeight: 480,
  },
  {
    id: 'gallery',
    name: 'Media Gallery',
    icon: 'Image',
    category: 'media',
    description: 'High-res image viewer and wallpaper collection',
    isDesktopShortcut: false,
    defaultWidth: 720,
    defaultHeight: 500,
  },
  {
    id: 'music-player',
    name: 'Music Player',
    icon: 'Music',
    category: 'media',
    description: 'Audio playback system with interactive CD animation',
    isDesktopShortcut: false,
    defaultWidth: 420,
    defaultHeight: 560,
  },
  {
    id: 'browser',
    name: 'Web Browser',
    icon: 'Globe',
    category: 'tools',
    description: 'Simulated web environment and browser tabs',
    isDesktopShortcut: false,
    defaultWidth: 840,
    defaultHeight: 560,
  },
  {
    id: 'terminal',
    name: 'Cosmos Terminal',
    icon: 'Terminal',
    category: 'system',
    description: 'Command line shell and system diagnostics',
    isDesktopShortcut: false,
    defaultWidth: 700,
    defaultHeight: 440,
  },
];

interface AppStore {
  installedApps: AppDefinition[];
  getAppById: (id: string) => AppDefinition | undefined;
}

export const useAppStore = create<AppStore>((_, get) => ({
  installedApps: INITIAL_APPS,
  getAppById: (id: string) => get().installedApps.find((app) => app.id === id),
}));

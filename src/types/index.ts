export type AppId = 
  | 'file-explorer' 
  | 'settings' 
  | 'calculator' 
  | 'notes' 
  | 'gallery' 
  | 'music-player' 
  | 'browser' 
  | 'terminal'
  | 'calendar';

export interface AppDefinition {
  id: AppId;
  name: string;
  icon: string; // Lucide icon name or image identifier
  category: 'system' | 'productivity' | 'media' | 'tools';
  description: string;
  isDesktopShortcut: boolean;
  defaultWidth?: number;
  defaultHeight?: number;
}

export type WindowStateMode = 'open' | 'minimized' | 'maximized';

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  icon: string;
  position: WindowPosition;
  size: WindowSize;
  zIndex: number;
  state: WindowStateMode;
  previousPosition?: WindowPosition;
  previousSize?: WindowSize;
}

export type WallpaperPreset = 
  | 'quantum-matrix'
  | 'electric-grid' 
  | 'deep-space' 
  | 'nebula-flow' 
  | 'obsidian-void';

export type AccentColor = 
  | 'electric-lime' 
  | 'cyber-cyan' 
  | 'neon-purple' 
  | 'solar-orange';

export interface SettingsState {
  wallpaper: WallpaperPreset | string;
  accentColor: AccentColor;
  dockSize: number;
  dockAutohide: boolean;
  theme: 'dark' | 'light';
  reducedMotion: boolean;
}

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: number;
  duration?: number;
}

export type WidgetType = 
  | 'clock' 
  | 'calendar' 
  | 'weather' 
  | 'notes' 
  | 'system-stats' 
  | 'music' 
  | 'quick-actions'
  | 'terminal-stream'
  | 'global-node-clock';

export interface WidgetState {
  id: string;
  type: WidgetType;
  position: WindowPosition;
  isVisible: boolean;
}

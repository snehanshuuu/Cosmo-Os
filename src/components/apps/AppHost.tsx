import React, { lazy, Suspense } from 'react';
import { AppId } from '../../types';
import * as Icons from 'lucide-react';

const FileExplorerApp = lazy(() =>
  import('./FileExplorerApp').then((m) => ({ default: m.FileExplorerApp }))
);
const CalendarApp = lazy(() =>
  import('./CalendarApp').then((m) => ({ default: m.CalendarApp }))
);
const SettingsApp = lazy(() =>
  import('./SettingsApp').then((m) => ({ default: m.SettingsApp }))
);
const CalculatorApp = lazy(() =>
  import('./CalculatorApp').then((m) => ({ default: m.CalculatorApp }))
);
const NotesApp = lazy(() =>
  import('./NotesApp').then((m) => ({ default: m.NotesApp }))
);
const GalleryApp = lazy(() =>
  import('./GalleryApp').then((m) => ({ default: m.GalleryApp }))
);
const MusicPlayerApp = lazy(() =>
  import('./MusicPlayerApp').then((m) => ({ default: m.MusicPlayerApp }))
);
const BrowserApp = lazy(() =>
  import('./BrowserApp').then((m) => ({ default: m.BrowserApp }))
);
const TerminalApp = lazy(() =>
  import('./TerminalApp').then((m) => ({ default: m.TerminalApp }))
);

interface AppHostProps {
  appId: AppId;
}

const LoadingFallback: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full w-full bg-cosmos-bg/90 text-cosmos-lime-bright font-mono text-xs gap-2">
    <Icons.RotateCw className="w-5 h-5 animate-spin" />
    <span>Loading Application...</span>
  </div>
);

export const AppHost: React.FC<AppHostProps> = ({ appId }) => {
  const renderApp = () => {
    switch (appId) {
      case 'file-explorer':
        return <FileExplorerApp />;
      case 'calendar':
        return <CalendarApp />;
      case 'settings':
        return <SettingsApp />;
      case 'calculator':
        return <CalculatorApp />;
      case 'notes':
        return <NotesApp />;
      case 'gallery':
        return <GalleryApp />;
      case 'music-player':
        return <MusicPlayerApp />;
      case 'browser':
        return <BrowserApp />;
      case 'terminal':
        return <TerminalApp />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-xs font-mono text-cosmos-text-muted">
            Unknown Application: {appId}
          </div>
        );
    }
  };

  return <Suspense fallback={<LoadingFallback />}>{renderApp()}</Suspense>;
};

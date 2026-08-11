import React, { useEffect } from 'react';
import { useWidgetStore } from '../stores/widgetStore';
import { WidgetWrapper } from './WidgetWrapper';
import { ClockWidget } from './ClockWidget';
import { CalendarWidget } from './CalendarWidget';
import { WeatherWidget } from './WeatherWidget';
import { NotesWidget } from './NotesWidget';
import { MusicWidget } from './MusicWidget';
import { QuickActionsWidget } from './QuickActionsWidget';
import { SystemStatsWidget } from './SystemStatsWidget';
import { TerminalStreamWidget } from './TerminalStreamWidget';
import { NetworkTelemetryWidget } from './NetworkTelemetryWidget';
import { DisplayThemeWidget } from './DisplayThemeWidget';
import { CyberCat } from './CyberCat';

export const WidgetLayer: React.FC = () => {
  const { widgets, updatePosition, hydrateWidgetLayout } = useWidgetStore();

  useEffect(() => {
    hydrateWidgetLayout();
  }, []);

  const renderWidgetContent = (type: string) => {
    switch (type) {
      case 'clock':
        return <ClockWidget />;
      case 'calendar':
        return <CalendarWidget />;
      case 'weather':
        return <WeatherWidget />;
      case 'notes':
        return <NotesWidget />;
      case 'music':
        return <MusicWidget />;
      case 'quick-actions':
        return <QuickActionsWidget />;
      case 'system-stats':
        return <SystemStatsWidget />;
      case 'terminal-stream':
        return <TerminalStreamWidget />;
      case 'network-telemetry':
        return <NetworkTelemetryWidget />;
      case 'theme-display-control':
        return <DisplayThemeWidget />;
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {/* CyberCat pixel cat sprite anchored at lower-left desktop corner (bottom: 80px, left: 40px) */}
      <CyberCat />

      {widgets
        .filter((w) => w.isVisible && w.type !== 'global-node-clock')
        .map((w) => (
          <WidgetWrapper
            key={w.id}
            id={w.id}
            position={w.position}
            onUpdatePosition={updatePosition}
          >
            {renderWidgetContent(w.type)}
          </WidgetWrapper>
        ))}
    </div>
  );
};

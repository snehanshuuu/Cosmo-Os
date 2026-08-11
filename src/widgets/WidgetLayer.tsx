import React from 'react';
import { useWidgetStore } from '../stores/widgetStore';
import { WidgetWrapper } from './WidgetWrapper';
import { ClockWidget } from './ClockWidget';
import { CalendarWidget } from './CalendarWidget';
import { WeatherWidget } from './WeatherWidget';
import { NotesWidget } from './NotesWidget';
import { MusicWidget } from './MusicWidget';
import { QuickActionsWidget } from './QuickActionsWidget';
import { SystemStatsWidget } from './SystemStatsWidget';

export const WidgetLayer: React.FC = () => {
  const { widgets, updatePosition } = useWidgetStore();

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
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {widgets
        .filter((w) => w.isVisible)
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

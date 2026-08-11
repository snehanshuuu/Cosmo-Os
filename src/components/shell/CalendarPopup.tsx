import React from 'react';
import { GlassPanel } from '../primitives/GlassPanel';
import * as Icons from 'lucide-react';

interface CalendarPopupProps {
  onClose: () => void;
}

export const CalendarPopup: React.FC<CalendarPopupProps> = ({ onClose }) => {
  const daysOfWeek = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
  const now = new Date();
  const currentDay = now.getDate();

  // Create 31 days grid
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <GlassPanel
      variant="modal"
      className="absolute top-10 right-16 z-50 p-4 w-72 flex flex-col gap-3 shadow-glass"
    >
      <div className="flex justify-between items-center border-b border-white/10 pb-2">
        <span className="font-mono text-xs font-bold text-white uppercase">
          {now.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </span>
        <button onClick={onClose} className="text-cosmos-text-muted hover:text-white">
          <Icons.X className="w-4 h-4" />
        </button>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px] text-cosmos-text-muted">
        {daysOfWeek.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center font-mono text-xs">
        {days.map((day) => {
          const isToday = day === currentDay;
          return (
            <div
              key={day}
              className={`h-7 rounded flex items-center justify-center cursor-pointer transition-all ${
                isToday
                  ? 'bg-cosmos-lime text-black font-bold shadow-lime-glow'
                  : 'text-cosmos-text-primary hover:bg-white/10'
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
};

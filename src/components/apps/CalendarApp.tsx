import React, { useState } from 'react';
import { useCalendarStore, CalendarEvent } from '../../stores/calendarStore';
import { GlassPanel } from '../primitives/GlassPanel';
import * as Icons from 'lucide-react';

export const CalendarApp: React.FC = () => {
  const { events, selectedDateStr, setSelectedDateStr, addEvent, deleteEvent } = useCalendarStore();
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());

  // Form State
  const [evtTitle, setEvtTitle] = useState('');
  const [evtTime, setEvtTime] = useState('10:00 AM');
  const [evtCategory, setEvtCategory] = useState<CalendarEvent['category']>('work');

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  // Calculate days in current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  const handleAddEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (evtTitle.trim()) {
      addEvent(evtTitle.trim(), selectedDateStr, evtTime, evtCategory);
      setEvtTitle('');
    }
  };

  const selectedEvents = events.filter((e) => e.dateStr === selectedDateStr);

  return (
    <div className="flex h-full w-full bg-cosmos-bg/90 text-cosmos-text-primary text-sm overflow-hidden select-none">
      {/* Main Calendar Month View */}
      <div className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto">
        {/* Navigation Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-display font-bold text-white">
              {currentMonthDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h2>
            <p className="text-xs font-mono text-cosmos-text-secondary">
              Schedule Planner & Event Manager
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={prevMonth}
              className="p-2 rounded-md bg-white/10 text-white hover:bg-white/20 transition-colors"
              title="Previous Month"
            >
              <Icons.ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setCurrentMonthDate(new Date());
                setSelectedDateStr(todayStr);
              }}
              className="px-3 py-1.5 rounded-md bg-cosmos-lime/20 text-cosmos-lime-bright text-xs font-mono font-bold hover:bg-cosmos-lime hover:text-black transition-colors"
            >
              Today
            </button>
            <button
              onClick={nextMonth}
              className="p-2 rounded-md bg-white/10 text-white hover:bg-white/20 transition-colors"
              title="Next Month"
            >
              <Icons.ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-2 text-center font-mono text-xs font-semibold text-cosmos-text-muted border-b border-white/10 pb-2">
          {daysOfWeek.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>

        {/* Month Grid */}
        <div className="grid grid-cols-7 gap-2 flex-1">
          {/* Empty cells for padding first day of month */}
          {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
            <div key={`empty-${idx}`} className="h-16 rounded-lg bg-black/20 opacity-30" />
          ))}

          {/* Days */}
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const dayNum = idx + 1;
            const dateObj = new Date(year, month, dayNum);
            const dateStr = dateObj.toISOString().split('T')[0];
            const isToday = dateStr === todayStr;
            const isSelected = dateStr === selectedDateStr;
            const dayEvents = events.filter((e) => e.dateStr === dateStr);

            return (
              <div
                key={dayNum}
                onClick={() => setSelectedDateStr(dateStr)}
                className={`h-16 p-2 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-cosmos-lime bg-cosmos-lime/15 shadow-lime-glow'
                    : isToday
                    ? 'border-white/40 bg-white/10'
                    : 'border-white/5 bg-cosmos-container-low/50 hover:border-white/20'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isToday
                        ? 'text-black bg-cosmos-lime px-1.5 py-0.5 rounded-full'
                        : isSelected
                        ? 'text-cosmos-lime-bright'
                        : 'text-white'
                    }`}
                  >
                    {dayNum}
                  </span>
                  {dayEvents.length > 0 && (
                    <span className="w-2 h-2 rounded-full bg-cosmos-lime shadow-lime-glow" />
                  )}
                </div>

                {/* Event Snippets */}
                <div className="flex flex-col gap-0.5 truncate">
                  {dayEvents.slice(0, 1).map((evt) => (
                    <span
                      key={evt.id}
                      className="text-[9px] font-mono text-cosmos-lime-bright bg-black/60 px-1 py-0.5 rounded truncate"
                    >
                      {evt.title}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Sidebar: Events & Add Form */}
      <div className="w-72 bg-cosmos-container-low/60 border-l border-white/10 p-4 flex flex-col gap-4 overflow-y-auto">
        <div>
          <h3 className="font-mono text-xs font-bold uppercase text-white mb-1">
            Events for {selectedDateStr}
          </h3>
          <p className="text-[11px] text-cosmos-text-muted">
            {selectedEvents.length} scheduled item(s)
          </p>
        </div>

        {/* Selected Events List */}
        <div className="flex flex-col gap-2 flex-1">
          {selectedEvents.length > 0 ? (
            selectedEvents.map((evt) => (
              <GlassPanel
                key={evt.id}
                className="p-3 flex items-start justify-between border-l-4 border-l-cosmos-lime"
              >
                <div>
                  <h4 className="font-mono text-xs font-bold text-white">{evt.title}</h4>
                  <div className="flex items-center gap-2 mt-1 text-[10px] font-mono text-cosmos-text-muted">
                    <Icons.Clock className="w-3 h-3 text-cosmos-lime-bright" />
                    <span>{evt.timeStr}</span>
                    <span className="uppercase text-cosmos-lime font-semibold">[{evt.category}]</span>
                  </div>
                </div>
                <button
                  onClick={() => deleteEvent(evt.id)}
                  className="text-cosmos-text-muted hover:text-rose-400 p-1"
                  title="Delete Event"
                >
                  <Icons.Trash2 className="w-3.5 h-3.5" />
                </button>
              </GlassPanel>
            ))
          ) : (
            <div className="p-4 text-center text-xs font-mono text-cosmos-text-muted border border-dashed border-white/10 rounded-lg">
              No events scheduled for this date.
            </div>
          )}
        </div>

        {/* Add Event Form */}
        <GlassPanel className="p-3 flex flex-col gap-2.5">
          <span className="text-xs font-mono uppercase font-bold text-white">Add New Event</span>
          <form onSubmit={handleAddEventSubmit} className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Event Title"
              value={evtTitle}
              onChange={(e) => setEvtTitle(e.target.value)}
              className="bg-black/50 border border-white/15 rounded px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-cosmos-lime"
            />
            <div className="flex gap-2">
              <input
                type="text"
                value={evtTime}
                onChange={(e) => setEvtTime(e.target.value)}
                placeholder="10:00 AM"
                className="w-1/2 bg-black/50 border border-white/15 rounded px-2 py-1 text-xs font-mono text-white focus:outline-none"
              />
              <select
                value={evtCategory}
                onChange={(e) => setEvtCategory(e.target.value as CalendarEvent['category'])}
                className="w-1/2 bg-black/50 border border-white/15 rounded px-2 py-1 text-xs font-mono text-white focus:outline-none"
              >
                <option value="work">Work</option>
                <option value="quest">Quest IT</option>
                <option value="personal">Personal</option>
                <option value="reminder">Reminder</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-cosmos-lime text-black font-mono font-bold text-xs py-1.5 rounded hover:bg-cosmos-lime-bright transition-colors flex items-center justify-center gap-1 mt-1"
            >
              <Icons.Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Add Event</span>
            </button>
          </form>
        </GlassPanel>
      </div>
    </div>
  );
};

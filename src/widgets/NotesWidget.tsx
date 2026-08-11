import React from 'react';
import { useNotesStore } from '../stores/notesStore';

export const NotesWidget: React.FC = () => {
  const { notes } = useNotesStore();
  const topNote = notes[0];

  return (
    <div className="flex flex-col gap-1 w-48 font-mono text-xs">
      <div className="flex justify-between items-center text-[10px] text-cosmos-text-muted border-b border-white/10 pb-1">
        <span className="uppercase tracking-wider">QUICK NOTES</span>
      </div>
      {topNote ? (
        <div>
          <span className="font-bold text-white block truncate">{topNote.title}</span>
          <p className="text-[11px] text-cosmos-text-secondary truncate mt-1">
            {topNote.content.slice(0, 60) || 'Empty note...'}
          </p>
        </div>
      ) : (
        <span className="text-cosmos-text-muted">No notes available.</span>
      )}
    </div>
  );
};

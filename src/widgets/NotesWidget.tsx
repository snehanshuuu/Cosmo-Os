import React, { useState } from 'react';
import { useNotesStore } from '../stores/notesStore';
import * as Icons from 'lucide-react';

export const NotesWidget: React.FC = () => {
  const { notes, createNote, updateNoteLocal, deleteNote } = useNotesStore();
  const [inputVal, setInputVal] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddQuickNote = async () => {
    if (!inputVal.trim()) return;
    const text = inputVal.trim();
    setInputVal('');
    setIsAdding(false);

    // Call store createNote and update note with quick text content
    await createNote();
    // Update the newly created note at the top
    const currentNotes = useNotesStore.getState().notes;
    if (currentNotes.length > 0) {
      const latestNote = currentNotes[0];
      updateNoteLocal(latestNote.id, text.slice(0, 24), text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddQuickNote();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setInputVal('');
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col gap-2 w-48 font-mono text-xs select-none"
    >
      {/* Header with '+' button */}
      <div className="flex justify-between items-center text-[10px] text-cosmos-text-muted border-b border-white/10 pb-1">
        <span className="uppercase tracking-wider font-bold text-white">QUICK NOTES</span>
        <button
          onClick={() => setIsAdding((prev) => !prev)}
          className="p-0.5 rounded hover:bg-white/10 text-cosmos-lime-bright transition-colors"
          title="Add Quick Note"
        >
          <Icons.Plus className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>

      {/* Inline Input Trigger Field */}
      {isAdding && (
        <div className="flex items-center gap-1 bg-black/60 border border-cosmos-lime/40 rounded px-2 py-1 shadow-lime-glow">
          <input
            type="text"
            autoFocus
            placeholder="Type quick note..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-[11px] font-mono text-white focus:outline-none placeholder:text-cosmos-text-muted"
          />
          <button
            onClick={handleAddQuickNote}
            className="text-[9px] font-mono font-bold bg-cosmos-lime text-black px-1.5 py-0.5 rounded hover:bg-cosmos-lime-bright"
          >
            Save
          </button>
        </div>
      )}

      {/* Scrollable Mini Notes List */}
      <div className="flex flex-col gap-1.5 max-h-36 overflow-y-auto pr-1">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div
              key={note.id}
              className="p-2 rounded bg-black/40 border border-white/5 hover:border-white/20 transition-all flex items-start justify-between group"
            >
              <div className="flex-1 truncate pr-1">
                <span className="font-bold text-white text-[11px] block truncate">
                  {note.title || 'Untitled'}
                </span>
                {note.content && (
                  <p className="text-[10px] text-cosmos-text-secondary truncate mt-0.5">
                    {note.content.replace(/[#*`]/g, '')}
                  </p>
                )}
              </div>
              <button
                onClick={() => deleteNote(note.id)}
                className="opacity-0 group-hover:opacity-100 text-cosmos-text-muted hover:text-rose-400 transition-opacity p-0.5"
                title="Delete Note"
              >
                <Icons.Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full py-3 border border-dashed border-white/15 rounded text-[11px] text-cosmos-text-muted hover:border-cosmos-lime/50 hover:text-cosmos-lime-bright transition-colors text-center"
          >
            + Add first quick note
          </button>
        )}
      </div>
    </div>
  );
};

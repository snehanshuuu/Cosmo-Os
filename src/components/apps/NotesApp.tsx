import React, { useEffect, useState } from 'react';
import { useNotesStore } from '../../stores/notesStore';
import { useNotificationStore } from '../../stores/notificationStore';
import * as Icons from 'lucide-react';

export const NotesApp: React.FC = () => {
  const {
    studentId,
    notes,
    activeNoteId,
    isLoading,
    initNotesStore,
    setActiveNoteId,
    createNote,
    updateNoteLocal,
    saveNoteCloud,
    deleteNote,
  } = useNotesStore();

  const { push: pushNotification } = useNotificationStore();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  useEffect(() => {
    initNotesStore();
  }, []);

  const activeNote = notes.find((n) => n.id === activeNoteId) || notes[0];

  const handleManualSave = async () => {
    if (!activeNote || activeNote.isTemp) return;
    setSaveStatus('saving');
    const success = await saveNoteCloud(activeNote.id);
    if (success) {
      setSaveStatus('saved');
      pushNotification({
        title: 'Cloud Synced',
        message: `Saved "${activeNote.title}" to cloud backend.`,
        type: 'success',
        duration: 3000,
      });
      setTimeout(() => setSaveStatus('idle'), 2000);
    } else {
      setSaveStatus('idle');
      pushNotification({
        title: 'Save Warning',
        message: 'Could not sync to cloud, stored locally.',
        type: 'warning',
        duration: 3000,
      });
    }
  };

  return (
    <div className="flex h-full w-full bg-cosmos-bg/90 text-cosmos-text-primary text-sm overflow-hidden select-none">
      {/* Notes List Sidebar */}
      <div className="w-60 bg-cosmos-container-low/60 border-r border-white/10 p-3 flex flex-col gap-3">
        {/* Sidebar Header */}
        <div className="flex justify-between items-center px-1">
          <div>
            <span className="text-xs font-mono font-bold uppercase text-white block">Notes</span>
            <div className="flex items-center gap-1.5 mt-0.5" title={`Student ID: ${studentId}`}>
              <span className="w-2 h-2 rounded-full bg-cosmos-lime shadow-lime-glow animate-pulse" />
              <span className="text-[10px] font-mono text-cosmos-text-muted truncate max-w-[100px]">
                {studentId ? `ID: ${studentId}` : 'Connecting...'}
              </span>
            </div>
          </div>
          <button
            onClick={createNote}
            className="p-1.5 rounded bg-cosmos-lime text-black hover:bg-cosmos-lime-bright transition-all shadow-lime-glow flex items-center gap-1 font-mono text-xs font-bold"
            title="Create New Note (Optimistic POST)"
          >
            <Icons.Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>New</span>
          </button>
        </div>

        {/* Notes Item Queue */}
        <div className="flex flex-col gap-1.5 overflow-y-auto flex-1">
          {isLoading ? (
            <div className="p-4 text-center text-xs font-mono text-cosmos-text-muted flex items-center justify-center gap-2">
              <Icons.RotateCw className="w-4 h-4 animate-spin text-cosmos-lime" />
              <span>Fetching Cloud Notes...</span>
            </div>
          ) : notes.length > 0 ? (
            notes.map((note) => {
              const isSelected = activeNote?.id === note.id;
              return (
                <div
                  key={note.id}
                  onClick={() => setActiveNoteId(note.id)}
                  className={`p-2.5 rounded-lg cursor-pointer transition-all flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-cosmos-lime/15 border border-cosmos-lime/40 text-white'
                      : 'bg-black/30 border border-white/5 text-cosmos-text-secondary hover:border-white/20'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-mono text-xs font-bold text-white truncate max-w-[130px]">
                      {note.title || 'Untitled Note'}
                    </h4>
                    <div className="flex items-center gap-1">
                      {note.isTemp && (
                        <span className="text-[9px] font-mono uppercase bg-amber-500/20 text-amber-300 px-1 rounded">
                          Syncing
                        </span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNote(note.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 text-cosmos-text-muted hover:text-rose-400 transition-opacity p-0.5"
                        title="Delete Note (Optimistic DELETE)"
                      >
                        <Icons.Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <p className="text-[11px] text-cosmos-text-secondary truncate mt-1">
                    {note.content.replace(/[#*`]/g, '') || 'Empty note...'}
                  </p>
                  <span className="text-[9px] font-mono text-cosmos-text-muted mt-2 block">
                    {new Date(note.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="p-4 text-center text-xs font-mono text-cosmos-text-muted">
              No notes found. Click + New to create one.
            </div>
          )}
        </div>
      </div>

      {/* Editor & Save Bar */}
      {activeNote ? (
        <div className="flex-1 flex flex-col p-6 bg-black/30">
          {/* Header Action Bar */}
          <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-cosmos-text-muted">ID:</span>
              <span className="text-xs font-mono text-cosmos-lime-bright truncate max-w-[180px]">
                {activeNote.id}
              </span>
              {activeNote.isTemp && (
                <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                  Creating on Cloud...
                </span>
              )}
            </div>

            {/* Manual Save Button (PUT) */}
            <button
              onClick={handleManualSave}
              disabled={activeNote.isTemp || activeNote.isSaving}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold transition-all ${
                activeNote.isTemp || activeNote.isSaving
                  ? 'bg-white/5 text-cosmos-text-muted cursor-not-allowed border border-white/10'
                  : saveStatus === 'saved'
                  ? 'bg-emerald-500 text-black shadow-lg'
                  : 'bg-cosmos-lime text-black hover:bg-cosmos-lime-bright shadow-lime-glow'
              }`}
            >
              {saveStatus === 'saving' || activeNote.isSaving ? (
                <>
                  <Icons.RotateCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : saveStatus === 'saved' ? (
                <>
                  <Icons.Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Icons.Cloud className="w-3.5 h-3.5" />
                  <span>Save to Cloud</span>
                </>
              )}
            </button>
          </div>

          <input
            type="text"
            value={activeNote.title}
            onChange={(e) => updateNoteLocal(activeNote.id, e.target.value, activeNote.content)}
            placeholder="Note Title"
            className="bg-transparent text-xl font-display font-bold text-white focus:outline-none mb-4 border-b border-white/10 pb-2 placeholder:text-cosmos-text-muted"
          />
          <textarea
            value={activeNote.content}
            onChange={(e) => updateNoteLocal(activeNote.id, activeNote.title, e.target.value)}
            placeholder="Write your note content here..."
            className="flex-1 bg-transparent font-mono text-xs text-cosmos-text-primary focus:outline-none resize-none leading-relaxed placeholder:text-cosmos-text-muted"
          />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-xs font-mono text-cosmos-text-muted">
          No note selected. Click + New to create one.
        </div>
      )}
    </div>
  );
};

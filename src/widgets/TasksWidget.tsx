import React, { useState } from 'react';
import * as Icons from 'lucide-react';

interface TaskItem {
  id: string;
  text: string;
  completed: boolean;
}

export const TasksWidget: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: 't-1', text: 'Optimize Kernel Memory', completed: true },
    { id: 't-2', text: 'Verify 3D Fiber Renderer', completed: true },
    { id: 't-3', text: 'Review System Diagnostics', completed: false },
    { id: 't-4', text: 'Backup Security Protocol Keys', completed: false },
  ]);
  const [newTaskText, setNewTaskText] = useState('');

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: `t-${Date.now()}`, text: newTaskText.trim(), completed: false },
    ]);
    setNewTaskText('');
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col gap-2 w-60 font-mono text-xs select-none"
    >
      {/* Header */}
      <div className="flex justify-between items-center text-[10px] text-cosmos-text-muted border-b border-white/10 pb-1">
        <div className="flex items-center gap-1.5 font-bold text-cosmos-lime-bright">
          <Icons.Check className="w-3.5 h-3.5 text-cosmos-lime" />
          <span>CYBER TASKS</span>
        </div>
        <span className="text-[9px] font-mono text-cyan-400">
          {tasks.filter((t) => t.completed).length}/{tasks.length} DONE
        </span>
      </div>

      {/* Task List Container */}
      <div className="flex flex-col gap-1.5 max-h-36 overflow-y-auto pr-1 scrollbar-thin">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`flex items-center justify-between p-1.5 rounded border transition-all cursor-pointer text-[11px] ${
              task.completed
                ? 'bg-black/40 border-white/5 text-cosmos-text-muted line-through'
                : 'bg-black/70 border-white/10 text-white hover:border-cosmos-lime/40'
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              <span
                className={`w-3.5 h-3.5 rounded border flex items-center justify-center text-[9px] font-bold ${
                  task.completed
                    ? 'bg-cosmos-lime text-black border-cosmos-lime'
                    : 'border-white/30 bg-black/50'
                }`}
              >
                {task.completed && '✓'}
              </span>
              <span className="truncate">{task.text}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteTask(task.id);
              }}
              className="text-white/30 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Icons.Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Input Field for New Task */}
      <form onSubmit={addTask} className="flex gap-1 border-t border-white/10 pt-1.5">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="+ Add cyber task..."
          className="flex-1 bg-black/80 border border-white/15 rounded px-2 py-1 text-[10px] text-white focus:outline-none focus:border-cosmos-lime"
        />
        <button
          type="submit"
          className="px-2 py-1 bg-cosmos-lime text-black font-bold text-[10px] rounded hover:bg-cosmos-lime-bright transition-colors"
        >
          Add
        </button>
      </form>
    </div>
  );
};

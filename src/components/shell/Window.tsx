import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { WindowState } from '../../types';
import { useWindowStore } from '../../stores/windowStore';
import { AppHost } from '../apps/AppHost';
import { GlassPanel } from '../primitives/GlassPanel';

interface WindowProps {
  windowState: WindowState;
  isActive: boolean;
}

export const Window: React.FC<WindowProps> = ({ windowState, isActive }) => {
  const { bringToFront, closeWindow, minimizeWindow, maximizeWindow, updatePosition, updateSize } =
    useWindowStore();

  const isDragging = useRef(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const initialWindowPos = useRef({ x: 0, y: 0 });

  const isResizing = useRef(false);
  const resizeDirection = useRef<string | null>(null);
  const initialWindowSize = useRef({ width: 0, height: 0 });

  const [snapPreview, setSnapPreview] = useState<'left' | 'right' | null>(null);

  // Handle Title Bar Mouse Down (Dragging)
  const handleTitleMouseDown = (e: React.MouseEvent) => {
    if (windowState.state === 'maximized') return;
    bringToFront(windowState.id);
    isDragging.current = true;
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    initialWindowPos.current = { ...windowState.position };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Handle Resize Handle Mouse Down
  const handleResizeMouseDown = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    if (windowState.state === 'maximized') return;
    bringToFront(windowState.id);
    isResizing.current = true;
    resizeDirection.current = direction;
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    initialWindowPos.current = { ...windowState.position };
    initialWindowSize.current = { ...windowState.size };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging.current) {
      const dx = e.clientX - dragStartPos.current.x;
      const dy = e.clientY - dragStartPos.current.y;
      const newX = Math.max(0, Math.min(window.innerWidth - 100, initialWindowPos.current.x + dx));
      const newY = Math.max(32, Math.min(window.innerHeight - 100, initialWindowPos.current.y + dy));

      updatePosition(windowState.id, { x: newX, y: newY });

      // Snapping detection near viewport edges (25px)
      if (e.clientX <= 25) {
        setSnapPreview('left');
      } else if (e.clientX >= window.innerWidth - 25) {
        setSnapPreview('right');
      } else {
        setSnapPreview(null);
      }
    } else if (isResizing.current && resizeDirection.current) {
      const dx = e.clientX - dragStartPos.current.x;
      const dy = e.clientY - dragStartPos.current.y;
      let newW = initialWindowSize.current.width;
      let newH = initialWindowSize.current.height;
      let newX = initialWindowPos.current.x;
      let newY = initialWindowPos.current.y;

      const dir = resizeDirection.current;
      if (dir.includes('e')) newW = Math.max(320, initialWindowSize.current.width + dx);
      if (dir.includes('s')) newH = Math.max(240, initialWindowSize.current.height + dy);
      if (dir.includes('w')) {
        const potentialW = initialWindowSize.current.width - dx;
        if (potentialW >= 320) {
          newW = potentialW;
          newX = initialWindowPos.current.x + dx;
        }
      }
      if (dir.includes('n')) {
        const potentialH = initialWindowSize.current.height - dy;
        if (potentialH >= 240) {
          newH = potentialH;
          newY = initialWindowPos.current.y + dy;
        }
      }

      updateSize(windowState.id, { width: newW, height: newH });
      updatePosition(windowState.id, { x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    if (isDragging.current) {
      if (snapPreview === 'left') {
        updatePosition(windowState.id, { x: 0, y: 32 });
        updateSize(windowState.id, { width: Math.floor(window.innerWidth / 2), height: window.innerHeight - 100 });
      } else if (snapPreview === 'right') {
        updatePosition(windowState.id, {
          x: Math.floor(window.innerWidth / 2),
          y: 32,
        });
        updateSize(windowState.id, { width: Math.floor(window.innerWidth / 2), height: window.innerHeight - 100 });
      }
    }

    isDragging.current = false;
    isResizing.current = false;
    resizeDirection.current = null;
    setSnapPreview(null);

    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (windowState.state === 'minimized') return null;

  // Resolve Lucide Icon
  const AppIcon = (Icons as unknown as Record<string, React.FC<{ className?: string }>>)[windowState.icon] || Icons.AppWindow;

  const isMaximized = windowState.state === 'maximized';

  const windowStyle = isMaximized
    ? { top: 32, left: 0, width: '100vw', height: 'calc(100vh - 96px)' }
    : {
        top: windowState.position.y,
        left: windowState.position.x,
        width: windowState.size.width,
        height: windowState.size.height,
      };

  return (
    <>
      {/* Snap Preview Highlight Overlay */}
      {snapPreview && (
        <div
          className={`fixed top-8 bottom-16 z-30 bg-cosmos-lime/10 border-2 border-dashed border-cosmos-lime/60 backdrop-blur-sm transition-all pointer-events-none ${
            snapPreview === 'left' ? 'left-0 w-1/2' : 'right-0 w-1/2'
          }`}
        />
      )}

      {/* Window Element */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.18 }}
        style={{ ...windowStyle, zIndex: windowState.zIndex }}
        onMouseDown={() => bringToFront(windowState.id)}
        className="fixed flex flex-col rounded-xl overflow-hidden shadow-2xl transition-shadow select-none"
      >
        <GlassPanel
          variant="window"
          active={isActive}
          className="flex flex-col h-full w-full overflow-hidden"
        >
          {/* Title Bar */}
          <div
            onMouseDown={handleTitleMouseDown}
            className={`h-9 px-3 flex items-center justify-between border-b cursor-grab active:cursor-grabbing transition-colors ${
              isActive
                ? 'bg-cosmos-surface-container-high/80 border-white/20'
                : 'bg-cosmos-surface-container/50 border-white/10'
            }`}
          >
            {/* Left App Icon & Title */}
            <div className="flex items-center gap-2">
              <AppIcon className={`w-4 h-4 ${isActive ? 'text-cosmos-lime-bright' : 'text-cosmos-text-muted'}`} />
              <span className="text-xs font-mono font-semibold text-white truncate max-w-[200px]">
                {windowState.title}
              </span>
            </div>

            {/* Window Controls (Mac OS style traffic light buttons) */}
            <div className="flex items-center gap-1.5" onMouseDown={(e) => e.stopPropagation()}>
              <button
                onClick={() => minimizeWindow(windowState.id)}
                className="w-3.5 h-3.5 rounded-full bg-amber-500/80 hover:bg-amber-400 flex items-center justify-center text-black transition-colors group"
                title="Minimize"
              >
                <Icons.Minus className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100" />
              </button>
              <button
                onClick={() => maximizeWindow(windowState.id)}
                className="w-3.5 h-3.5 rounded-full bg-emerald-500/80 hover:bg-emerald-400 flex items-center justify-center text-black transition-colors group"
                title="Maximize / Restore"
              >
                <Icons.Maximize2 className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100" />
              </button>
              <button
                onClick={() => closeWindow(windowState.id)}
                className="w-3.5 h-3.5 rounded-full bg-rose-500/80 hover:bg-rose-400 flex items-center justify-center text-black transition-colors group"
                title="Close"
              >
                <Icons.X className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100" />
              </button>
            </div>
          </div>

          {/* Window Body Container */}
          <div className="flex-1 relative overflow-hidden bg-cosmos-bg/95">
            <AppHost appId={windowState.appId} />
          </div>

          {/* 8 Resize Handles */}
          {!isMaximized && (
            <>
              <div
                onMouseDown={(e) => handleResizeMouseDown(e, 'n')}
                className="absolute top-0 left-2 right-2 h-1 cursor-ns-resize"
              />
              <div
                onMouseDown={(e) => handleResizeMouseDown(e, 's')}
                className="absolute bottom-0 left-2 right-2 h-1 cursor-ns-resize"
              />
              <div
                onMouseDown={(e) => handleResizeMouseDown(e, 'w')}
                className="absolute left-0 top-2 bottom-2 w-1 cursor-ew-resize"
              />
              <div
                onMouseDown={(e) => handleResizeMouseDown(e, 'e')}
                className="absolute right-0 top-2 bottom-2 w-1 cursor-ew-resize"
              />
              <div
                onMouseDown={(e) => handleResizeMouseDown(e, 'nw')}
                className="absolute top-0 left-0 w-3 h-3 cursor-nwse-resize"
              />
              <div
                onMouseDown={(e) => handleResizeMouseDown(e, 'ne')}
                className="absolute top-0 right-0 w-3 h-3 cursor-nesw-resize"
              />
              <div
                onMouseDown={(e) => handleResizeMouseDown(e, 'sw')}
                className="absolute bottom-0 left-0 w-3 h-3 cursor-nesw-resize"
              />
              <div
                onMouseDown={(e) => handleResizeMouseDown(e, 'se')}
                className="absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize"
              />
            </>
          )}
        </GlassPanel>
      </motion.div>
    </>
  );
};

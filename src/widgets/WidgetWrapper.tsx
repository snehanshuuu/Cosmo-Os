import React, { useRef } from 'react';
import { GlassPanel } from '../components/primitives/GlassPanel';
import { WindowPosition } from '../types';

interface WidgetWrapperProps {
  id: string;
  position: WindowPosition;
  onUpdatePosition: (id: string, pos: WindowPosition) => void;
  children: React.ReactNode;
  className?: string;
}

export const WidgetWrapper: React.FC<WidgetWrapperProps> = ({
  id,
  position,
  onUpdatePosition,
  children,
  className = '',
}) => {
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const initialPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    initialPos.current = { ...position };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    const newX = Math.max(0, Math.min(window.innerWidth - 100, initialPos.current.x + dx));
    const newY = Math.max(32, Math.min(window.innerHeight - 100, initialPos.current.y + dy));

    onUpdatePosition(id, { x: newX, y: newY });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      style={{ top: position.y, left: position.x }}
      className={`fixed z-15 pointer-events-auto cursor-grab active:cursor-grabbing select-none ${className}`}
      onMouseDown={handleMouseDown}
    >
      <GlassPanel variant="card" className="p-3 shadow-glass border border-white/10 hover:border-white/20 transition-colors">
        {children}
      </GlassPanel>
    </div>
  );
};

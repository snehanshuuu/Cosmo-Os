import React, { useRef } from 'react';
import { GlassPanel } from '../components/primitives/GlassPanel';
import { WindowPosition } from '../types';
import * as Icons from 'lucide-react';

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
    // Only trigger drag on main mouse click and not inside form elements
    const targetTag = (e.target as HTMLElement).tagName.toLowerCase();
    if (targetTag === 'input' || targetTag === 'button' || targetTag === 'textarea' || targetTag === 'select') {
      return;
    }

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
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        boxSizing: 'border-box',
        width: 'fit-content',
        height: 'fit-content',
      }}
      className={`z-15 pointer-events-auto cursor-grab active:cursor-grabbing select-none group ${className}`}
      onMouseDown={handleMouseDown}
    >
      <GlassPanel
        variant="card"
        style={{
          boxSizing: 'border-box',
          width: 'fit-content',
          height: 'fit-content',
        }}
        className="p-3.5 shadow-glass border border-white/10 hover:border-white/20 transition-colors relative"
      >
        {/* Subtle Grip Drag Handle Icon (:::) */}
        <div className="absolute top-2.5 right-2.5 text-white/25 group-hover:text-cosmos-lime-bright transition-colors cursor-grab active:cursor-grabbing pointer-events-none">
          <Icons.GripVertical className="w-3.5 h-3.5" />
        </div>
        {children}
      </GlassPanel>
    </div>
  );
};

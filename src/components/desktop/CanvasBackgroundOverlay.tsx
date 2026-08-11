import React, { useRef, useEffect } from 'react';

export const CanvasBackgroundOverlay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const targetPos = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      // Smooth cursor position interpolation
      mousePos.current.x += (targetPos.current.x - mousePos.current.x) * 0.1;
      mousePos.current.y += (targetPos.current.y - mousePos.current.y) * 0.1;

      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // 1. Render faint, low-opacity glowing line matrix grid pattern
      const gridSize = 48;
      ctx.strokeStyle = 'rgba(170, 214, 34, 0.04)';
      ctx.lineWidth = 1;

      ctx.beginPath();
      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 2. Cursor tracking ambient glowing light effect
      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      if (mx >= 0 && my >= 0) {
        // Primary Ambient Radial Glow
        const ambientGlow = ctx.createRadialGradient(mx, my, 0, mx, my, 280);
        ambientGlow.addColorStop(0, 'rgba(170, 214, 34, 0.12)');
        ambientGlow.addColorStop(0.5, 'rgba(0, 240, 255, 0.06)');
        ambientGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = ambientGlow;
        ctx.beginPath();
        ctx.arc(mx, my, 280, 0, Math.PI * 2);
        ctx.fill();

        // Highlight grid lines near mouse cursor
        ctx.strokeStyle = 'rgba(198, 243, 65, 0.15)';
        ctx.lineWidth = 1.2;
        const startX = Math.max(0, Math.floor((mx - 300) / gridSize) * gridSize);
        const endX = Math.min(width, Math.ceil((mx + 300) / gridSize) * gridSize);
        const startY = Math.max(0, Math.floor((my - 300) / gridSize) * gridSize);
        const endY = Math.min(height, Math.ceil((my + 300) / gridSize) * gridSize);

        ctx.beginPath();
        for (let x = startX; x <= endX; x += gridSize) {
          ctx.moveTo(x, startY);
          ctx.lineTo(x, endY);
        }
        for (let y = startY; y <= endY; y += gridSize) {
          ctx.moveTo(startX, y);
          ctx.lineTo(endX, y);
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
};

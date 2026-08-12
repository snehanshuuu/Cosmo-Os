import React from 'react';

export const ScanlineOverlay: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0, // Above BackgroundCanvas (-1), below WidgetLayer (z-10+)
        pointerEvents: 'none',
      }}
      className="overflow-hidden select-none pointer-events-none"
    >
      {/* CRT Scanline Pattern with Slow Vertical Drift & Subtle Irregular Flicker */}
      <div
        className="w-full h-full pointer-events-none"
        style={{
          background:
            'repeating-linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 0px, rgba(255, 255, 255, 0.035) 1px, transparent 1px, transparent 3px)',
          animation: 'scanlineDrift 10s linear infinite, crtFlicker 5s ease-in-out infinite',
        }}
      />

      <style>{`
        @keyframes scanlineDrift {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 100px;
          }
        }

        @keyframes crtFlicker {
          0%, 100% {
            opacity: 0.96;
          }
          30% {
            opacity: 0.90;
          }
          65% {
            opacity: 0.98;
          }
          85% {
            opacity: 0.88;
          }
        }
      `}</style>
    </div>
  );
};

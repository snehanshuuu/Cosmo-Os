import React, { useState } from 'react';
import { useNotificationStore } from '../stores/notificationStore';

export const CyberCat: React.FC = () => {
  const { push: pushNotification } = useNotificationStore();
  const [isPurring, setIsPurring] = useState(false);

  const handleCatClick = () => {
    setIsPurring(true);
    pushNotification({
      title: 'CyberCat',
      message: 'Meow! 🐱 Systems nominal. Purring at 120Hz.',
      type: 'info',
      duration: 2500,
    });
    setTimeout(() => setIsPurring(false), 1000);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '80px',
        left: '40px',
        zIndex: 30,
      }}
      className="pointer-events-auto cursor-pointer group select-none"
      onClick={handleCatClick}
    >
      {/* Tooltip on Hover */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/80 border border-cosmos-lime/40 text-[10px] font-mono text-cosmos-lime-bright whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none">
        CyberCat :: Online 🐱
      </div>

      {/* Gentle Floating & Pulsing Pixel Cat Sprite Container */}
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Ambient Neon Glow Shadow */}
        <div className="absolute inset-0 bg-cosmos-lime/20 rounded-full blur-md animate-pulse pointer-events-none" />

        {/* Pixel Cat Image Sprite (64x64px) with Gentle Float Animation */}
        <img
          src="/assets/pixel-cat.png"
          alt="CyberCat"
          className={`w-16 h-16 object-contain image-rendering-pixelated transition-transform duration-300 ${
            isPurring
              ? 'scale-125 rotate-6'
              : 'animate-[bounce_3s_ease-in-out_infinite] group-hover:scale-110'
          }`}
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
    </div>
  );
};

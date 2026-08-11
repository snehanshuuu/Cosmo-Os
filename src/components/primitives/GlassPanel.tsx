import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: 'default' | 'card' | 'dock' | 'window' | 'modal' | 'container';
  active?: boolean;
  hoverEffect?: boolean;
  glow?: boolean;
  className?: string;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  variant = 'default',
  active = false,
  hoverEffect = false,
  glow = false,
  className,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-cosmos-surface/70 backdrop-blur-glass rounded-lg border border-white/10 glass-border',
    card: 'bg-cosmos-container-low/80 backdrop-blur-glass rounded-lg border border-white/10 glass-border',
    dock: 'bg-cosmos-surface-bright/40 backdrop-blur-heavy rounded-full border border-white/20 shadow-glass',
    window: 'bg-cosmos-surface/85 backdrop-blur-glass rounded-xl border border-white/15 shadow-2xl glass-border',
    modal: 'bg-cosmos-container-high/90 backdrop-blur-heavy rounded-xl border border-white/20 shadow-glass',
    container: 'bg-cosmos-container/60 backdrop-blur-sm rounded-md border border-white/5',
  };

  const activeStyles = active
    ? 'border-cosmos-lime-lime/60 shadow-lime-glow glass-border-active'
    : '';

  const hoverStyles = hoverEffect
    ? 'transition-all duration-200 hover:border-white/25 hover:shadow-lg glass-border-interactive'
    : '';

  const glowStyles = glow ? 'shadow-lime-glow' : '';

  return (
    <div
      className={twMerge(
        clsx(
          variantStyles[variant],
          activeStyles,
          hoverStyles,
          glowStyles,
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};

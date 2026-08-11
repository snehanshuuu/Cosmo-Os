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
  style?: React.CSSProperties;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  variant = 'default',
  active = false,
  hoverEffect = false,
  glow = false,
  className,
  style,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-cosmos-surface/70 backdrop-blur-glass rounded-lg border border-white/10 glass-border',
    card: 'glass-widget-card rounded-xl shadow-glass',
    dock: 'glass-dock-container rounded-full shadow-glass',
    window: 'bg-cosmos-surface/85 backdrop-blur-glass rounded-xl border border-white/15 shadow-2xl glass-border',
    modal: 'bg-cosmos-container-high/90 backdrop-blur-heavy rounded-xl border border-white/20 shadow-glass',
    container: 'bg-cosmos-container/60 backdrop-blur-sm rounded-md border border-white/5',
  };

  const activeStyles = active
    ? 'border-cosmos-lime/60 shadow-lime-glow glass-border-active'
    : '';

  const hoverStyles = hoverEffect
    ? 'transition-all duration-200 hover:border-white/25 hover:shadow-lg glass-border-interactive'
    : '';

  const glowStyles = glow ? 'shadow-lime-glow' : '';

  const customStyle: React.CSSProperties = {
    ...(variant === 'dock' || variant === 'card'
      ? {
          backgroundColor: 'rgba(18, 24, 20, 0.75)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }
      : {}),
    ...style,
  };

  return (
    <div
      style={customStyle}
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

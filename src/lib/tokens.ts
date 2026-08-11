// Cosmos OS Design Tokens (Design.md)

export const tokens = {
  colors: {
    bg: '#0D0E0F',
    surface: '#121314',
    surfaceDim: '#121314',
    surfaceBright: '#39393A',
    surfaceContainerLowest: '#0D0E0F',
    surfaceContainerLow: '#1B1C1D',
    surfaceContainer: '#1F2021',
    surfaceContainerHigh: '#292A2B',
    surfaceContainerHighest: '#343536',
    
    // Luminescent highlights
    primary: '#AAD622',
    primaryContainer: '#C6F341',
    primaryGlow: '#D1FF4D',
    onPrimary: '#283500',
    
    // Neutrals
    onSurface: '#E3E2E3',
    onSurfaceVariant: '#C4C9AF',
    outline: '#8E937B',
    outlineVariant: '#444935',
    
    // Glass borders
    glassBorder: 'rgba(255, 255, 255, 0.1)',
    glassBorderHighlight: 'rgba(255, 255, 255, 0.25)',
    glassLimeBorder: 'rgba(170, 214, 34, 0.4)',
    
    // Semantic
    warning: '#FF9F0A',
    error: '#FF453A',
    info: '#0A84FF',
  },
  typography: {
    display: 'Plus Jakarta Sans, sans-serif',
    body: 'Hanken Grotesk, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },
  blur: {
    glass: '20px',
    heavy: '40px',
    modal: '24px',
  },
  radii: {
    sm: '0.25rem', // 4px
    md: '0.5rem',  // 8px control radius
    lg: '1rem',    // 16px main UI panel radius
    xl: '1.5rem',  // 24px
    full: '9999px',
  },
  shadows: {
    glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    limeGlow: '0 0 20px rgba(170, 214, 34, 0.35)',
    limeGlowLg: '0 0 35px rgba(198, 243, 65, 0.45)',
  }
} as const;

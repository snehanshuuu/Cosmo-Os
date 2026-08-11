---
name: Cosmo OS Narrative
colors:
  surface: '#121314'
  surface-dim: '#121314'
  surface-bright: '#39393a'
  surface-container-lowest: '#0d0e0f'
  surface-container-low: '#1b1c1d'
  surface-container: '#1f2021'
  surface-container-high: '#292a2b'
  surface-container-highest: '#343536'
  on-surface: '#e3e2e3'
  on-surface-variant: '#c4c9af'
  inverse-surface: '#e3e2e3'
  inverse-on-surface: '#303031'
  outline: '#8e937b'
  outline-variant: '#444935'
  surface-tint: '#aad622'
  primary: '#ffffff'
  on-primary: '#283500'
  primary-container: '#c6f341'
  on-primary-container: '#546d00'
  inverse-primary: '#4f6600'
  secondary: '#c5c7c8'
  on-secondary: '#2e3132'
  secondary-container: '#444748'
  on-secondary-container: '#b3b5b6'
  tertiary: '#ffffff'
  on-tertiary: '#2e3132'
  tertiary-container: '#e1e3e4'
  on-tertiary-container: '#626566'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c6f341'
  primary-fixed-dim: '#aad622'
  on-primary-fixed: '#161f00'
  on-primary-fixed-variant: '#3b4d00'
  secondary-fixed: '#e1e3e4'
  secondary-fixed-dim: '#c5c7c8'
  on-secondary-fixed: '#191c1d'
  on-secondary-fixed-variant: '#444748'
  tertiary-fixed: '#e1e3e4'
  tertiary-fixed-dim: '#c5c7c8'
  on-tertiary-fixed: '#191c1d'
  on-tertiary-fixed-variant: '#444748'
  background: '#121314'
  on-background: '#e3e2e3'
  surface-variant: '#343536'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 72px
    fontWeight: '800'
    lineHeight: 80px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  title-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style

The design system establishes a high-performance, futuristic interface that balances industrial utility with advanced digital aesthetics. It is designed to evoke a sense of precision, intelligence, and cutting-edge capability, making it ideal for advanced operating systems or complex technical platforms.

The visual direction is a fusion of **Glassmorphism** and **Corporate Modernism** with a "cyber-industrial" twist. Key characteristics include:
- **Depth through Transparency:** Using frosted glass effects to imply a multi-layered digital environment.
- **Luminescent Highlights:** Utilizing vibrant lime-green accents as "energy sources" for interaction and status indicators.
- **Technical Precision:** Clean, geometric layouts that prioritize information density without sacrificing clarity.
- **Immersive Environment:** A dark-mode first approach that treats the screen as a window into a vast, three-dimensional workspace.

## Colors

The palette is built on a "Deep Space" foundation to maximize contrast with interactive elements.

- **Primary (Electric Lime):** Reserved exclusively for primary actions, success states, and critical data highlights. It should feel "charged."
- **Neutrals:** A spectrum of obsidian and charcoal grays. 
    - `#0D0E0F` is the "void" (background).
    - `#1A1D1E` and `#2A2D2E` serve as surface layers for containers.
- **Glass Accents:** Pure white or lime green at 5-15% opacity for borders and reflections.
- **Semantic Colors:**
    - Warning: Bright Orange (#FF9F0A)
    - Error: Vivid Red (#FF453A)
    - Info: Cool Azure (#0A84FF)

## Typography

The typography strategy uses a hierarchy of three distinct fonts to delineate function:

1.  **Display & Headlines:** *Plus Jakarta Sans* provides a modern, geometric feel with high legibility. Large display type should use tight letter-spacing to feel "locked in."
2.  **Body & UI:** *Hanken Grotesk* offers a professional, neutral tone for all primary reading experiences and interface elements.
3.  **Technical Labels:** *JetBrains Mono* is used for metadata, small labels, and "system" data. It should often be presented in uppercase to reinforce the high-tech, terminal-inspired aesthetic.

## Layout & Spacing

The design system utilizes a **12-column fluid grid** for desktop and a **4-column grid** for mobile. 

- **The 8px Rhythm:** All spacing (padding, margins, gap) must be a multiple of 8px to ensure mathematical harmony.
- **Glass Panels:** Layout modules should be treated as individual floating panels with `backdrop-filter: blur(20px)`.
- **Information Density:** While the overall layout should feel spacious, content within panels should be dense and structured, mimicking a cockpit or dashboard interface.
- **Alignment:** Strict adherence to grid lines is required. Elements should feel "snapped" into place.

## Elevation & Depth

This design system eschews traditional soft shadows in favor of **Luminous Depth**:

1.  **Backdrop Blur:** Surfaces use a 12px to 40px blur to separate themselves from the background.
2.  **Inner Glows:** Instead of drop shadows, containers use a 1px inner stroke (top and left) at 20% white to simulate a light source from above.
3.  **Outer Neon Glow:** Active or "focused" elements receive a soft outer glow using the primary lime color at low opacity (e.g., `box-shadow: 0 0 20px rgba(209, 255, 77, 0.3)`).
4.  **Z-Axis Hierarchy:**
    - Level 0: Background (#0D0E0F)
    - Level 1: Standard Panels (Glass + Blur)
    - Level 2: Modals & Popovers (Increased blur + brighter border)

## Shapes

The shape language is "Constructed Roundedness." 

- **Primary Radius:** A consistent 16px (`rounded-lg`) is used for all main UI containers and cards to soften the technical aesthetic.
- **Control Radius:** Buttons and input fields use 8px (`rounded-md`) for a more precise, tactile feel.
- **Icon Enclosures:** Small circular badges or pill-shaped tags are used for status indicators.
- **3D Elements:** Abstract 3D shapes (glass or metallic spheres/blobs) should be used as background depth elements, never as interactive components.

## Components

- **Buttons:**
    - *Primary:* Solid Lime Green background, black text. High-contrast.
    - *Ghost:* 1px Lime Green border, transparent background, lime text. Glows on hover.
- **Inputs:** Dark background (#0D0E0F) with a subtle 1px border. On focus, the border turns Lime Green with a subtle outer glow. Label uses *JetBrains Mono*.
- **Cards:** Glassmorphic panels with a 1px border (#FFFFFF 10%). Headlines inside cards use *Plus Jakarta Sans*.
- **Chips/Badges:** Small, pill-shaped elements using *JetBrains Mono*. Success states use a lime green dot indicator.
- **Progress Bars:** Thin, high-contrast tracks. The "fill" should have a subtle horizontal gradient and a leading "glow" edge.
- **Lists:** Separated by 1px dashed or dotted lines to evoke a blueprint or technical drawing aesthetic.

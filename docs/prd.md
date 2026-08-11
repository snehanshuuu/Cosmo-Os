# Cosmos OS — PRD
> Frontend-only browser desktop OS. No backend. No auth. Mock data + LocalStorage only.

---

## Product Overview

Cosmos OS is a browser-based desktop OS shell with glassmorphism UI, floating window management, a bottom dock, desktop widgets, and a suite of built-in apps. Dark-first. Inspired by macOS, visionOS, Arc, Linear, Nothing OS.

---

## Core Features

- Multi-window manager (drag, resize, snap, z-index focus)
- Floating bottom dock with magnification + bounce
- Desktop with wallpaper, icons, right-click context menu
- Global search (Cmd/Ctrl+K)
- Desktop widgets (movable, not resizable unless noted)
- Built-in apps: File Explorer, Settings, Calculator, Notes, Gallery, Music Player, Browser (UI), Terminal (simulated)
- Notification system
- Quick Settings panel
- System tray: Clock, Battery, Network, Calendar popup
- LocalStorage persistence
- Sidebar inside File Explorer and Settings

---

## Desktop Architecture

### Desktop
- Full-viewport canvas; renders wallpaper, desktop icons, widgets, windows
- Click-to-deselect active element
- Right-click → `DesktopContextMenu`
- Manages `<WindowManager>` and `<WidgetLayer>`

### Window Manager
- Renders all open windows stacked by z-index
- State: `{ id, app, position, size, zIndex, state: open|minimized|maximized }`
- Drag: constrain within viewport, handle on title bar only
- Resize: 8 edge/corner handles
- Snap: drag to left/right viewport edge → 50% split
- Focus: clicking any window brings it to top (increment zIndex)
- Animations: spring open/close, scale+fade
- Active window: distinct title bar styling

### Dock
- Position: bottom-center, `fixed`, floating (glassmorphism pill)
- Magnification: scale icon on hover (neighbors scale proportionally)
- Bounce: launch animation via Framer Motion keyframes
- Active indicator: dot below icon for running apps
- Minimized apps: remain in dock, click to restore
- Tooltips: app name on hover
- Apps: File Explorer, Settings, Calculator, Notes, Gallery, Music Player, Browser, Terminal + Finder/Search shortcut

### Sidebar
- Used inside File Explorer and Settings only
- Collapsible sections, icon + label nav items
- Not a global OS sidebar

### Widgets
| Widget | Notes |
|--------|-------|
| Digital Clock | Live time, 12/24h toggle |
| Calendar | Current month view, highlight today |
| Weather | Mock data (city, temp, condition) |
| Notes | Editable, persisted to LocalStorage |
| System Stats | Mock CPU/RAM/Storage gauges |
| Music Player | Mock track, play/pause/prev/next |
| Quick Actions | Toggle WiFi, Bluetooth, DND, Dark Mode |

- All widgets: movable via drag, position persisted
- Not resizable (except Notes widget — optional)

### Notifications
- Top-right stack, auto-dismiss (4s default)
- Types: info, success, warning, error
- Actions: dismiss, action button (optional)
- `useNotificationStore` (Zustand)

### Search
- Global overlay (Cmd/Ctrl+K)
- Searches: apps, files (mock), settings
- Keyboard navigable (↑↓ Enter ESC)
- Fuzzy match

### Settings
- Sidebar nav: Appearance, Wallpaper, Dock, Widgets, About
- Appearance: dark/light toggle, accent color picker
- Wallpaper: preset grid + custom URL
- Dock: autohide toggle, size slider
- Persisted via LocalStorage

### File Explorer
- Sidebar: Favorites, Locations, Tags
- Main: grid/list view toggle, breadcrumb nav
- Mock filesystem tree (static JSON)
- Right-click context menu on files/folders
- No real file ops

---

## Components

### Shell
- `Desktop`
- `WindowManager`
- `Window` (title bar, body, resize handles, controls)
- `Dock`
- `DockIcon`
- `WidgetLayer`
- `Widget` (wrapper for all widgets)

### Overlays
- `GlobalSearch`
- `NotificationStack`
- `NotificationToast`
- `ContextMenu`
- `QuickSettings`
- `CalendarPopup`

### System Tray
- `SystemTray` (container)
- `ClockWidget` (tray)
- `BatteryIndicator`
- `NetworkIndicator`

### Apps (each is a self-contained component)
- `FileExplorer`
- `Settings`
- `Calculator`
- `Notes`
- `Gallery`
- `MusicPlayer`
- `Browser`
- `Terminal`

### Desktop Widgets
- `ClockWidget`
- `CalendarWidget`
- `WeatherWidget`
- `NotesWidget`
- `SystemStatsWidget`
- `MusicPlayerWidget`
- `QuickActionsWidget`

### Primitives
- `Button` (variants: ghost, solid, glass)
- `Input`
- `Slider`
- `Toggle`
- `Modal`
- `Tooltip`
- `ScrollArea`
- `Separator`
- `Badge`
- `GlassPanel` (base glass surface component)

---

<!-- ## Interactions

### Window
- **Drag**: `mousedown` on title bar → `mousemove` delta → update position; constrain to viewport
- **Resize**: 8 handles (`n, ne, e, se, s, sw, w, nw`); `mousedown` on handle → track delta → update `width`/`height`; enforce min size (320×240)
- **Snap**: drag within 20px of left/right edge → animate to 50% split; release elsewhere → free position
- **Maximize**: toggle full viewport; restore to previous `{ position, size }`
- **Minimize**: animate scale+fade out → keep in dock; dock click → restore
- **Close**: fade+scale out → remove from state
- **Focus**: `mousedown` on window → `bringToFront()` → increment zIndex above all others

### Dock
- **Hover magnification**: CSS/Framer scale; adjacent icons scale to ~1.3, hovered to ~1.5
- **Launch bounce**: keyframe `translateY` animation on icon click
- **Tooltip**: show after 500ms hover delay

### Global Search
- `Cmd/Ctrl+K` → open overlay
- Type → fuzzy filter apps + mock files + settings entries
- `↑↓` navigate, `Enter` launch/open, `ESC` close

### Context Menu
- `contextmenu` event on desktop / file / folder
- Position at cursor, constrain to viewport edges
- `ESC` or outside click → close

### Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| Cmd/Ctrl+K | Global Search |
| ESC | Close overlay / deselect |
| Cmd/Ctrl+W | Close focused window |
| Cmd/Ctrl+M | Minimize focused window |
| Cmd/Ctrl+` | Cycle windows |

### Focus Management
- Only one window receives keyboard focus at a time
- Tab order trapped inside focused window
- Overlays (search, modals) trap focus; restore on close

--- -->

## Technical Constraints

- **React 18** — concurrent features, `useTransition` for heavy renders
- **TypeScript** — strict mode; no `any`
- **Vite** — dev server + build
- **Tailwind CSS v3** — utility classes; extend config for design tokens
- **Zustand** — global state (windows, apps, widgets, notifications, settings)
- **Framer Motion** — all animations
- **React Router v6** — optional; only if multi-route needed
- **Lucide React** — icons only
- **LocalStorage** — persist: widget positions, wallpaper, settings, notes content
- No backend, no API calls, no auth

---

## State Shape (Zustand Stores)

```ts
// windowStore
windows: WindowState[]           // all open windows
bringToFront(id): void
openApp(appId): void
closeWindow(id): void
minimizeWindow(id): void
maximizeWindow(id): void
updatePosition(id, pos): void
updateSize(id, size): void

// settingsStore
wallpaper: string
accentColor: string
dockSize: number
dockAutohide: boolean
theme: 'dark' | 'light'
reducedMotion: boolean

// notificationStore
notifications: Notification[]
push(n: Notification): void
dismiss(id): void

// widgetStore
widgets: WidgetState[]           // id, type, position
updatePosition(id, pos): void

// appStore
installedApps: AppDefinition[]   // id, name, icon, component
```

---

## Accessibility

- All interactive elements keyboard accessible
- `role`, `aria-label` on windows, dock icons, context menus
- Focus trap in modals and overlays
- `prefers-reduced-motion` disables spring/bounce animations
- Sufficient color contrast on text (WCAG AA minimum)
- ESC always closes topmost overlay

---

## Performance

- Lazy-load each app component (`React.lazy` + `Suspense`)
- Virtualize file lists > 100 items
- Debounce search input (150ms)
- `will-change: transform` on draggable windows
- Memoize static dock/widget components (`React.memo`)
- Avoid re-renders outside active window tree (`zustand` selectors)

---

## Folder Structure

```
src/
├── apps/           # One folder per built-in app
├── components/     # Reusable shell components (Window, Dock, etc.)
├── widgets/        # Desktop widget components
├── stores/         # Zustand stores
├── hooks/          # Custom hooks (useDrag, useResize, useKeyboard)
├── lib/            # Utilities, mock data, localStorage helpers
├── styles/         # Global CSS, Tailwind config overrides
├── types/          # Shared TypeScript types
└── assets/         # Wallpapers, static icons
```

---

## Milestones

1. **App Shell** — Vite + TS + Tailwind + Zustand + Framer Motion setup; design tokens; GlassPanel primitive
2. **Desktop** — Wallpaper, desktop icons, right-click context menu, click-to-deselect
3. **Window Manager** — Open/close/minimize/maximize/restore, drag, resize, snap, z-index focus
4. **Dock** — Magnification, bounce, active indicators, minimize/restore, tooltips
5. **System Tray + Overlays** — Clock, Battery, Network, Calendar popup, Quick Settings, Notifications
6. **Global Search** — Cmd+K overlay, fuzzy search, keyboard nav
7. **Built-in Apps** — File Explorer, Settings, Calculator, Notes, Gallery, Music Player, Browser, Terminal
8. **Widgets** — All 7 widgets; drag to reposition; LocalStorage persistence
9. **Settings Integration** — Wallpaper, accent, dock prefs, theme; all wired to stores
10. **Polish** — Reduced motion, responsive degradation, performance pass, accessibility audit

---

## Acceptance Criteria

- [ ] All 8 apps open as draggable, resizable windows
- [ ] Windows maintain correct z-index focus order
- [ ] Dock magnification and bounce work correctly
- [ ] Minimized apps restore from dock
- [ ] Window snap to left/right halves
- [ ] Global search (Cmd+K) filters apps and mock content
- [ ] All 7 widgets render and are repositionable
- [ ] Widget + settings state persists across page refresh (LocalStorage)
- [ ] Notifications stack and auto-dismiss
- [ ] Right-click context menu on desktop and in File Explorer
- [ ] Settings changes reflect immediately (wallpaper, accent, dock size)
- [ ] Keyboard shortcuts: Cmd+K, ESC, Cmd+W, Cmd+M functional
- [ ] `prefers-reduced-motion` respected
- [ ] No TypeScript errors (`strict: true`)
- [ ] App lazy-loaded; no blocking renders on initial load
- [ ] Runs on Vite dev server without errors
- [ ] Tablet layout degrades gracefully (simplified window behavior)

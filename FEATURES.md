# Skissify - Feature Catalog

## Implemented Features

### Rendering Engine
- Canvas 2D renderer with seeded wobble algorithms (wobbleLine, wobbleCircle, wobbleArc)
- Smooth curve interpolation via quadratic bezier
- 14 element types: line, rect, circle, arc, arrow, text, dashed, dim, window, door-symbol, door-slide, stair, opening, column
- Per-element color and strokeWidth support
- Multi-harmonic wobble (not simple S-curve)

### Paper & Tools
- 4 paper types: cream, white, yellow (grid), blueprint (grid)
- 3 tool types: pencil (thin/faded), ballpoint (medium), ink (thick/opaque)
- Paper size presets: A4+, A4, A3+, 16:9
- Custom width/height input

### Controls
- Amplitude slider (wobble deviation)
- Waves slider (wobble frequency)
- Humanness slider (randomness/tremor)
- Redraw button (re-renders with same seed)
- Print button (opens PNG in new window)

### Canvas Interaction
- Click-to-select elements (hit detection for all element types)
- Shift+click multi-select
- **Drag-to-move selected elements** (all 14 types, zoom-corrected, 4px dead zone)
- **Dynamic cursor**: grab on hover over selected element, grabbing during drag
- Delete/Backspace to remove selected
- Escape to deselect
- Scroll-wheel zoom
- Alt/Ctrl+drag pan

### Demo Presets
- Napkin sketch (architecture diagram)
- Plan drawing (Swedish apartment floorplan)
- Blueprint (blue paper with white lines)
- Villa (larger house with multiple rooms)

### UI
- Dark theme (neutral-900/950)
- Left sidebar with controls
- Bottom JSON editor with live validation
- Preset tab bar
- Add Element grid (14 types)

## TODOs from Codebase (SKETCHAI_TODO.md)

### Bugs
- Pan not pixel-perfect (scaling factor issue)
- 10.6m dimension line renders inside house instead of outside
- Blueprint mode lacks proper board background
- UI elements overlap walls in some presets
- Drawing not centered on paper at initial render
- No randomness on preset reload (same seed every time)

### GUI & Branding
- Solarized theme (sand/gray-brown palette)
- Google Fonts: JetBrains Mono for code, Kalam for GUI text
- Top menu improvements

### Blueprint Preset
- Historical blueprint style (Prussian blue, white lines, Georgia serif)
- Title block (bottom-right table with metadata)
- North arrow + scale bar
- Double border frame

### Rendering Modes
- Hand-sketch mode (simple X for windows, thin walls, high humanness)
- Technical plan mode (double window lines, thick walls with fill, low humanness)
- Wall thickness as filled double lines

### New Features (Planned)
- Font settings per category (room labels, dimensions, furniture, title)
- Element rotation (scroll/R key/handle)
- Drag-in element panel with thumbnails by category

### Roadmap (Future Vision)
- Voice measurement input
- SketchUp / IFC import (flatten per floor)
- 3D view (Three.js extrusion)
- AI photo-to-manifest (Claude Vision)
- PDF / DWG export (for building permits)
- Real-scale snap + thick walls
- Agent-driven design (text-to-manifest)
- MCP Skill API (expose as MCP server)
- Layers (walls, furniture, electrical, plumbing, annotations)
- Shareable links & collaboration

## Recently Implemented (Engineering Agent)

- [x] **Drag-to-move selected elements** - all 14 element types, zoom-corrected scaling, 4px dead-zone, full undo/redo integration
- [x] **Dynamic cursor feedback** - grab on hover, grabbing during drag, crosshair elsewhere
- [x] **Build stability fix** - `next.config.ts` webpack `hashFunction='md4'` resolves WasmHash crash on Node.js v22 (`TypeError: Cannot read properties of undefined (reading 'length')`)
- [x] **Copy/Paste/Duplicate elements** - Ctrl+C copies selected elements to clipboard, Ctrl+V pastes with +20px offset (new copies auto-selected), Ctrl+D duplicates in one step; all shortcuts guarded against textarea/input focus
- [x] **Element rotation** - `R` key rotates selected elements 15° clockwise, `Shift+R` 15° counter-clockwise; rotation stored as `rotation` field in element JSON; canvas transform applied per-element at render time; selection box rotates with element and shows an amber dot indicator; undo/redo integrated; webpack md4 hashFunction fix re-applied (was accidentally dropped)
- [x] **Drag-to-move undo fix** - drag moves now properly commit to undo history when mouse is released (or leaves canvas); `commitDrag` wired via new `onDragEnd` prop on Canvas; Ctrl+Z after dragging now correctly reverses the move
- [x] **Keyboard shortcuts panel** - `?` button in toolbar (and `?` key shortcut) opens a modal listing all 15 keyboard shortcuts; works globally unless focus is in a text input; Escape closes it

## Suggested Features for Launch Readiness

### Authentication
- Email/password signup + login (NextAuth.js or Clerk)
- OAuth (Google, GitHub)
- User profile with saved sketches

### Persistence / Save & Load
- Save sketches to database (Postgres/Supabase)
- Local storage autosave
- Named sketch library per user
- Import/export JSON files
- Version history

### Sharing
- Public share links (read-only)
- Embed code for websites
- PNG/SVG export download button
- Copy JSON to clipboard

### Payments (Stripe)
- Free tier (3 saved sketches, watermark on export)
- Pro tier (unlimited sketches, no watermark, PDF export)
- Stripe Checkout integration

### API
- REST API for programmatic sketch creation
- POST /api/render with JSON manifest, returns PNG
- API key management
- Rate limiting

### Polish
- Undo/redo stack
- Element drag-to-move on canvas
- Element resize handles
- Copy/paste elements
- Keyboard shortcuts panel
- Responsive/mobile layout
- Loading states and error boundaries
- SEO meta tags and Open Graph images

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

- [x] **Element alignment tools** — When 2+ elements are selected, an "Align" row appears in the Selection panel with 6 buttons: **⬅ left**, **↔ center H**, **➡ right**, **⬆ top**, **↕ center V**, **⬇ bottom**. These snap all selected elements to the leftmost/rightmost/topmost/bottommost edge or to the group's horizontal/vertical center. When 3+ are selected, two additional **Distribute H** and **Distribute V** buttons appear, spreading elements at equal intervals between the outermost pair. `alignSelected()` in `useSketch.ts` handles all 8 modes with full undo/redo. Wired into both `/` and `/editor` pages, desktop sidebar and mobile bottom-sheet ControlPanel.

- [x] **Z-order controls + element locking** — Selection panel now shows a "Layer order" row with 4 buttons: **Back** (⬇⬇ send to bottom), **Down** (⬇ send backward one step), **Up** (⬆ bring forward one step), **Front** (⬆⬆ bring to top). Works for single and multi-select; fully undo-integrated. Also adds a **Lock element** toggle (🔓/🔒): locked elements show an orange dashed selection box with a small lock indicator, cannot be moved by drag, cannot be resized via handles, and are immune to Delete/Backspace. `locked?: boolean` added to `BaseElement` type. `reorderSelected()` and `toggleLockSelected()` in `useSketch.ts`. Both features wired into `/` and `/editor` pages, desktop + mobile ControlPanel.

- [x] **Render Style selector** — 3-button panel in the left sidebar (and mobile bottom-sheet): **Sketch** (✏️ default hand-drawn look, full amplitude + humanness), **Technical** (📐 caps amplitude ≤0.6 & humanness ≤0.15 for crisp precise lines; rect elements also draw an inset double-line to simulate thick architectural walls), **Blueprint** (🔵 caps amplitude ≤0.5 & humanness ≤0.1; auto-switches paper to blueprint blue). Applied to both canvas renderer and SVG export. Fully undoable. Active button shows blue ring highlight. Wired into both `/` and `/editor` pages, desktop and mobile.


- [x] **Per-element stroke width control** — When one or more elements are selected, a stroke width slider (0.5–8px, step 0.5) appears in the Selection section of the left sidebar. Changing the slider applies the new `strokeWidth` to all selected elements instantly. Fully undoable (Ctrl+Z). Wired into both `/` and `/editor` pages, including mobile bottom-sheet ControlPanel. Previously only changeable via raw JSON editor.

- [x] **Root page feature parity + undo history reset on preset load** — The main page (/) was missing several features that the /editor page had. Now fully wired: resize handles (onResizeElement/onResizeEnd), per-element color picker (selectedColor + onColorSelected), arrow-key nudge (1px / Shift=10px), Ctrl+A select-all, double-click inline text editing overlay (text, rect label, dim label), and canvasControlRef for programmatic auto-fit. Also: loadPreset in useSketch now resets the undo/redo history stack so Ctrl+Z after switching presets no longer teleports you back to the previous preset — a confusing UX bug. Both desktop and mobile ControlPanel/PresetTabs instances updated.

- [x] **Arrow-key nudge + Ctrl+A select all** — Arrow keys move selected element(s) by 1px; Shift+Arrow = 10px. Each nudge commits one undo entry. Ctrl+A selects all elements instantly. `nudgeSelected()` and `selectAll()` added to useSketch hook. Keyboard shortcuts panel updated to document both. Solves precision placement without needing to edit raw JSON coordinates.

- [x] **Per-element color picker in Selection panel** — When one or more elements are selected, the "Selection" section in the left sidebar shows 8 preset color swatches + a custom `<input type="color">`. Clicking any swatch or picking a custom color instantly applies it to every selected element's `color` property, replacing the need to edit raw JSON. Color change is fully undoable (Ctrl+Z). Swatch palette matches the global Ink Color section for consistency. Mobile bottom-sheet ControlPanel updated too.


- [x] **Ink Color Picker in Sidebar** — New "Ink Color" section in the left control panel with 8 preset swatches (black, blue, red, green, brown, gray, teal, purple) + native `<input type="color">` for custom colors. Active color highlighted with blue ring. Hex value shown as monospace label. Previously only changeable via raw JSON editor.

- [x] **Blueprint board inset fix** — Blueprint paper now renders with a 4px dark border (`#0d1f3a`) around the edge before filling the blue gradient, giving it the same "paper sitting on board" appearance as cream/white modes instead of a flat edge-to-edge blue fill.

- [x] **Zoom controls overlay + auto-fit** — −/% /+ button group in canvas bottom-right corner; live zoom readout (e.g. "87%"); clicking % resets/fits the view; canvas auto-fits on mount and on sketch resize so every sketch opens at a sensible zoom; keyboard shortcut `0` = fit view (added to shortcuts panel); drag-move element scaling bug fixed (was dividing by zoom twice); zoom range extended to [0.1×–8×].


- [x] **SVG export download** — "SVG" button in toolbar (sm+ visible); `Ctrl+Shift+E` keyboard shortcut; calls the fully-implemented `renderSketchToSVG()` renderer; smart filename: `skissify-<slug>.svg` when saved, timestamp-based otherwise; Blob URL triggers clean browser download without print dialog; keyboard shortcuts panel updated.

- [x] **Local-storage autosave** — sketch is automatically saved to `localStorage` after 1.5s of inactivity (and flushed immediately on tab close). On fresh editor open (no URL params), the last autosaved sketch is restored and a brief "Restored from autosave" toast is shown. A subtle "Saved ✓" indicator appears in the toolbar. Users no longer lose work on accidental refresh or tab close.


- [x] **PNG Download button** — "PNG" button in toolbar (Download icon, sm+ visible); `Ctrl+Shift+S` keyboard shortcut; smart filename: `skissify-<slug>.png` when saved, timestamp-based otherwise; no print dialog — direct browser download. Keyboard shortcuts panel updated.
- [x] **Build stability fix (stale cache)** — added `prebuild` script that clears `.next` before every build to prevent `TypeError: The "data" argument must be of type string or Buffer` crash caused by stale build artifacts on Node.js v22. Also added explicit `build:clean` script.

- [x] **Drag-to-move selected elements** - all 14 element types, zoom-corrected scaling, 4px dead-zone, full undo/redo integration
- [x] **Dynamic cursor feedback** - grab on hover, grabbing during drag, crosshair elsewhere
- [x] **Build stability fix** - `next.config.ts` webpack `hashFunction='md4'` resolves WasmHash crash on Node.js v22 (`TypeError: Cannot read properties of undefined (reading 'length')`)
- [x] **Copy/Paste/Duplicate elements** - Ctrl+C copies selected elements to clipboard, Ctrl+V pastes with +20px offset (new copies auto-selected), Ctrl+D duplicates in one step; all shortcuts guarded against textarea/input focus
- [x] **Element rotation** - `R` key rotates selected elements 15° clockwise, `Shift+R` 15° counter-clockwise; rotation stored as `rotation` field in element JSON; canvas transform applied per-element at render time; selection box rotates with element and shows an amber dot indicator; undo/redo integrated; webpack md4 hashFunction fix re-applied (was accidentally dropped)
- [x] **Drag-to-move undo fix** - drag moves now properly commit to undo history when mouse is released (or leaves canvas); `commitDrag` wired via new `onDragEnd` prop on Canvas; Ctrl+Z after dragging now correctly reverses the move
- [x] **Keyboard shortcuts panel** - `?` button in toolbar (and `?` key shortcut) opens a modal listing all 15 keyboard shortcuts; works globally unless focus is in a text input; Escape closes it

- [x] **Element resize handles** - Select any single element → drag-handles appear directly on canvas. Rect-like elements get 8 handles (corners + edge midpoints) with correct directional cursors (nwse-resize, n-resize, etc). Line/arrow/dashed/dim get 2 circular endpoint handles (p1/p2) to reposition either end. Circle gets 1 radius handle on the right edge. Handles hidden on rotated elements to avoid ambiguity. Live drag updates element without creating undo entries; single undo entry committed on mouseup. Minimum size enforced (4px). Fully integrated with undo/redo stack. New `onResizeElement` + `onResizeEnd` Canvas props; `resizeElement()` + `commitResize()` hooks in useSketch.

- [x] **JSON Import/Export + New Sketch** — "Import" button in toolbar loads a `.json` sketch file from disk (validates elements array, success/error toast); "JSON" button downloads current sketch as portable `.json` (Ctrl+Shift+J, smart filename); "New Sketch" button clears the canvas after a confirmation modal (sensible blank defaults). `importSketch()` and `newSketch()` hooks in `useSketch.ts`, both push undo history. Shortcuts panel updated.

- [x] **Inline text editing** — double-click any `text`, `rect`, or `dim` element on the canvas to edit its content directly. A centered overlay input appears with Save/Cancel buttons. Enter saves, Escape cancels. Fully integrated with undo/redo (one history entry per commit). No JSON editor required for simple label changes.

## Suggested Features for Launch Readiness

### Authentication
- Email/password signup + login (NextAuth.js or Clerk)
- OAuth (Google, GitHub)
- User profile with saved sketches

### Persistence / Save & Load
- Save sketches to database (Postgres/Supabase)
- [x] Local storage autosave
- Named sketch library per user
- Import/export JSON files
- Version history

### Sharing
- Public share links (read-only)
- Embed code for websites
- [x] PNG download button (Ctrl+Shift+S, smart filename)
- [x] SVG export download button (Ctrl+Shift+E, smart filename, uses full SVG renderer)
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

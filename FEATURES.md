# Skissify - Feature Catalog

## Implemented Features

### Rendering Engine
- Canvas 2D renderer with seeded wobble algorithms (wobbleLine, wobbleCircle, wobbleArc)
- Smooth curve interpolation via quadratic bezier
- 20 element types: line, rect, circle, arc, arrow, text, dashed, dim, window, door-symbol, door-slide, stair, opening, column, path, bed, sofa, dining-table, toilet, bathtub, sink
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

### Furniture & Fixtures (NEW — Cycle 62)
- **bed**: headboard divider, pillow circles (single/double via `pillows` prop), cover fold line
- **sofa**: backrest, two armrests, seat cushion center divider
- **dining-table**: table rectangle + oval chairs on all four sides (configurable `seats` per long side)
- **toilet**: tank rectangle + bowl ellipse + inner seat ring
- **bathtub**: outer frame + inner basin oval + faucet cross indicator
- **sink**: outer frame + basin oval + drain dot + T-shape faucet
All furniture elements use bounding box (x, y, w, h) and integrate with existing wobble rendering pipeline.

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

- [x] **Elements List panel fully wired — select + visibility toggle** - The Elements List panel in the left sidebar (showing all sketch elements in z-order with eye icons) was completely non-functional: clicking an element in the list had no effect on canvas selection, and clicking the 👁 eye icon to show/hide elements did nothing. Root cause: `toggleVisibility` exists in `useSketch` and `onToggleVisibility` prop exists in `ControlPanel`/`ElementsListPanel`, but neither `/page.tsx` nor `/editor/page.tsx` ever passed `elements`, `selectedElements`, `onSelectElement`, or `onToggleVisibility` to the ControlPanel. Fixed: added `handleSelectFromList` callback (single-click = exclusive select, Shift+click = toggle member) to both pages, and passed all 4 missing props to every ControlPanel instance (desktop + mobile on both `/` and `/editor`). Also added furniture/fixture element icons to `TYPE_ICONS` (🛏 bed, 🛋 sofa, 🪑 dining-table, 🚽 toilet, 🛁 bathtub, 🪣 sink) so furniture elements are identifiable in the list instead of showing "?". Build passes.



- [x] **Rotation drag handle wired (both pages)** — The rotation handle was fully implemented in Canvas.tsx — a gold amber circle rendered above every single-selected element with a connecting stem line, hit-testing, drag math (angle from pivot), and Shift-snap to 15° increments — but `onRotateElement` / `onRotateEnd` props were never passed from `page.tsx` or `editor/page.tsx`, making the handle visual-only. Fixed: wired `rotateElementSilent` (live angle updates during drag) and `commitRotate` (undo history entry on release) from `useSketch` into both Canvas instances. Cursor polish: hover over handle now shows `grab` (was `crosshair`), dragging shows `grabbing`. Added early-return for `isRotating.current` in `handleCursorHover` so cursor stays `grabbing` during the full drag. Shortcuts panel updated with "Drag ↻ handle" entry documenting the gesture + Shift=15° snap. Works on `/` and `/editor`, single-element selection only, respects locked elements.

- [x] **Smooth freehand path rendering (wobblePath + Catmull-Rom)** — Freehand `path` elements previously rendered segment-by-segment via `HL()`, which independently wobbled each segment endpoint, creating visible gaps and overlaps at every joint. Fixed by implementing `wobblePath()` in `wobble.ts`: a new function that takes all waypoints and generates a single continuous `Pt[]` stroke. It uses **Hermite spline interpolation** (Catmull-Rom tangents) to curve smoothly through all waypoints, and applies perpendicular wobble along each segment via a `sin(t·π)`-shaped envelope that tapers to zero at both ends — guaranteeing perfectly seamless joints. The unified stroke is passed to a single `doStroke()` call so all tool textures (ballpoint, pencil, ink, blueprint) apply consistently across the whole path. Canvas renderer (`renderer.ts`) and SVG exporter (`svg-renderer.ts`) both updated. Live drawing preview in `Canvas.tsx` upgraded from straight `lineTo` to quadratic bezier mid-point smoothing for a fluid drawing feel. Also added **Freehand** to the Add Element panel (`ElementThumbnailPanel.tsx`) — a squiggle thumbnail in the Lines category — so users can click-to-add or drag-to-place a freehand path element without having to enter draw mode first.



- [x] **Sketch preview thumbnails in dashboard** — Added `GET /api/sketches/[slug]/thumbnail` endpoint that server-renders each saved sketch to SVG using the existing `svg-renderer` and returns it as `image/svg+xml` with a 10-minute browser cache (`Cache-Control: public, max-age=600`). Public sketches are accessible without auth; private sketches require the owner session. Dashboard sketch cards now show a lazy-loaded `<img>` thumbnail instead of a pencil-icon placeholder, using `object-contain` CSS so any sketch aspect ratio (A4, A3, 16:9) fits cleanly in the 16:9 card area. Graceful `onError` fallback restores the pencil icon if rendering fails. Makes the dashboard fully visual — users can identify their sketches at a glance without opening them.




- [x] **Canvas Minimap + Elements panel z-order fix** — A live minimap thumbnail now appears in the bottom-left corner of the canvas area. It renders a scaled-down view of the full sketch using the same renderer, overlays a blue viewport indicator rectangle showing exactly what portion of the sketch is currently visible, and dims areas outside the viewport. Clicking anywhere on the minimap instantly pans the canvas to center on that point (panToElement callback). Automatically hidden when the sketch has no elements. Zoom level shown as a % label in the corner. Also fixed a longstanding bug in ElementsListPanel: the panel had a comment saying "render in reverse like Figma" but the code incorrectly used `idx = visualIdx` (forward order), so top-layer elements appeared at the *bottom* of the list. Fixed to `idx = elements.length - 1 - visualIdx` so the highest z-order element is at the top, matching Figma/Sketch layer panel conventions.



- [x] **Dim label + offset editing, text/rect content editing in sidebar** — When a `dim` element is selected, the sidebar Selection panel now shows: (1) an editable "Dimension label" text input to change the measurement label (e.g. "10.6 m" → "5.0 m") without touching raw JSON, and (2) an "Offset" field with a numeric input plus 5 quick-preset buttons (−30/−20/0/+20/+30) that shift the dim line perpendicularly from its baseline — essential for pulling dimension lines cleanly outside walls in floor plans. When a `text` element is selected, a "Text content" input appears so the label text can be changed directly. When a `rect` element is selected, an optional "Label" field is editable. All edits go through `updateElement()` → full undo/redo (Ctrl+Z). The offset feature resolves the longstanding "10.6 m dim line renders inside the house" issue by letting users push dimension lines to the correct side without editing raw JSON.



- [x] **Element grouping (group/ungroup)** — Select 2+ elements and press Ctrl+G to group them. Grouped elements share a `groupId` field — clicking any member auto-selects the entire group. Shift+click toggles the whole group in/out of the selection. Ctrl+Shift+G ungroups (removes `groupId` from selected elements). Group/Ungroup buttons appear in the Selection panel sidebar when 2+ elements are selected, and in the right-click context menu. Fully undo/redo integrated. `groupId?: string` added to `BaseElement` type (backward-compatible — omitting it has no effect). Works on both `/` and `/editor` pages, desktop sidebar and mobile bottom-sheet ControlPanel.

- [x] **Per-element font override for text and dim elements** — When any `text` or `dim` element is selected, a new "Element font" row appears in the Selection panel with 6 font buttons: Courier, Georgia, Arial, Caveat, Kalam, JetBrains Mono. Clicking a button sets the `fontFamily` field directly on the selected element(s), overriding the sketch-level text/dim font. A small "✕ clear" button removes the per-element override so the element falls back to the sketch default. Works for single and multi-select (all selected text/dim elements updated at once). Fully undo/redo integrated. Wired into both `/` and `/editor` pages, desktop sidebar and mobile bottom-sheet. The `fontFamily` field was already stored in element JSON and respected by the canvas renderer and SVG exporter — this feature adds the missing UI to set it without editing raw JSON.



- [x] **Smart alignment guides during drag** — When dragging selected elements, live red dashed guide lines appear on the canvas whenever a dragged element's edge or center aligns within 6px of any non-selected element's edge or center. Vertical guides (red vertical lines) fire on left edge / center / right edge matches; horizontal guides on top / center / bottom matches. Guides clear automatically on drop. Works across all 14 element types on both `/` and `/editor` pages. Implemented via `computeAlignmentGuides()` + `getElementSnapEdges()` helper functions; guides rendered directly on the canvas using the centering transform for perfect visual alignment. Uses solarized red (`#dc322f`) with 70% opacity, 4/4 dash pattern.


- [x] **Element fill color for rect and circle** — Select any `rect` or `circle` element and set a background fill color from the sidebar. New `fillColor?: string` field on `BaseElement` (fully backward-compatible — omitting it leaves the element transparent/stroke-only). Fill is rendered *behind* the hand-drawn wobble stroke for a natural layered look. 8 pastel preset swatches (warm beige, light green, sky blue, lavender, etc.) + a "no fill" button + a custom color picker. Blueprint paper auto-maps fill colors through `BLUEPRINT_COLOR_MAP` for correct light-on-blue rendering. SVG exports respect `fillColor` too — a `<rect fill=...>` / `<circle fill=...>` node is emitted before the wobble paths. Fully undo-integrated via new `fillColorSelected()` in `useSketch`. Wired into both `/` and `/editor` pages, desktop and mobile ControlPanel. Perfect for room fills in floor plans, node fills in diagrams, furniture highlights, etc.

- [x] **Centering transform alignment fix (hit-testing & selection)** — The renderer applies a centering transform (translate + optional scale-down) to position element content centered on the paper canvas. Previously, hit-testing (click, drag, box-select), selection highlight boxes, and resize handles all operated in raw element-space coordinates, causing visual misalignment: you had to click where elements *would be* without centering rather than where they *appear*. Fix: exported `computeCenterTransform()` from renderer.ts; `clientToCanvas()` in Canvas.tsx now applies the inverse transform so mouse → element-space conversion is always accurate; selection boxes and resize handles now draw with the centering transform applied; drag-to-move now divides by `zoom × centerScale` (was just `zoom`) so element tracking is 1:1 at all zoom levels; box-select corner coordinates routed through `clientToCanvas()` for correct multi-select. All 14 element types affected. Build passes.

- [x] **Drag-from-panel-to-canvas element placement** — Element thumbnails in the sidebar Add Element panel are now fully draggable. Drag any element type (line, rect, circle, arc, arrow, text, dashed, dim, window, door-symbol, door-slide, stair, opening, column) directly onto the canvas and drop it at the exact position you want. The element lands centered on the drop point and is immediately auto-selected so you can nudge or resize it right away. Uses the HTML5 Drag API with a custom MIME type (`text/x-skissify-element`) to avoid conflicts; the mini-canvas thumbnail is used as the drag ghost image. Canvas container responds to `dragover`/`drop`; drop coordinates are converted through `clientToCanvas()` to account for current zoom and pan. Click-to-add-at-center still works as before. `addElementAt(type, x, y)` added to `useSketch` hook. Wired in both `/` and `/editor` pages.

- [x] **Toolbar parity: Import JSON + New Sketch on main page + Copy JSON to clipboard** — The main `/` editor page was missing several Toolbar actions that the `/editor` page had. Now fully wired: `Import JSON` (load a `.json` sketch from disk), `New Sketch` (clear canvas with confirmation modal), and a new `Copy JSON` button (copies current sketch JSON to clipboard with a toast confirmation). Also fixed the `Ctrl+Shift+J` keyboard shortcut — it was listed in the shortcuts panel but the handler was never wired (stale closure bug); now correctly triggers JSON export. Toolbar keydown handler also closes open dialogs (Share, New Confirm) on Escape. Shortcuts panel updated: added `Double-click → Edit text/label inline`, reordered `Ctrl+A` near the copy/paste block for better logical flow.

- [x] **Google Fonts expansion + Caveat handwritten fix + SVG font fidelity** — Font system upgraded from 4 to 6 options: `handwritten` now correctly uses **Caveat** (Google Font, already loaded) instead of Segoe Print — dramatically better hand-drawn feel. Two new fonts added: **Kalam** (warm casual handwriting, great for room labels) and **JetBrains Mono** (crisp technical monospace, perfect for blueprint/technical drawings). Google Fonts `<link>` in `layout.tsx` extended to load all three. **SVG export** now fully respects `sketch.textFont` and `sketch.dimFont` settings — previously all SVG text was hardcoded to Courier New regardless of user's font choice. `svg-renderer.ts` now uses `resolveFontCssSvg()` and injects a `<defs><style>@import</style></defs>` block for any Google Fonts used, so exported `.svg` files render correctly when opened in a browser. `ControlPanel` auto-expands since it maps `FONT_OPTIONS` dynamically — 6 buttons, 3 rows of 2, no UI changes needed.

- [x] **Element alignment tools** — When 2+ elements are selected, an "Align" row appears in the Selection panel with 6 buttons: **⬅ left**, **↔ center H**, **➡ right**, **⬆ top**, **↕ center V**, **⬇ bottom**. These snap all selected elements to the leftmost/rightmost/topmost/bottommost edge or to the group's horizontal/vertical center. When 3+ are selected, two additional **Distribute H** and **Distribute V** buttons appear, spreading elements at equal intervals between the outermost pair. `alignSelected()` in `useSketch.ts` handles all 8 modes with full undo/redo. Wired into both `/` and `/editor` pages, desktop sidebar and mobile bottom-sheet ControlPanel.

- [x] **Z-order controls + element locking** — Selection panel now shows a "Layer order" row with 4 buttons: **Back** (⬇⬇ send to bottom), **Down** (⬇ send backward one step), **Up** (⬆ bring forward one step), **Front** (⬆⬆ bring to top). Works for single and multi-select; fully undo-integrated. Also adds a **Lock element** toggle (🔓/🔒): locked elements show an orange dashed selection box with a small lock indicator, cannot be moved by drag, cannot be resized via handles, and are immune to Delete/Backspace. `locked?: boolean` added to `BaseElement` type. `reorderSelected()` and `toggleLockSelected()` in `useSketch.ts`. Both features wired into `/` and `/editor` pages, desktop + mobile ControlPanel.

- [x] **Render Style selector** — 3-button panel in the left sidebar (and mobile bottom-sheet): **Sketch** (✏️ default hand-drawn look, full amplitude + humanness), **Technical** (📐 caps amplitude ≤0.6 & humanness ≤0.15 for crisp precise lines; rect elements also draw an inset double-line to simulate thick architectural walls), **Blueprint** (🔵 caps amplitude ≤0.5 & humanness ≤0.1; auto-switches paper to blueprint blue). Applied to both canvas renderer and SVG export. Fully undoable. Active button shows blue ring highlight. Wired into both `/` and `/editor` pages, desktop and mobile.


- [x] **SVG blueprint overlay + metadata UI** — SVG exports of blueprint-paper sketches now include the full title block (title, owner, date, scale, sheet #, drawn-by), double border frame, north arrow, and scale bar — matching the canvas renderer exactly. Blueprint preset ships with default metadata. New "Title Block" section in the ControlPanel sidebar (appears when paper = blueprint) lets users edit all metadata fields live; changes are fully undoable and persist in autosave/JSON export. Wired into both `/` and `/editor` pages, desktop and mobile.

- [x] **Right-click context menu** — Right-clicking on selected canvas elements opens a floating context menu with quick access to: Duplicate, Copy, Bring to Front, Send to Back, Align Left/Center H/Right (shown when 2+ elements selected), Lock/Unlock toggle, Edit text (single element), and Delete. Menu is solarized-themed, auto-positions to stay in viewport, and closes on click-outside/Escape/scroll. Wired in both `/` and `/editor` pages. New `ContextMenu.tsx` component with full TypeScript types. Zero keyboard-shortcut conflicts — context menu supplements rather than replaces existing shortcuts.

- [x] **Canvas rulers (horizontal + vertical)** — Professional rulers along the top and left edges of the canvas viewport. Rulers display element-space coordinates with adaptive tick intervals that scale with zoom level (automatically switches between 1px, 5px, 10px, 50px, 100px, etc. granularity). Features: HiDPI-aware canvas rendering, solarized theme matching the app, red triangle cursor marker that tracks mouse position in real-time, corner square where rulers meet, JetBrains Mono font for measurements. Rulers update live with zoom/pan/resize. Implemented as a separate `Rulers.tsx` component rendered inside the Canvas container. Both `/` and `/editor` pages get rulers automatically since they use the Canvas component.

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

- [x] **`/api/render` — Direct SVG render endpoint** — `POST /api/render` accepts a `SketchData` manifest and returns a hand-drawn SVG directly (`Content-Type: image/svg+xml`). No auth, no database, instant output. Also accepts `?format=json` (or `format` in body) to get `{ svg, width, height }` JSON. Accepts both `{ data: SketchData }` envelope and bare `SketchData` at top level for convenience. Shares the same rate limiter as other endpoints. Full CORS support for cross-origin agent use. `/api/manifest` updated to document the endpoint and its two response modes. `/for-agents` page updated: step 3 now shows the render endpoint with a curl example; save-and-share moved to step 4; both curl snippets shown side-by-side. Build passes — `/api/render` shows as a dynamic route.

- [x] **Single-touch tap-to-select and drag-to-move on mobile** — Mobile users can now tap any element to select it (12px tolerance, 400ms tap window) and drag a selected element with one finger to move it. Single-finger drag on empty canvas pans the view. Two-finger pinch/pan unchanged. Grid snap respected during touch drag. Undo committed on touch-end, same as mouse drag. Previously the entire Selection panel was unreachable on touchscreens — all 14 element types are now fully interactable via touch.

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

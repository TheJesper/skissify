# Handover: Uppsala Session — Skissify Rebuild

**Date:** 2026-03-27
**Session:** uppsala
**Agent:** skissify

## What Changed

### 1. Editor as Landing Page (`src/app/page.tsx`)
- Replaced entire marketing landing page with EditorContent (same as `/editor`)
- Added dismissable welcome toast: "Skissify — hand-drawn sketches from JSON. Try editing the JSON on the left or pick a preset above."
- Toast auto-dismisses after 8 seconds, has X button
- Kept Suspense wrapper with Solarized-themed loading spinner

### 2. Solarized Theme Overhaul
**Files modified:**
- `src/app/globals.css` — CSS variables for full Solarized palette, scrollbar/slider/selection colors
- `src/app/layout.tsx` — body bg set to base3 (#fdf6e3)
- `src/components/Toolbar.tsx` — base2 bg, base01 text, Solarized accent buttons
- `src/components/ControlPanel.tsx` — base2 bg, Solarized ring/border/text colors
- `src/components/PresetTabs.tsx` — base2 bg, blue active tab
- `src/components/JsonEditor.tsx` — base02 (#073642) dark textarea bg (like POC), Solarized status badges
- `src/components/Canvas.tsx` — base2 bg with base1 dot pattern, Solarized zoom controls
- `src/app/editor/page.tsx` — Solarized loading states, toast colors, mobile bottom sheet

### 3. Door Rendering Fix (`src/lib/renderer.ts`)
- Fixed `door-symbol` case: changed from 11 segments to 10 (matching POC)
- Fixed angle calculations for all cases:
  - Horizontal wall, right swing: `a = -(i/10)*PI/2`, point at `[x+w+cos(a)*w, y+sin(a)*w]`
  - Horizontal wall, left swing: `a = PI+(i/10)*PI/2`, point at `[x+cos(a)*w, y+sin(a)*w]`
  - Vertical wall: `a = -(i/10)*PI/2+PI/2`, point at `[x+sin(a)*w, y+w+cos(a)*w]`
- Previous code had reversed sweep direction and wrong segment count

### 4. Visual Testing
- Used Playwright to take screenshots on port 3007
- Verified: Solarized theme renders warm/unique, door arcs swing correctly
- Build passes (`next build` succeeds)

## What Doesn't Work Yet
- The `?preset=` URL parameter on `/` may be overridden by autosave data (same issue exists on `/editor`)
- Marketing landing page content is removed from `/` — if needed later, it should be moved to a separate route like `/marketing` or `/about`

## Next Steps
- Consider whether `/editor` route should redirect to `/` or remain as a duplicate
- May want to add the marketing content back on a different route (e.g., `/about`)
- SVG renderer (`svg-renderer.ts`) may need the same door-symbol fix if it has separate rendering logic

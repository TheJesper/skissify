# Skissify — Kommande fixar & features

## 🐛 Buggar att fixa

- [ ] **Pan exakt 1:1** — papperet skall följa musen pixel-perfekt vid drag, ingen skalningsfaktor
- [ ] **10.6m dimensionslinje** — hamnar fortfarande på höger sida inuti huset, skall vara utanför vänster vägg
- [ ] **Blueprint eternity board** — blå bakgrund nu, skall vara mörk board med papper ovanpå precis som cream-mode
- [ ] **UI-element överlappar** — möbler/etiketter sticker utanför väggar, t.ex. SOFFA/VARDAGSRUM/SOFFBORD i plan drawing. Koordinater behöver justeras per preset
- [ ] **Ritning ej centrerad på papperet** — elementen hamnar inte mitt på papperet, sitter mot övre vänster. `centerOf()` verkar inte appliceras korrekt vid initial render
- [ ] **Randomness vid laddning av preset** — varje gång ett preset laddas ska en ny slump-seed genereras så linjerna ser olika ut. Nu ser det exakt likadant ut varje gång man byter och kommer tillbaka

## 🎨 GUI & Branding

- [ ] **Produktnamn: Skissify** — byt ut "SketchPaper" överallt
- [ ] **Solarized tema** — ljust sand/gråbrunt, `base3:#fdf6e3` bakgrund, `base02:#073642` text, distinkta brand-färger
- [ ] **Google Fonts** — JetBrains Mono för kod/labels, Kalam eller liknande handstil för övrig GUI-text
- [ ] **Toppmeny** — logo/branding, demo-switcher, print-knapp, redraw, roadmap-knapp
- [ ] **Demo-switcher** — klickbar rad med alla presets synliga i topbar

## 📐 Blueprint-preset

- [ ] **Äkta historisk ritning** — Prussian blue paper, vita linjer, period-typsnitt (Georgia serif)
- [ ] **Title block** — tabellruta nere till höger med titel, ägare, datum, skala, arkivnr
- [ ] **Nordpil + skalstång** — ritas av renderer, ej i manifest
- [ ] **Dubbel border** — klassisk ritningsbård
- [ ] **Samma manifest som cream** — blueprint = render-preset som byter färger+overlay, ej ny syntax

## 🏠 Ritningsstilar (render modes)

- [ ] **Handskiss-mode** — enkla X för fönster, enkla streck, tunna väggar, hög humanness
- [ ] **Teknisk planritning-mode** — dubbla fönsterlinjer (nuvarande), tjocka väggar med fill, låg humanness
- [ ] **Wall thickness** — väggar som dubbla parallella linjer med fyllning (för teknisk mode)

## 🗂 Roadmap-modal (kommande features)

- [ ] **Voice measurement input** — gå runt, mät med röst/laser, agent transkriberar till manifest
- [ ] **SketchUp / IFC import** — flatten .skp/.ifc per våning till manifest
- [ ] **3D view (Three.js)** — extrude manifest → live Three.js scene, dela som URL
- [ ] **AI photo → manifest** — Claude Vision konverterar foto av handritad plan till JSON
- [ ] **PDF / DWG export** — skalad export för Bygglov-ansökan
- [ ] **Real-scale snap + thick walls** — snappa till meter, auto-dimensions
- [ ] **Agent-driven design** — beskriv i text, agent genererar manifest
- [ ] **MCP Skill API** — exponera Skissify som MCP-server, tool-calls: draw_element(), export_pdf()
- [ ] **Layers** — väggar, möbler, el, VVS, annotationer
- [ ] **Shareable links & collab** — spara till URL, multi-cursor

## ✨ Nya features att bygga

- [ ] **Font-inställning per kategori** — välj font för: rumsetiketter, dimensionssiffror, möbeletiketter, titel/caption. Dropdown per kategori i sidebaren. Stöd för Google Fonts (Courier New, Kalam, Georgia, JetBrains Mono m.fl.)
- [x] **Rotera element** — R = 15° medurs, Shift+R = 15° moturs; rotation lagras i `rotation`-fältet; canvas-transform per element vid rendering; selection-box roterar med elementet
- [ ] **Element-selector med drag-in** — panel med miniatyr-thumbnails grupperade per kategori (Väggar, Dörrar & Fönster, Möbler, Kök/Bad, Trappor, Text & Mått). Dra ett element från panelen till canvas → sätts in på rätt koordinat. Thumbnails renderas med Canvas 2D i miniatyr så de ser ut precis som i ritningen

### Drag-in element-kategorier (förslag)
- **Väggar** — line, dashed, opening
- **Dörrar & Fönster** — door-symbol, door-slide, window h/v
- **Möbler** — säng 90/120/140/160, soffa, fåtölj, matbord, skrivbord, bokhylla
- **Kök & Bad** — kök bänk, spis, diskho, wc, dusch, badkar
- **Trappor & Struktur** — stair, column, ramp
- **Mått & Text** — dim, text, arrow, title block

- [x] Scroll-zoom kring muspekaren
- [x] Multi-select (click, shift+click, box-select, shift+box)
- [x] Drag av element (alla typer)
- [x] Per-element color + textColor
- [x] Arkitekturelement: window, door-symbol, door-slide, stair, opening, column, dim
- [x] Multi-harmonisk wobble (ej enkel S-kurva)
- [x] Humanness-slider (tremor, pressure spike, ink glob, hesitation, overshoot)
- [x] Canvas-storlek + presets (A4, A3, 16:9)
- [x] Print-knapp
- [x] Roadmap (i)-modal
- [x] Eternity board (board background + dot grid)
- [x] Papper centrerat på board vid start

# Skissify JSON Schema Cookbook — 10 Copy-Paste Recipes for AI Agents

*The practical guide to generating hand-drawn sketches from structured JSON. Works with Claude, GPT-4, any LLM, or directly via REST API.*

---

Every Skissify sketch is a JSON manifest. You POST it, you get a hand-drawn SVG back. No account. No UI. No waiting.

Here are 10 recipes you can copy, modify, and run right now.

## How to use these recipes

```bash
curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d @your-recipe.json \
  -o sketch.svg
```

Or save it first, then render:

```bash
curl -X POST https://skissify.com/api/sketches \
  -H "Content-Type: application/json" \
  -d @your-recipe.json
# Returns: { "url": "https://skissify.com/s/abc123", ... }
```

---

## Recipe 1: Studio Apartment Floor Plan

A minimal one-room layout with kitchen, bedroom zone, and bathroom. Good starting point for any residential sketch.

```json
{
  "paper": "cream",
  "tool": "ballpoint",
  "width": 800,
  "height": 600,
  "amplitude": 2,
  "humanness": 0.4,
  "elements": [
    { "type": "rect", "id": "outer", "x": 50, "y": 50, "w": 700, "h": 500, "color": "#333" },
    { "type": "rect", "id": "bathroom", "x": 550, "y": 350, "w": 200, "h": 200, "color": "#333" },
    { "type": "door-symbol", "id": "d1", "x": 550, "y": 350, "w": 60, "h": 60 },
    { "type": "window", "id": "w1", "x": 100, "y": 50, "w": 120, "h": 12 },
    { "type": "window", "id": "w2", "x": 400, "y": 50, "w": 120, "h": 12 },
    { "type": "bed", "id": "bed1", "x": 80, "y": 80, "w": 180, "h": 120, "pillows": "double" },
    { "type": "sofa", "id": "sofa1", "x": 300, "y": 200, "w": 200, "h": 80 },
    { "type": "dining-table", "id": "dt1", "x": 300, "y": 380, "w": 160, "h": 100, "seats": 2 },
    { "type": "stove", "id": "stove1", "x": 100, "y": 400, "w": 80, "h": 80, "burners": 4 },
    { "type": "toilet", "id": "toilet1", "x": 570, "y": 380, "w": 60, "h": 80 },
    { "type": "sink", "id": "sink1", "x": 650, "y": 380, "w": 60, "h": 60 },
    { "type": "text", "id": "label-bed", "x": 170, "y": 145, "text": "BEDROOM", "fontSize": 14 },
    { "type": "text", "id": "label-living", "x": 380, "y": 160, "text": "LIVING", "fontSize": 14 },
    { "type": "text", "id": "label-kitchen", "x": 120, "y": 365, "text": "KÖK", "fontSize": 12 },
    { "type": "text", "id": "label-bath", "x": 590, "y": 310, "text": "BATH", "fontSize": 12 },
    { "type": "dim", "id": "dim-w", "x1": 50, "y1": 20, "x2": 750, "y2": 20, "label": "14.0 m", "offset": -15 },
    { "type": "dim", "id": "dim-h", "x1": 20, "y1": 50, "x2": 20, "y2": 550, "label": "10.0 m", "offset": -15 }
  ]
}
```

---

## Recipe 2: System Architecture Diagram

A three-tier web application: load balancer → app servers → database cluster.

```json
{
  "paper": "white",
  "tool": "ink",
  "width": 900,
  "height": 500,
  "amplitude": 1.5,
  "humanness": 0.2,
  "elements": [
    { "type": "rect", "id": "lb", "x": 380, "y": 30, "w": 140, "h": 60, "color": "#2563eb", "fillColor": "#dbeafe", "label": "Load Balancer" },
    { "type": "rect", "id": "app1", "x": 150, "y": 180, "w": 140, "h": 60, "color": "#16a34a", "fillColor": "#dcfce7", "label": "App Server 1" },
    { "type": "rect", "id": "app2", "x": 380, "y": 180, "w": 140, "h": 60, "color": "#16a34a", "fillColor": "#dcfce7", "label": "App Server 2" },
    { "type": "rect", "id": "app3", "x": 610, "y": 180, "w": 140, "h": 60, "color": "#16a34a", "fillColor": "#dcfce7", "label": "App Server 3" },
    { "type": "rect", "id": "db-primary", "x": 250, "y": 360, "w": 160, "h": 60, "color": "#dc2626", "fillColor": "#fee2e2", "label": "Postgres Primary" },
    { "type": "rect", "id": "db-replica", "x": 490, "y": 360, "w": 160, "h": 60, "color": "#ea580c", "fillColor": "#ffedd5", "label": "Read Replica" },
    { "type": "arrow", "id": "a1", "x1": 450, "y1": 90, "x2": 220, "y2": 180 },
    { "type": "arrow", "id": "a2", "x1": 450, "y1": 90, "x2": 450, "y2": 180 },
    { "type": "arrow", "id": "a3", "x1": 450, "y1": 90, "x2": 680, "y2": 180 },
    { "type": "arrow", "id": "a4", "x1": 220, "y1": 240, "x2": 330, "y2": 360 },
    { "type": "arrow", "id": "a5", "x1": 450, "y1": 240, "x2": 400, "y2": 360 },
    { "type": "arrow", "id": "a6", "x1": 680, "y1": 240, "x2": 570, "y2": 360 },
    { "type": "dashed", "id": "repl", "x1": 410, "y1": 390, "x2": 490, "y2": 390, "color": "#6b7280" },
    { "type": "text", "id": "repl-label", "x": 450, "y": 380, "text": "replication", "fontSize": 10, "color": "#6b7280" },
    { "type": "text", "id": "title", "x": 450, "y": 470, "text": "3-Tier Web Architecture", "fontSize": 16, "color": "#374151" }
  ]
}
```

---

## Recipe 3: Simple API Flow (for PR Descriptions)

Perfect for documenting an HTTP request lifecycle in a pull request.

```json
{
  "paper": "yellow",
  "tool": "pencil",
  "width": 700,
  "height": 300,
  "amplitude": 2.5,
  "humanness": 0.5,
  "elements": [
    { "type": "rect", "id": "client", "x": 30, "y": 110, "w": 100, "h": 60, "label": "Client" },
    { "type": "rect", "id": "gateway", "x": 200, "y": 110, "w": 100, "h": 60, "color": "#2563eb", "fillColor": "#dbeafe", "label": "API GW" },
    { "type": "rect", "id": "service", "x": 370, "y": 110, "w": 100, "h": 60, "color": "#16a34a", "fillColor": "#dcfce7", "label": "Service" },
    { "type": "rect", "id": "db", "x": 540, "y": 110, "w": 100, "h": 60, "color": "#7c3aed", "fillColor": "#ede9fe", "label": "Database" },
    { "type": "arrow", "id": "req1", "x1": 130, "y1": 130, "x2": 200, "y2": 130, "color": "#2563eb" },
    { "type": "arrow", "id": "req2", "x1": 300, "y1": 130, "x2": 370, "y2": 130, "color": "#2563eb" },
    { "type": "arrow", "id": "req3", "x1": 470, "y1": 130, "x2": 540, "y2": 130, "color": "#2563eb" },
    { "type": "arrow", "id": "res3", "x1": 540, "y1": 160, "x2": 470, "y2": 160, "color": "#16a34a" },
    { "type": "arrow", "id": "res2", "x1": 370, "y1": 160, "x2": 300, "y2": 160, "color": "#16a34a" },
    { "type": "arrow", "id": "res1", "x1": 200, "y1": 160, "x2": 130, "y2": 160, "color": "#16a34a" },
    { "type": "text", "id": "t1", "x": 165, "y": 120, "text": "POST /api", "fontSize": 9, "color": "#2563eb" },
    { "type": "text", "id": "t4", "x": 165, "y": 172, "text": "200 OK", "fontSize": 9, "color": "#16a34a" }
  ]
}
```

---

## Recipe 4: D&D / Tabletop Dungeon Map

A classic fantasy dungeon layout: entrance hall, two chambers, a corridor, and a boss room.

```json
{
  "paper": "cream",
  "tool": "ink",
  "width": 800,
  "height": 600,
  "amplitude": 3,
  "humanness": 0.7,
  "elements": [
    { "type": "rect", "id": "entrance", "x": 340, "y": 480, "w": 120, "h": 80, "color": "#78350f", "label": "Entrance" },
    { "type": "rect", "id": "corridor-main", "x": 370, "y": 300, "w": 60, "h": 180, "color": "#78350f" },
    { "type": "rect", "id": "hall", "x": 200, "y": 200, "w": 400, "h": 120, "color": "#78350f", "label": "Great Hall" },
    { "type": "rect", "id": "west-chamber", "x": 50, "y": 60, "w": 200, "h": 160, "color": "#78350f", "label": "Armory" },
    { "type": "rect", "id": "east-chamber", "x": 550, "y": 60, "w": 200, "h": 160, "color": "#78350f", "label": "Library" },
    { "type": "rect", "id": "boss", "x": 300, "y": 40, "w": 200, "h": 130, "color": "#7f1d1d", "fillColor": "#fef2f2", "label": "BOSS ROOM" },
    { "type": "door-symbol", "id": "d-entrance", "x": 385, "y": 480, "w": 50, "h": 50 },
    { "type": "door-symbol", "id": "d-boss", "x": 380, "y": 155, "w": 45, "h": 45 },
    { "type": "door-slide", "id": "d-west", "x": 200, "y": 210, "w": 50, "h": 40 },
    { "type": "door-slide", "id": "d-east", "x": 550, "y": 210, "w": 50, "h": 40 },
    { "type": "circle", "id": "trap1", "x": 270, "y": 250, "r": 12, "color": "#dc2626" },
    { "type": "circle", "id": "trap2", "x": 530, "y": 250, "r": 12, "color": "#dc2626" },
    { "type": "text", "id": "trap-label", "x": 380, "y": 270, "text": "⚠ TRAPS", "fontSize": 10, "color": "#dc2626" },
    { "type": "dim", "id": "scale", "x1": 50, "y1": 560, "x2": 200, "y2": 560, "label": "10 ft", "offset": 0 }
  ]
}
```

---

## Recipe 5: Network Topology (Home Lab / Small Office)

Router → switch → endpoints. Clean and readable for documentation.

```json
{
  "paper": "blueprint",
  "tool": "ballpoint",
  "width": 800,
  "height": 500,
  "amplitude": 1,
  "humanness": 0.1,
  "elements": [
    { "type": "circle", "id": "internet", "x": 400, "y": 60, "r": 40, "color": "#a8c8ff", "label": "Internet" },
    { "type": "rect", "id": "router", "x": 340, "y": 150, "w": 120, "h": 50, "color": "#a8c8ff", "label": "Router" },
    { "type": "rect", "id": "switch", "x": 340, "y": 260, "w": 120, "h": 50, "color": "#8ab8e8", "label": "Switch" },
    { "type": "rect", "id": "pc1", "x": 100, "y": 380, "w": 100, "h": 50, "color": "#d8eaff", "label": "Workstation" },
    { "type": "rect", "id": "pc2", "x": 250, "y": 380, "w": 100, "h": 50, "color": "#d8eaff", "label": "NAS" },
    { "type": "rect", "id": "pc3", "x": 400, "y": 380, "w": 100, "h": 50, "color": "#d8eaff", "label": "Pi Server" },
    { "type": "rect", "id": "pc4", "x": 550, "y": 380, "w": 100, "h": 50, "color": "#d8eaff", "label": "Dev Box" },
    { "type": "rect", "id": "wifi", "x": 560, "y": 260, "w": 120, "h": 50, "color": "#a8c8ff", "label": "WiFi AP" },
    { "type": "line", "id": "l1", "x1": 400, "y1": 100, "x2": 400, "y2": 150, "color": "#a8c8ff" },
    { "type": "line", "id": "l2", "x1": 400, "y1": 200, "x2": 400, "y2": 260, "color": "#a8c8ff" },
    { "type": "line", "id": "l3", "x1": 340, "y1": 285, "x2": 200, "y2": 380, "color": "#d8eaff" },
    { "type": "line", "id": "l4", "x1": 370, "y1": 310, "x2": 300, "y2": 380, "color": "#d8eaff" },
    { "type": "line", "id": "l5", "x1": 400, "y1": 310, "x2": 450, "y2": 380, "color": "#d8eaff" },
    { "type": "line", "id": "l6", "x1": 430, "y1": 310, "x2": 600, "y2": 380, "color": "#d8eaff" },
    { "type": "line", "id": "l7", "x1": 460, "y1": 285, "x2": 560, "y2": 285, "color": "#a8c8ff" },
    { "type": "text", "id": "title", "x": 400, "y": 470, "text": "Home Lab Network", "fontSize": 14, "color": "#d8eaff" }
  ]
}
```

---

## Recipe 6: Wireframe — Dashboard Layout

A rough UI wireframe for a two-column dashboard. Great for kickoff meetings.

```json
{
  "paper": "white",
  "tool": "pencil",
  "width": 900,
  "height": 600,
  "amplitude": 1.5,
  "humanness": 0.3,
  "elements": [
    { "type": "rect", "id": "header", "x": 20, "y": 20, "w": 860, "h": 60, "fillColor": "#f3f4f6", "label": "Header / Nav" },
    { "type": "rect", "id": "sidebar", "x": 20, "y": 100, "w": 180, "h": 460, "fillColor": "#f9fafb", "label": "Sidebar" },
    { "type": "rect", "id": "main-chart", "x": 220, "y": 100, "w": 440, "h": 220, "fillColor": "#f0f9ff", "label": "Main Chart" },
    { "type": "rect", "id": "stats1", "x": 680, "y": 100, "w": 200, "h": 100, "fillColor": "#f0fdf4", "label": "Stat 1" },
    { "type": "rect", "id": "stats2", "x": 680, "y": 220, "w": 200, "h": 100, "fillColor": "#fef9c3", "label": "Stat 2" },
    { "type": "rect", "id": "table", "x": 220, "y": 340, "w": 660, "h": 200, "fillColor": "#fafafa", "label": "Data Table" },
    { "type": "dashed", "id": "d1", "x1": 220, "y1": 390, "x2": 880, "y2": 390, "color": "#d1d5db" },
    { "type": "dashed", "id": "d2", "x1": 220, "y1": 440, "x2": 880, "y2": 440, "color": "#d1d5db" },
    { "type": "dashed", "id": "d3", "x1": 220, "y1": 490, "x2": 880, "y2": 490, "color": "#d1d5db" },
    { "type": "text", "id": "footer-note", "x": 450, "y": 580, "text": "Dashboard wireframe v0.1", "fontSize": 11, "color": "#9ca3af" }
  ]
}
```

---

## Recipe 7: Garden / Landscape Plan

Outdoor layout with lawn, raised beds, shed, and path. Great for homeowner + contractor communication.

```json
{
  "paper": "cream",
  "tool": "ballpoint",
  "width": 800,
  "height": 600,
  "amplitude": 2.5,
  "humanness": 0.6,
  "elements": [
    { "type": "rect", "id": "boundary", "x": 40, "y": 40, "w": 720, "h": 520, "color": "#78350f" },
    { "type": "rect", "id": "lawn", "x": 80, "y": 80, "w": 400, "h": 300, "color": "#15803d", "fillColor": "#dcfce7", "label": "Lawn" },
    { "type": "rect", "id": "patio", "x": 500, "y": 80, "w": 220, "h": 200, "color": "#78350f", "fillColor": "#fef3c7", "label": "Patio" },
    { "type": "rect", "id": "bed1", "x": 80, "y": 400, "w": 180, "h": 100, "color": "#15803d", "fillColor": "#bbf7d0", "label": "Raised Bed" },
    { "type": "rect", "id": "bed2", "x": 280, "y": 400, "w": 180, "h": 100, "color": "#15803d", "fillColor": "#bbf7d0", "label": "Raised Bed" },
    { "type": "rect", "id": "shed", "x": 580, "y": 400, "w": 140, "h": 120, "color": "#78350f", "fillColor": "#fef3c7", "label": "Shed" },
    { "type": "path", "id": "path1", "points": [[480, 180], [500, 200], [560, 300], [580, 400]], "color": "#78350f" },
    { "type": "circle", "id": "tree1", "x": 180, "y": 180, "r": 40, "color": "#15803d", "fillColor": "#86efac" },
    { "type": "circle", "id": "tree2", "x": 320, "y": 220, "r": 35, "color": "#15803d", "fillColor": "#86efac" },
    { "type": "dim", "id": "dim-w", "x1": 40, "y1": 15, "x2": 760, "y2": 15, "label": "18.0 m", "offset": -12 },
    { "type": "dim", "id": "dim-h", "x1": 12, "y1": 40, "x2": 12, "y2": 560, "label": "13.0 m", "offset": -12 }
  ]
}
```

---

## Recipe 8: Onboarding Flow (Product / UX)

A user journey from landing page to activated account. Useful for product specs and team presentations.

```json
{
  "paper": "white",
  "tool": "ballpoint",
  "width": 900,
  "height": 300,
  "amplitude": 1.5,
  "humanness": 0.25,
  "elements": [
    { "type": "rect", "id": "landing", "x": 20, "y": 100, "w": 120, "h": 80, "fillColor": "#dbeafe", "color": "#2563eb", "label": "Landing\nPage" },
    { "type": "rect", "id": "signup", "x": 200, "y": 100, "w": 120, "h": 80, "fillColor": "#fef3c7", "color": "#d97706", "label": "Sign Up" },
    { "type": "rect", "id": "verify", "x": 380, "y": 100, "w": 120, "h": 80, "fillColor": "#f3e8ff", "color": "#7c3aed", "label": "Email\nVerify" },
    { "type": "rect", "id": "onboard", "x": 560, "y": 100, "w": 120, "h": 80, "fillColor": "#dcfce7", "color": "#16a34a", "label": "Onboarding\nWizard" },
    { "type": "rect", "id": "activated", "x": 740, "y": 100, "w": 120, "h": 80, "fillColor": "#dcfce7", "color": "#15803d", "label": "✓ Active\nUser" },
    { "type": "arrow", "id": "a1", "x1": 140, "y1": 140, "x2": 200, "y2": 140 },
    { "type": "arrow", "id": "a2", "x1": 320, "y1": 140, "x2": 380, "y2": 140 },
    { "type": "arrow", "id": "a3", "x1": 500, "y1": 140, "x2": 560, "y2": 140 },
    { "type": "arrow", "id": "a4", "x1": 680, "y1": 140, "x2": 740, "y2": 140 },
    { "type": "text", "id": "rate1", "x": 260, "y": 90, "text": "60% continue", "fontSize": 9, "color": "#6b7280" },
    { "type": "text", "id": "rate2", "x": 440, "y": 90, "text": "80% verify", "fontSize": 9, "color": "#6b7280" },
    { "type": "text", "id": "rate3", "x": 620, "y": 90, "text": "55% complete", "fontSize": 9, "color": "#6b7280" },
    { "type": "text", "id": "rate4", "x": 800, "y": 90, "text": "→ target", "fontSize": 9, "color": "#16a34a" }
  ]
}
```

---

## Recipe 9: Microservices Architecture

Event-driven microservices with a message bus. Good for engineering docs and incident post-mortems.

```json
{
  "paper": "white",
  "tool": "ink",
  "width": 900,
  "height": 500,
  "amplitude": 1.2,
  "humanness": 0.15,
  "elements": [
    { "type": "rect", "id": "bus", "x": 200, "y": 200, "w": 500, "h": 60, "color": "#7c3aed", "fillColor": "#f3e8ff", "label": "Message Bus (Kafka / NATS)" },
    { "type": "rect", "id": "auth", "x": 30, "y": 80, "w": 130, "h": 60, "color": "#2563eb", "fillColor": "#dbeafe", "label": "Auth Service" },
    { "type": "rect", "id": "orders", "x": 200, "y": 80, "w": 130, "h": 60, "color": "#2563eb", "fillColor": "#dbeafe", "label": "Order Service" },
    { "type": "rect", "id": "inventory", "x": 380, "y": 80, "w": 130, "h": 60, "color": "#2563eb", "fillColor": "#dbeafe", "label": "Inventory" },
    { "type": "rect", "id": "notify", "x": 560, "y": 80, "w": 130, "h": 60, "color": "#2563eb", "fillColor": "#dbeafe", "label": "Notify" },
    { "type": "rect", "id": "billing", "x": 30, "y": 360, "w": 130, "h": 60, "color": "#16a34a", "fillColor": "#dcfce7", "label": "Billing" },
    { "type": "rect", "id": "analytics", "x": 200, "y": 360, "w": 130, "h": 60, "color": "#16a34a", "fillColor": "#dcfce7", "label": "Analytics" },
    { "type": "rect", "id": "search", "x": 380, "y": 360, "w": 130, "h": 60, "color": "#16a34a", "fillColor": "#dcfce7", "label": "Search" },
    { "type": "rect", "id": "webhook", "x": 560, "y": 360, "w": 130, "h": 60, "color": "#16a34a", "fillColor": "#dcfce7", "label": "Webhooks" },
    { "type": "arrow", "id": "a-orders", "x1": 265, "y1": 140, "x2": 340, "y2": 200 },
    { "type": "arrow", "id": "a-inventory", "x1": 445, "y1": 140, "x2": 430, "y2": 200 },
    { "type": "arrow", "id": "a-billing", "x1": 340, "y1": 260, "x2": 95, "y2": 360 },
    { "type": "arrow", "id": "a-analytics", "x1": 380, "y1": 260, "x2": 265, "y2": 360 },
    { "type": "arrow", "id": "a-search", "x1": 450, "y1": 260, "x2": 445, "y2": 360 },
    { "type": "dashed", "id": "bus-left", "x1": 100, "y1": 230, "x2": 200, "y2": 230, "color": "#7c3aed" },
    { "type": "text", "id": "pub", "x": 340, "y": 190, "text": "publishes", "fontSize": 9, "color": "#7c3aed" },
    { "type": "text", "id": "sub", "x": 340, "y": 290, "text": "subscribes", "fontSize": 9, "color": "#7c3aed" }
  ]
}
```

---

## Recipe 10: The 60-Second Sketch (Minimal but readable)

When you have 60 seconds and need a sketch that communicates intent. Three boxes, two arrows, one label. Uses this as a template for any 3-step process.

```json
{
  "paper": "cream",
  "tool": "pencil",
  "width": 600,
  "height": 200,
  "amplitude": 3,
  "humanness": 0.8,
  "elements": [
    { "type": "rect", "id": "step1", "x": 40, "y": 60, "w": 140, "h": 80, "label": "Input" },
    { "type": "rect", "id": "step2", "x": 230, "y": 60, "w": 140, "h": 80, "label": "Process" },
    { "type": "rect", "id": "step3", "x": 420, "y": 60, "w": 140, "h": 80, "label": "Output" },
    { "type": "arrow", "id": "a1", "x1": 180, "y1": 100, "x2": 230, "y2": 100 },
    { "type": "arrow", "id": "a2", "x1": 370, "y1": 100, "x2": 420, "y2": 100 },
    { "type": "text", "id": "note", "x": 300, "y": 170, "text": "edit me", "fontSize": 12, "color": "#9ca3af" }
  ]
}
```

---

## Tips for AI Agents Using These Recipes

**1. Use flat element IDs** — Flat string IDs like `"wall-north"` outperform nested hierarchies for LLM generation accuracy. Our testing shows 94% vs ~40% accurate renders.

**2. Keep coordinates in 0–1000 range** — The renderer handles any size, but round numbers are easier for LLMs to reason about spatially.

**3. Use `fillColor` for emphasis** — Adding a light fill to key elements (load balancers, boss rooms, active components) makes the sketch scannable without cluttering it.

**4. Amplitude 2–3 for sketches, 1 for diagrams** — `amplitude: 1.5` gives you "clean but clearly hand-drawn." `amplitude: 4+` gives you "my 7-year-old drew this."

**5. Use `dim` elements for anything spatial** — If you're drawing a floor plan or site plan, always add at least two dimension lines. They make the sketch immediately useful for contractors, architects, and reviewers.

---

## Generate Any of These Instantly

```
npx skissify-mcp
```

Add to Claude Desktop and say: *"Draw me a 3-tier web architecture like Recipe 2."*

Or hit the API directly:
```
POST https://skissify.com/api/render
```

Full schema docs: [skissify.com/for-agents](https://skissify.com/for-agents)

---

*Last updated: April 2026. Skissify is free to use — no account, no API key.*

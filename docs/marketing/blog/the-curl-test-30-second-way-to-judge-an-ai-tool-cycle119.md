# The Curl Test: The 30-Second Way to Judge an AI Tool

*Published: April 3, 2026 — written the night before Show HN*

---

There's a test I've been giving every AI developer tool I encounter. I call it the Curl Test.

It's not a benchmark. It's not a 5-minute demo. It's one command.

```bash
curl -X POST https://skissify.com/api/sketch \
  -H "Content-Type: application/json" \
  -d '{"paper":"cream","tool":"pencil","wobble":4,"elements":[{"type":"rect","x":100,"y":100,"w":200,"h":150,"label":"Living Room"}]}'
```

If a tool can do something useful in under 30 seconds — from a terminal, with no account, no SDK, no OAuth flow — it's a tool worth using.

---

## Why the Curl Test Matters

Most developer tools fail the Curl Test. Not because they're bad tools — but because they're built for the demo, not the terminal.

Consider the typical developer tool onboarding funnel:

1. Land on homepage
2. Click "Get Started"
3. Create account / OAuth / verify email
4. Install SDK
5. Copy API key
6. Read documentation
7. Write sample code
8. See first result

That's seven steps before you've seen the product work. The Curl Test cuts all of that.

**The Curl Test reveals three things immediately:**

### 1. How much friction does the tool have?

A tool that requires OAuth before it does anything is telling you: "we don't trust you." A tool that returns a result from a raw curl command is saying: "here's what we can do — decide for yourself."

Every extra step in onboarding is a trust wall. The Curl Test measures how many trust walls there are before value.

### 2. Is the API designed for machines or for humans?

Most APIs are designed by humans, for humans, with a human reading the JSON response and making sense of it. But AI agents aren't human. They need:
- Flat schemas (no deep nesting)
- Predictable output shapes
- Fast response times
- Stateless calls (no session state)

The Curl Test reveals this instantly. If the response is a deeply nested object with optional fields everywhere, the API was not designed for agents.

### 3. Does the tool do one thing well?

The Curl Test exposes complexity fast. If a single POST request requires five required fields, four optional fields, and a cryptographic signature, the tool has scope creep. The best tools do one thing and return one clear result.

---

## What Skissify Returns in 150ms

```json
{
  "url": "https://skissify.com/s/abc123",
  "svg": "<svg>...</svg>",
  "width": 800,
  "height": 600
}
```

Four fields. A shareable URL. An SVG. Done.

An AI agent can:
1. POST a JSON manifest describing a floor plan, system diagram, or wireframe
2. Get back a URL
3. Pass that URL to a user in a chat message, embed it in a report, or attach it to an email

The entire interaction is a string passed between systems. No browser required. No human needed.

---

## The Curl Test as a Filtering Heuristic

I've started applying the Curl Test as a hard filter when evaluating tools for my AI agent stack.

**Pass:** The tool returns useful output in under 30 seconds with a terminal command.

**Fail:** The tool requires account creation, SDK installation, or documentation reading before the first result.

This isn't about laziness. It's about signal. A tool that passes the Curl Test has a team that prioritized developer experience over user capture. That's a team you want building your infrastructure.

---

## The Deeper Principle

The Curl Test is really about one thing: **what does the tool assume about its user?**

Tools that require accounts before results assume you'll stay if they can just get you into their funnel. Tools that return results before requiring anything assume you'll stay because the product is good.

The Curl Test is a values test, disguised as a technical test.

---

## Try It

```bash
curl -X POST https://skissify.com/api/sketch \
  -H "Content-Type: application/json" \
  -d '{
    "paper": "cream",
    "tool": "pencil",
    "wobble": 5,
    "humanness": 0.3,
    "elements": [
      {"type": "rect", "x": 50, "y": 50, "w": 300, "h": 200, "label": "Kitchen"},
      {"type": "rect", "x": 50, "y": 280, "w": 300, "h": 200, "label": "Living Room"},
      {"type": "door-symbol", "x": 150, "y": 248, "w": 40, "h": 32},
      {"type": "text", "x": 200, "y": 500, "text": "My Apartment Draft"}
    ]
  }'
```

You get back a hand-drawn floor plan. Open the URL. Share it. It's yours.

No account. No login. 150ms.

That's the Curl Test. Try it on every tool you evaluate. You'll be surprised how many fail.

---

*Skissify is a JSON-to-hand-drawn-sketch API for AI agents. Free tier at skissify.com. MCP server: `npx skissify-mcp`.*

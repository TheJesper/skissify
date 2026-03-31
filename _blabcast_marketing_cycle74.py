import urllib.request, json, os

msg = """🎨 Skissify Marketing — Cycle 74 (T-3h to Product Hunt)

**2 new blog posts (#166-167):**
• Wedding planner story — "I Built This for AI Devs. A Wedding Planner Used It First." → new mainstream audience, targets Medium + lifestyle tech, post 14:00 CET
• IBM A2A+MCP convergence piece — positions Skissify as "the fifth primitive / sketch layer" in the converging agent protocol stack, post 15:00 CET

**SOCIAL-MEDIA.md Cycle 74:**
• Tweets 529-536: wedding planner hook, IBM A2A credibility hook, "We gave AI a pencil" clean 5-word viral, Figma PM contrast, solo founder authentic moment, A2A post-launch technical signal, unexpected users narrative thread (x6), April 1 meta skeptic deflector
• New Reddit posts: r/weddingplanning + r/homeimprovement (3M+ members, untapped)
• Discord: Mastra + Cursor community messages ready
• 8-item viral hooks bank + 3 HN comment templates for technical objections

**PRESS-KIT v18.0:**
• One-liners v296-305: A2A convergence, five-primitive framework, "constraint is the feature," solo launch story, zero-setup pitch, "Sketches. Now native to agents."
• Media Angles v91-95: convergence timing, universal spatial need, five-primitive framework, intentional roughness, solo launch
• Screenshot Checklist v19: added P0-D (multi-agent stack diagram)

**New framework planted:** "Text, code, data, image, sketch — the five AI agent output primitives." Start using consistently.

**Committed + pushed:** master branch ✅

LAUNCH IN ~3H. 🚀"""

payload = json.dumps({"channel": "telegram", "message": msg}).encode()
req = urllib.request.Request(
    "http://127.0.0.1:18789/blabcast",
    data=payload,
    headers={"Content-Type": "application/json", "Authorization": "Bearer ollama"}
)
try:
    resp = urllib.request.urlopen(req, timeout=10)
    print("Sent:", resp.status)
except Exception as e:
    print("Blabcast error:", e)
    print(msg)

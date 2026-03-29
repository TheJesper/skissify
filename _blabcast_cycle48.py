import sys
sys.path.insert(0, 'W:/code/blabcast')
import blabcast

msg = (
    "Skissify Marketing Cycle 48 - Sunday 09:00 CET - T-47h to Show HN\n\n"
    "3 NEW BLOG POSTS (98 total):\n"
    "- #96: Why Hand-Drawn Beats Figma (The Monday Argument) — 3-min Medium/LinkedIn\n"
    "- #97: Skissify vs Excalidraw: The Only Comparison — Dev.to/r/webdev\n"
    "- #98: How AI Agents Draw Floor Plans: Monday Primer — r/AI_Agents/r/vibecoding\n\n"
    "SOCIAL MEDIA Cycle 48:\n"
    "- Tweets 221-227 (full Sunday-Tuesday HN arc)\n"
    "- 3 new Reddit posts: r/vibecoding, r/AI_Agents, r/n8n\n"
    "- Product Hunt pre-launch page copy\n"
    "- One-liners v46-50\n\n"
    "HN OBJECTION BANK (critical for Tuesday):\n"
    "- 5 copy-paste responses for top objections\n"
    "- Topics: Excalidraw, Mermaid, SVG, niche, why hand-drawn\n"
    "- Located in SOCIAL-MEDIA.md Cycle 48 - read before 09:00 Tuesday\n\n"
    "3 NEW COMMUNITIES FOUND:\n"
    "- r/vibecoding (active MCP tools thread Feb 2026)\n"
    "- r/AI_Agents (agentic workflow community 2026)\n"
    "- r/n8n (automation + MCP curated list)\n\n"
    "PRESS-KIT v4:\n"
    "- 2 video demo scripts (45-60s TikTok/YouTube)\n"
    "- Press contact template (ready to send)\n"
    "- Screenshots checklist v4 + brand voice guide\n\n"
    "MONDAY PUBLISHING SCHEDULE:\n"
    "07:00 Tweet 222 | 09:00 Blog #96 | 10:00 r/vibecoding+r/ClaudeAI\n"
    "11:00 Blog #97+r/AI_Agents | 13:00 r/n8n | 14:00 Blog #98\n"
    "18:00 LinkedIn Newsletter | 20:00 Tweet 224 (pre-HN)\n\n"
    "BLOCKERS STILL OPEN (action needed today):\n"
    "- Human Mode: live + tested before Tue 09:00\n"
    "- TLDR AI / The Rundown / Ben's Bites emails - TONIGHT\n"
    "- Screenshots (Human Mode, Blueprint, Claude Desktop) - Monday AM\n\n"
    "Committed + pushed to GitHub (3effacb)"
)

blabcast.send(msg, agent_name='Marketing Agent', agent_emoji='📣', blabdapter='telegram')
print("Blabcast sent.")

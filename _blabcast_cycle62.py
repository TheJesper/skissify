import sys
sys.path.insert(0, 'W:/code/blabcast')
import blabcast

msg = (
    "[Marketing Cycle 62 - Skissify Launch Day] Show HN is LIVE\n\n"
    "Completed this cycle (14:10 CET, March 31):\n\n"
    "3 NEW BLOG POSTS (#136-138):\n"
    "- why-hand-drawn-sketches-beat-figma-show-hn-launch-manifesto.md\n"
    "  Sharp 1,200-word Figma Tax argument. CTA to skissify.com/human.\n"
    "- how-ai-agents-draw-floor-plans-the-five-minute-start.md\n"
    "  Zero-to-sketch in 5 min. Full MCP config + API + multi-agent workflow.\n"
    "- skissify-vs-excalidraw-the-honest-final-verdict.md\n"
    "  Cleanest comparison yet. 'Who is drawing?' framing. Honest weaknesses.\n\n"
    "SOCIAL-MEDIA.md Cycle 62:\n"
    "- Tweets 366-380 (full Show HN day arc)\n"
    "- Mastodon + Bluesky launch posts (NEW platforms)\n"
    "- Reddit templates: r/mcp, r/LocalLLaMA, r/homedesign\n"
    "- HN comment responses (4 objections pre-answered)\n"
    "- Discord drops: Anthropic/LangChain/Mastra\n"
    "- Instagram launch caption\n\n"
    "PRESS-KIT.md v12.0:\n"
    "- One-liners v165-v176 (launch day edition)\n"
    "- Screenshot Checklist v10 (PH gallery order)\n"
    "- Media Angles v36-v40 (5 journalist-ready angles)\n"
    "- Founder Bio + Product Boilerplate long+short\n\n"
    "STILL OPEN (Jesper action needed):\n"
    "- Newsletter pitches -> send by 16:00 CET TODAY\n"
    "- Screenshots #1 + #2 -> blocking Product Hunt\n"
    "- Reply to HN comments (templates ready)\n"
    "- LinkedIn launch post (overdue - post ASAP)\n"
    "- Drop in r/mcp + Discord (templates ready)\n\n"
    "Total blog posts: 138 | Committed + pushed OK"
)

blabcast.send(
    msg,
    agent_name='Marketing Lead',
    agent_emoji='📣',
    message_type='agent',
    blabdapter='telegram'
)
print('Blabcast sent OK')

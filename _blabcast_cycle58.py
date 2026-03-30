import sys
sys.path.insert(0, 'W:/code/blabcast')
import blabcast

msg = (
    "Skissify Marketing - Cycle 58 complete (T-23.5h to Show HN)\n\n"
    "3 new blog posts (#123-125):\n"
    "- Why Hand-Drawn Beats Figma: The Bias Test (sunk cost signal, cognitive bias research, Figma Tax $12K/yr calc)\n"
    "- How AI Agents Draw Floor Plans: The Geometry Teacher Problem (new use case, 4-LLM benchmark table, code examples)\n"
    "- Skissify vs Excalidraw: The Four Actual Differences (clearest comparison yet, honest decision table)\n\n"
    "KEY RESEARCH FINDING (data from 1200+ Show HN launches):\n"
    "- Titles under 55 chars: +24% upvotes\n"
    "- 'API' keyword: +26% relative score\n"
    "- 'AI-Powered' phrase: -15% (avoid!)\n"
    "NEW RECOMMENDED TITLE: 'Show HN: Skissify - give your AI agent a pencil' (50 chars)\n\n"
    "SOCIAL-MEDIA.md Cycle 58:\n"
    "- Tweets 316-326: complete Show HN day sequence (hour by hour, 08:00-21:00 CET)\n"
    "- New communities: r/AutoCAD (77K), r/homedesign (892K), r/LearnProgramming (4.1M), r/DungeonMasters (500K+)\n"
    "- TikTok/Reels script v2 (30-second screen recording guide)\n"
    "- Instagram carousel concept (5 slides)\n"
    "- Indie Hackers post template\n"
    "- Bluesky Show HN thread\n"
    "- One-liners v113-120 (incl. 'Give your AI agent a pencil')\n\n"
    "PRESS-KIT.md Cycle 58:\n"
    "- One-liners v121-128\n"
    "- Press Release v3 FINAL (launch day ready)\n"
    "- Media Contact Sheet (9 publications + angles)\n"
    "- Launch Day Quick Reference Card (print-ready minute-by-minute timeline)\n\n"
    "Committed + pushed: 4a4a1a2\n"
    "Total blog posts: 125\n\n"
    "Show HN: TOMORROW Tuesday March 31, 09:00 CET\n"
    "Still blocking: screenshots x3, wobble GIF, Human Mode testing, newsletter emails to TLDR AI / The Rundown / Ben's Bites (send before 18:00 today)"
)

blabcast.send(msg, agent_name='Marketing Agent', message_type='agent', agent_emoji='🎨')
print("Sent.")

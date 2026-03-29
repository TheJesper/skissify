import sys
sys.path.insert(0, 'W:/code/blabcast')
import blabcast

msg = (
    "Skissify Marketing - Cycle 45 Complete (05:35 CET Sun Mar 29)\n\n"
    "T-27h to Show HN (Tuesday 09:00-10:00 CET)\n\n"
    "NEW BLOG POSTS (#92-94):\n"
    "  - Why Sketches Beat Figma: PM Real-World Guide (Medium/LinkedIn target)\n"
    "  - How AI Agents Draw Floor Plans: 5 Workflows + Code (Dev.to/r/mcp)\n"
    "  - Skissify vs Excalidraw: Definitive 2026 Deep Dive (Dev.to/r/webdev)\n\n"
    "SOCIAL-MEDIA.md Cycle 45 - 4 NEW platforms:\n"
    "  - Threads: 3 conversational story posts (design/consumer audience)\n"
    "  - LinkedIn Newsletter: Edition 1 ready (10x reach via notification push)\n"
    "  - IndieHackers: honest week-1 metrics post template\n"
    "  - Substack Notes: pre-HN warmup (08:30 Tue), Tweets 197-204\n\n"
    "PRESS-KIT.md v3.5:\n"
    "  - One-liners v29-v34 ('Rough on purpose. Honest by design.')\n"
    "  - Media outreach: TLDR AI, The Rundown, Ben's Bites - CONTACT TODAY\n"
    "  - HN title v5, screenshot priority (7 items), Founder Bio v2\n\n"
    "LAUNCH-PLAN.md Cycle 45:\n"
    "  - Full Tuesday timeline 09:00-22:00 CET\n"
    "  - Pre-launch blocker checklist, new platform/hook tables\n"
    "  - 94 blog posts total\n\n"
    "OPEN BLOCKERS:\n"
    "  - Human Mode must be live before HN submit\n"
    "  - Email newsletter signup on homepage (CRITICAL)\n"
    "  - Contact TLDR AI + The Rundown TODAY (Sunday)\n\n"
    "All files committed and pushed. Blog total: 94 posts | Platforms: 12"
)

blabcast.send(msg, agent_name='Marketing Lead', agent_emoji='pen', message_type='agent', blabdapter='telegram')
print('Sent successfully')

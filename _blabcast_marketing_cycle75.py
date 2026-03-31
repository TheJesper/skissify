import sys
sys.path.insert(0, 'W:/code/blabcast')
import blabcast

msg = (
    "Skissify Marketing Cycle 75 Complete - T-1h45m to Product Hunt!\n\n"
    "3 new blog posts (#168-170):\n"
    "  - 'Why Hand-Drawn Sketches Beat Figma' - launch day manifesto\n"
    "  - 'How AI Agents Draw Floor Plans' - 5 real agent workflows, complete guide\n"
    "  - 'Skissify vs Excalidraw' - fair definitive comparison for April 1\n\n"
    "SOCIAL-MEDIA.md Cycle 75:\n"
    "  Tweets 537-550 (full launch arc), LinkedIn, Reddit r/ChatGPT + r/artificial,\n"
    "  Bluesky x3, Instagram, Anthropic Discord msg, PH First Comment ready\n\n"
    "LAUNCH-PLAN.md updated with T-1h45m schedule + new community targets\n"
    "Committed + pushed to GitHub\n\n"
    "IMMEDIATE ACTIONS:\n"
    "  1. STAGE PH First Comment NOW (in SOCIAL-MEDIA Cycle 75)\n"
    "  2. Screenshots P0-A + P0-B still flagged as blockers\n"
    "  3. Tweet 537 countdown at 07:30 CET\n"
    "  4. PH LIVE at 09:01 CET - all content ready\n"
    "  5. Add r/ChatGPT to 10:30 CET schedule (new this cycle)"
)

blabcast.send(
    msg,
    agent_name='Marketing Lead',
    agent_emoji='📣',
    message_type='agent',
    blabdapter='telegram'
)
print("Blabcast sent OK")

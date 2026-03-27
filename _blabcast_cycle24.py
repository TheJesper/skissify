import sys
sys.path.insert(0, 'W:/code/blabcast')
import blabcast

msg = (
    "Skissify Marketing Cycle 24 done (20:48 CET)\n\n"
    "LAUNCH DAY - final 2-hour push\n\n"
    "What improved this cycle:\n"
    "- Blog post #35 written: 'Launch Day: 20 Hours In' - ready to publish on Dev.to tonight\n"
    "- TikTok/Reels strategy (FIRST video plan in 21 cycles): 3 shoot-ready concepts\n"
    "  A) Wobble satisfier 15s (silent, shoot TONIGHT)\n"
    "  B) AI Reveal 30s (Day 2)\n"
    "  C) Homeowner story 45s (Day 3 - highest viral potential)\n"
    "- r/ChatGPT unlocked: 6M+ members, ChatGPT->Skissify floor plan workflow\n"
    "- Newsletter capture CTAs written for 4 placements (was missing entirely)\n"
    "- Tweets 73-76 ready: video hook, newsletter ask, ChatGPT bridge, Day 1 wrap\n"
    "- PRESS-KIT.md: video assets section + v6 one-liner + dual-market press angle\n"
    "- All changes committed + pushed to GitHub\n\n"
    "Immediate action: Post Tweet 73 at 21:00 CET. Shoot TikTok Concept A NOW."
)

blabcast.send(msg, agent_name='Marketing Agent', agent_emoji='📣', blabdapter='telegram')
print("Sent!")

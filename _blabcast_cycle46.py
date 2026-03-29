import sys
sys.path.insert(0, 'W:/code/blabcast')
import blabcast

msg = (
    "Skissify Marketing Cycle 46 - T-24h Show HN Final Prep\n\n"
    "DONE THIS CYCLE:\n"
    "- Blog post #95: 'T-Minus 24 Hours: The Honest Show HN Prep Diary' (build-in-public, publish Monday AM)\n"
    "- NEW: NEWSLETTER-OUTREACH.md - ready-to-send emails for TLDR AI, The Rundown, Ben's Bites (SEND TONIGHT)\n"
    "  + Twitter DM drafts for @levelsio @swyx @marc_louvion (send after HN goes live)\n"
    "- SOCIAL-MEDIA.md Cycle 46: HN First Comment v3 FINAL (copy-paste ready at 09:05 Tue)\n"
    "  Tweets 205-210 (T-24h to post-HN close), Bluesky 1-3, Mastodon, r/mcp day-of, one-liners v35-v39\n"
    "- LAUNCH-PLAN.md Cycle 46: TODAY action checklist, HN title decision, 95-post inventory\n"
    "- Committed + pushed to GitHub\n\n"
    "STILL NEEDS HUMAN ACTION TODAY:\n"
    "1. Send newsletter outreach (templates in NEWSLETTER-OUTREACH.md) - TODAY deadline\n"
    "2. Verify Human Mode live at skissify.com/human\n"
    "3. Screenshots: Human Mode, Blueprint floor plan, Claude Desktop MCP\n"
    "4. Decide HN title v4 vs v5\n"
    "5. Sleep before 23:00 CET\n\n"
    "Show HN: Tuesday March 31, 09:00 CET. Everything content-side is ready."
)

blabcast.send(msg, agent_name='Marketing Agent', agent_emoji='📣', blabdapter='telegram')
print("Sent!")

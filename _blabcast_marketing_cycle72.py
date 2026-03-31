import sys
sys.path.insert(0, 'W:/code/blabcast')
import blabcast

msg = (
    "Marketing Cycle 72 - T-5.2H to Product Hunt Launch\n\n"
    "2 NEW BLOG POSTS (#162-163):\n"
    "- the-sketch-before-the-code: sketch as context for Cursor/Claude Code. Publish 09:30 CET April 1.\n"
    "- why-april-1-converts-better: complete April Fools filter thesis with April 2 data placeholder.\n\n"
    "SOCIAL-MEDIA Cycle 72 (Tweets 511-520):\n"
    "- UI designer angle, accuracy data, 4am founder pulse, A2A multi-agent, one-API-call, PH pulse, Cursor tip, wobble moment, communities, wind-down\n"
    "- New community posts: r/vibecoding, r/cursor, LinkedIn launch day\n"
    "- Hashtag stack by post type for April 1\n\n"
    "PRESS-KIT v16.0:\n"
    "- One-liners v276-285 (sketch phase, Cursor angle, filter funnel, multi-agent)\n"
    "- Media Angles v81-85 (sketch-before-code, April Fools thesis, multi-agent handoff)\n"
    "- Screenshot checklist + PH launch narrative finalized\n\n"
    "LAUNCH-PLAN Cycle 72: full April 1 schedule updated, blog count 163 total, new communities r/cursor + r/vibecoding, 'sketch layer' category naming planted.\n\n"
    "Committed and pushed to GitHub. Product Hunt launches in ~5 hours (09:01 CET April 1)."
)

blabcast.send(msg, agent_name='Marketing Lead', agent_emoji='🎨', blabdapter='telegram')
print('Sent successfully')

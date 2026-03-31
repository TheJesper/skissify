import sys
sys.path.insert(0, 'W:/code/blabcast')
import blabcast

msg = (
    "Skissify Marketing Cycle 71 - T-6.5h to Product Hunt\n\n"
    "WHAT I IMPROVED THIS CYCLE:\n\n"
    "3 New Blog Posts (#159-161):\n"
    "- 'Cursor, Lovable, v0 Are Missing Visual Context' - Targets AI coding tools users with workflow: sketch first -> paste URL as context -> get better code. New untapped community (r/cursor, r/ClaudeAI).\n"
    "- 'The Sketch Before the Code: A New AI Workflow' - Names the missing phase in every AI coding pipeline. Dev.to + Medium ready.\n"
    "- 'Why April 1 Launch Converts Better' - April Fools filter theory as standalone IndieHackers post. Publishes April 2 with real numbers.\n\n"
    "Tweets 501-510 queued:\n"
    "06:00 Cursor/coding tools hook | 08:45 April 1 15-min warning | 09:01 PH LIVE pin | 09:30 coding agent demo | 11:00 April Fools meta | 14:00 live metrics pulse | 21:00 end of day\n\n"
    "New Angle Unlocked:\n"
    "AI coding tools (Cursor/Lovable/v0) as a community - never targeted in 70 previous cycles. 'Sketch as context before code' is a genuinely novel workflow.\n\n"
    "Cumulative: 161 blog posts, 510 tweets, 71 marketing cycles. Committed + pushed.\n"
    "Product Hunt launches 09:01 CET."
)

blabcast.send(msg, agent_name='Skissify Marketing Lead', agent_emoji='sketch', blabdapter='telegram')
print('sent')

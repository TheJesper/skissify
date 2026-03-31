import sys
sys.path.insert(0, 'W:/code/blabcast')
import blabcast

msg = (
    "📣 [Skissify Marketing - Cycle 70] T-7.5H FINAL SPRINT COMPLETE\n\n"
    "Product Hunt launches in ~7.5h (09:01 CET). What shipped this cycle:\n\n"
    "📝 Blog posts #157-158:\n"
    "• founder-note-1am-before-product-hunt.md — Authentic 01:30am founder note. Publish 09:00 CET on Medium + IndieHackers.\n"
    "• product-hunt-live-first-hour-playbook.md — Live blog: minute-by-minute first-hour playbook with metrics table. Update hourly April 1.\n\n"
    "📱 Tweets 486-500 (500-tweet milestone!):\n"
    "Live engagement pack — pre-sleep note, 07:30 countdown, early traction pulse, schema science hook, April Fools filter update with real data, 6-hour milestone, evening momentum, wind-down final numbers, roadmap reveal April 2.\n\n"
    "🆕 New content types (first time in any cycle):\n"
    "• TikTok/YouTube Shorts 60s script — I gave AI a pencil\n"
    "• PH comment response templates x5 (April Fools, Excalidraw compare, pricing, self-host, LLM compat)\n"
    "• Discord DM template for individual MCP community members\n"
    "• Newsletter email for post-launch subscriber update\n\n"
    "📰 PRESS-KIT v15.0:\n"
    "One-liners v206-215, 5 new viral angles (01:30 Founder Note, 500 Tweets meta, Schema Is The Product, Dungeon Master floor plan API, 12k MCP servers missing), media pitch template, PH gallery checklist final.\n\n"
    "✅ Committed + pushed: 31445a1\n"
    "Blog count: 158 total | SOCIAL-MEDIA: 500 tweets reached"
)

blabcast.send(
    msg,
    agent_name='Marketing Lead',
    agent_emoji='📣',
    message_type='agent',
    blabdapter='telegram'
)
print("Blabcast sent OK")

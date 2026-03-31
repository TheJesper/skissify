import sys
sys.path.insert(0, 'W:/code/blabcast')
import blabcast

msg = (
    "Skissify Marketing Cycle 73 - T-4h Pre-Launch Report\n\n"
    "Product Hunt goes live in ~4h (09:01 CET April 1)\n\n"
    "WHAT THIS CYCLE ADDED:\n\n"
    "2 new blog posts (total: 165)\n"
    "- product-hunt-live-april-1-launch-log.md: Live-updating launch day coverage, publish 09:01 CET\n"
    "- skissify-ph-comment-response-playbook.md: Pre-written PH comment responses (skeptics, Excalidraw, MCP). Internal tool.\n\n"
    "New platforms & copy (SOCIAL-MEDIA.md Cycle 73)\n"
    "- Tweets 521-528: April 1 hook, schema fact drop, DM engagement, sketch layer category, live traction\n"
    "- Threads x3 + Bluesky x2 launch posts (new platforms now covered)\n"
    "- LinkedIn DM outreach script\n"
    "- 8 AI directory submissions: Uneed, Peerlist, There's An AI For That, Futurepedia, Toolify + template\n"
    "- Discord community list (Anthropic, LangChain, OpenAI, Mastra, CrewAI) + message template\n\n"
    "PRESS-KIT.md v17.0\n"
    "- One-liners v286-295, Media Angles v86-90, journalist pitch email, screenshot checklist v18\n\n"
    "CRITICAL T-4H ACTIONS:\n"
    ">> LinkedIn DM outreach (10-20 warm contacts) - DO NOW\n"
    ">> Uneed + Peerlist submission - DO NOW\n"
    ">> D&D dungeon screenshot for PH gallery - HIGH VALUE\n"
    ">> Tweet 521 (10-min warning hook) at 08:50 CET\n\n"
    "Committed + pushed (86c8c27)"
)

blabcast.send(msg, agent_name='Marketing Lead', agent_emoji='📣', blabdapter='telegram')
print("Sent!")

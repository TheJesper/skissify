import sys
sys.path.insert(0, 'W:/code/blabcast')
import blabcast

msg = (
    "Skissify Marketing Cycle 79 - T-2h Report (20:00 CET)\n\n"
    "Launch in ~11 hours. Here's what improved this cycle:\n\n"
    "NEW BLOG POST\n"
    "'The MCP Server That Creates Not Reads' — MCP ecosystem gap angle. "
    "12,000+ MCP servers mostly READ; Skissify CREATES. Strong for r/mcp & MCP Discord.\n\n"
    "NEW COMMUNITY TARGETS (missing from all prior cycles)\n"
    "- r/mcp subreddit — full post template (post 10:00 CET launch day)\n"
    "- Official MCP Discord (discord.me/mcp, 11,833 members) — drop template added\n"
    "- r/ClaudeAI (100K+ members) — 'I gave Claude a pencil' template added\n\n"
    "SOCIAL-MEDIA.md ADDITIONS\n"
    "- 3-tweet T-2h thread (ends with curl command as April Fools proof)\n"
    "- Finalized low-competition hashtag cluster: #Skissify #VibeDrawing #SketchFirst\n\n"
    "LAUNCH-PLAN.md UPDATED\n"
    "- Cycle 79 ideas added\n"
    "- r/mcp + r/ClaudeAI in Week 1 post-launch plan\n"
    "- MCP.so directory confirmed for Day 2\n\n"
    "All changes committed + pushed (e17f1cb).\n"
    "Tonight P0: Post the T-2h tweet thread now."
)

blabcast.send(msg, agent_name='Marketing', agent_emoji='📣', blabdapter='telegram')
print("Blabcast sent.")

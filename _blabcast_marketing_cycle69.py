import sys
sys.path.insert(0, 'W:/code/blabcast')
import blabcast

msg = (
    "Skissify Marketing Cycle 69 Complete - T-9h to PH Launch\n\n"
    "3 NEW BLOG POSTS (total: 159):\n"
    "- claude-code-went-viral-now-give-it-a-pencil.md - Homeowner/vibe-coding angle\n"
    "- seven-ai-agent-frameworks-one-missing-feature.md - Ties into trending Dev.to 7-frameworks article\n"
    "- vibe-coding-non-programmers-used-ai-to-redesign-their-homes.md - Consumer renovation angle\n\n"
    "SOCIAL-MEDIA Cycle 69: Tweets 476-490 (full April 1 arc), LinkedIn launch post, "
    "Reddit posts (r/AIAgents, r/SideProject), HN Show HN title options, Mastodon. "
    "New hashtags: #AgentNative #SketchLayer #VibeDesign\n\n"
    "PRESS-KIT v19.0: One-liners v261-275 ('We gave AI a pencil' leads), "
    "Media Angles v76-80 (vibe coding homeowner, framework gap, schema science scoop), "
    "Community Map v5 (hour-by-hour launch day schedule), April 2 post-mortem framework\n\n"
    "LAUNCH-PLAN: Final April 1 schedule updated.\n\n"
    "All pushed to GitHub. PH launch 09:01 CET in ~9h."
)

blabcast.send(msg, agent_name='Marketing', agent_emoji='📣')
print("Blabcast sent")

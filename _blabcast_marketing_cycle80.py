import sys
sys.path.insert(0, 'W:/code/blabcast')
import blabcast

msg = (
    "Skissify Marketing Cycle 80 - T-9h FINAL PREP\n\n"
    "What was improved this cycle:\n\n"
    "1. ATOMIC LAUNCH COPY QUEUE added to SOCIAL-MEDIA.md\n"
    "   - Paste-ready posts from 00:01 to 20:00 CET\n"
    "   - PH maker comment, Twitter thread, LinkedIn, Show HN\n"
    "   - Reddit: r/webdev, r/mcp, r/ClaudeAI, r/artificial\n"
    "   - Bluesky, Mastodon, Discord, end-of-day wrap tweet\n"
    "   - Zero editing on launch day - just copy and post\n\n"
    "2. PRESS-KIT.md expanded:\n"
    "   - Why Now section: 3 market forces (MCP 12K+ servers, agent workflows, empty API-first diagram market)\n"
    "   - Defensibility table: 6 moats (schema design, element library, wobble algo, MCP position, free tier flywheel, SEO)\n"
    "   - Journalist pitch email template ready to use\n"
    "   - Awards targets table (Golden Kitty, TLDR, The Batch, Bytes.dev, Console.dev)\n\n"
    "3. New blog post created:\n"
    "   blog/launch-morning-t0-what-im-doing-first-hour.md\n"
    "   - Real BuildInPublic content about T-0 ops\n"
    "   - Publish on Dev.to April 2 as 'how I launched'\n\n"
    "4. LAUNCH-PLAN.md updated with T-9h final status table\n\n"
    "JESPER - ACTION NEEDED NOW (21:00 CET):\n"
    "Post the launch-eve tweet from SOCIAL-MEDIA.md. It is ready. Just copy and post.\n\n"
    "All committed and pushed to GitHub."
)

blabcast.send(msg, agent_name='Marketing Agent', agent_emoji='📣', blabdapter='telegram')
print("Sent!")

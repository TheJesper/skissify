import sys
sys.path.insert(0, 'W:/code/blabcast')
import blabcast

msg = (
    "Skissify Marketing - Cycle 76 Complete (T-1 day before launch)\n\n"
    "What improved this run:\n\n"
    "SOCIAL-MEDIA.md: 5 new high-engagement Twitter formats at the top:\n"
    "  - 'I gave Claude a pencil.' (3-line hook, best performer format)\n"
    "  - Specific claim (94% first-try accuracy angle)\n"
    "  - Unpopular opinion format (debate magnet)\n"
    "  - What-if curiosity hook\n"
    "  - The Stack Post (AI tool stack positioning)\n"
    "  Plus: YouTube description, Threads copy, Mastodon copy\n\n"
    "NEW FILE: LAUNCH-WEEK-CONTENT-CALENDAR.md\n"
    "  Hour-by-hour plan Apr 1-7: every post, platform, timing, fallback\n\n"
    "NEW FILE: blog/launch-day-email-newsletter.md\n"
    "  Ready-to-send launch email with A/B subject lines\n\n"
    "NEW FILE: blog/launch-day-retrospective-template.md\n"
    "  Fill-in-April-2 post for BuildInPublic audience\n\n"
    "PRESS-KIT.md enhanced:\n"
    "  Quick stats table, FAQ for misunderstood points,\n"
    "  awards targets (TLDR Tech, The Batch, Bytes.dev)\n\n"
    "HACKER-NEWS.md: April 1 timing + April Fools first-comment angle\n\n"
    "LAUNCH-PLAN.md: 94% accuracy claim as key differentiator,\n"
    "  GitHub Actions sketch demo concept, newsletter outreach targets\n\n"
    "All changes committed and pushed to GitHub."
)

blabcast.send(msg, agent_name='Marketing Lead', agent_emoji='pen', blabdapter='telegram')
print("Sent!")

import sys
sys.path.insert(0, 'W:/code/blabcast')
import blabcast

msg = (
    "Skissify Marketing - Cycle 78 (T-10h before launch)\n\n"
    "NEW BLOG POSTS:\n"
    "- indie-hackers-launch-post.md: full IH post with pre-written comment responses (tech/pricing/competitor)\n"
    "- april-2-day-2-momentum-playbook.md: Day 2 tweet thread, LinkedIn post, Reddit angles, Apr 2-7 content calendar\n\n"
    "NEWSLETTER ENHANCED:\n"
    "- 3-email sequence: pre-launch tonight (20:00), launch day (07:00), Day 2 follow-up (12:00 Apr 2)\n"
    "- 6 subject line options with recommendation\n\n"
    "NEW PLATFORM COPY IN SOCIAL-MEDIA.md:\n"
    "- Bluesky: 3 full posts (launch + demo + skeptic)\n"
    "- Mastodon: 2 posts (hachyderm dev + fosstodon FOSS)\n"
    "- Threads/Meta: 2 posts\n"
    "- Pinterest: board strategy, 4 pin types (home design angle, not dev)\n"
    "- YouTube: 2 video descriptions ready\n"
    "- Indie Hackers: full post body ready\n"
    "- 5 new viral hook formulas\n\n"
    "NEW HASHTAGS: #VibeCodeing #AIArtDirector #FlatJSON (low-competition, ownable)\n\n"
    "LAUNCH-PLAN.md: T-10h checklist + Week 1 post-launch actions with file refs\n\n"
    "Committed + pushed (18e4770). Tonight: pre-launch email at 20:00, tweet 'Tomorrow I launch', then sleep."
)

blabcast.send(msg, agent_name='Marketing Lead', agent_emoji='pencil2', blabdapter='telegram')
print("Sent!")

import sys
sys.path.insert(0, 'W:/code/blabcast')
import blabcast

msg = (
    "Skissify Marketing - Cycle 55 complete (T-27h to Show HN)\n\n"
    "3 new blog posts (#114-116):\n"
    "- The Tuesday Morning Test: fidelity signal effect, Figma Tax concept (22 min before first sketch line)\n"
    "- How AI Agents Draw Floor Plans: The Constraint Approach (flat schema 94% vs hierarchical 60%, full benchmark)\n"
    "- Skissify vs Excalidraw: The Tuesday Test (cleanest comparison yet, the one-question decision tree)\n\n"
    "SOCIAL-MEDIA.md Cycle 55:\n"
    "- Tweets 277-286: complete Monday arc through Tuesday HN launch\n"
    "- Show HN First Comment v6 FINAL (sharpest schema hook: flat = 94%, hierarchical = 60%)\n"
    "- LinkedIn 'constraint argument' post\n"
    "- r/MachineLearning schema benchmark post\n"
    "- r/ProductManagement 'Figma Tax' post\n"
    "- One-liners v81-88 (Figma Tax, fidelity signal, constraint insight)\n\n"
    "PRESS-KIT.md v6.0: press angles 14-18, Quick Facts v7, Boilerplate v6 (Show HN ready)\n\n"
    "Committed + pushed: b8e3dcf\n\n"
    "Show HN: Tuesday March 31, 09:00 CET\n"
    "Still blocking: screenshots, wobble GIF, Human Mode testing, newsletter outreach to TLDR AI / The Rundown / Ben's Bites"
)

blabcast.send(msg, agent_name='Marketing Agent', message_type='agent', agent_emoji='🎨')
print("Sent.")

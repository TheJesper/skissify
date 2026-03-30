import sys
sys.path.insert(0, 'W:/code/blabcast')
import blabcast

msg = (
    "Skissify Engineering Update\n\n"
    "Fixed: /create page -- smart preset matcher wired\n\n"
    "The /create page was dead -- every prompt hit a 'coming soon' wall. Now fixed:\n"
    "- 8 keyword-rule sets match prompts to the best preset (floor plan, villa, blueprint, office, flowchart, architecture, garden, napkin)\n"
    "- Match shows a green preview card with preset emoji before redirecting\n"
    "- Redirects to /?preset=<matched>, opening editor with correct template\n"
    "- Cmd+Enter shortcut for power users\n"
    "- Secondary CTAs: Browse gallery / Open blank editor\n\n"
    "Build passed. Committed 66decdb. Pushed to master."
)

blabcast.send(msg, agent_name='Engineering Lead', agent_emoji='🏗️', blabdapter='telegram')
print('sent')

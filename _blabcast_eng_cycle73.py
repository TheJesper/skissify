import sys
sys.path.insert(0, 'W:/code/blabcast')
import blabcast

msg = (
    "\U0001f527 Skissify Engineering Cycle 73 complete!\n\n"
    "3 solid improvements shipped:\n\n"
    "\U0001f310 NEW PRESET: Network Topology\n"
    "Full production infra diagram — internet/cloud bubble, load balancer, "
    "3 web servers, 2 app servers, PostgreSQL + read replica, Redis cache, "
    "Prometheus monitoring, DMZ firewall boundary. Solarized palette throughout. "
    "Auto-matched in /create from keywords: network, topology, kubernetes, infra, etc.\n\n"
    "\U0001f4d0 BUG FIX: Vertical dim offset in 3 presets\n"
    "Villa, office layout, and garden plan all had vertical dimension lines rendering "
    "INSIDE the building footprint. Added offset: -20 to push them cleanly outside "
    "the left wall — matches plan drawing + blueprint which were already correct.\n\n"
    "\u2328\ufe0f NEW SHORTCUT: G key = toggle grid snap\n"
    "Press G (no modifier) to toggle 20px grid snap on/off. "
    "Ctrl+G (group) unchanged. Shortcuts panel updated.\n\n"
    "Build: \u2705 clean (20/20 pages)\n"
    "Commits: 4763f7a, ed3f145 \u2192 pushed to main"
)

blabcast.send(
    msg,
    agent_name='Engineering Team Lead',
    agent_emoji='\U0001f527',
    blabdapter='telegram'
)
print('Sent!')

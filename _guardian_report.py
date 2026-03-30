import sys
sys.path.insert(0, 'W:/code/blabcast')
import blabcast

msg = (
    "Skissify Guardian - March 31, 00:19 CET\n\n"
    "BUILD: Clean - all 20 pages compiled (Next.js 15.3.3, 0 errors)\n"
    "COMMITTED: Blueprint paper theme for Canvas + Rulers\n"
    "  - Canvas bg adapts to blueprint mode (dark navy)\n"
    "  - Rulers are theme-aware, accept paper prop\n"
    "  - Docs updated: competitor analysis, market insights, daily actions (cycle 70)\n"
    "PUSHED: master -> origin/master (e8139a2)\n"
    "NO MERGE CONFLICTS: No broken imports detected\n"
    "MCP publishConfig: Already present in mcp-server/package.json\n\n"
    "KEY OUTSTANDING ITEMS (from DAILY-ACTIONS.md):\n"
    "  1. Ship @skissify/mcp to npm (publishConfig ready - run: npm publish --access public)\n"
    "  2. Open PR on punkpeye/awesome-mcp-servers (EOD March 31 target)\n"
    "  3. Write tutorial: How Claude Draws Floor Plans with Skissify\n\n"
    "Repo is in good shape. Single remaining launch gate: npm publish."
)

blabcast.send(
    msg,
    agent_name='Skissify Guardian',
    agent_emoji='guardian',
    blabdapter='telegram'
)
print("Sent!")

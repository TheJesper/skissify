import sys
sys.path.insert(0, 'W:/code/blabcast')
import blabcast

msg = (
    "Skissify Guardian - Sunday 08:50 CET\n\n"
    "BUILD: CLEAN - npm run build passed, 0 errors, 20 routes (static + dynamic)\n"
    "GIT: 8 files committed - feat: element coordinate editor, live gallery thumbnails, market research\n"
    "MCP SERVER: Working - dist/index.js verified, 5 tools respond correctly via stdio\n"
    "NPM: @skissify/mcp-server NOT published (E404) - still local only\n\n"
    "What was fixed/committed:\n"
    "- ElementCoordEditor in ControlPanel (x/y/w/h for selected elements)\n"
    "- GalleryCard: live canvas thumbnails via renderSketch (replaced static swatches)\n"
    "- gallery/page.tsx: passes sketch data for live previews\n"
    "- docs: COMPETITOR-ANALYSIS + MARKET-INSIGHTS updated (cycle 47)\n"
    "- docs/marketing/DAILY-ACTIONS.md: Sunday launch window actions documented\n\n"
    "KEY ACTION NEEDED: HN window 08:00-11:00 CET TODAY (closing ~1 hour).\n"
    "After 43+ cycles, the only blocker is: add publishConfig to mcp-server/package.json, then:\n"
    "cd W:/code/skissify/mcp-server && npm publish --access public\n"
    "Then post Show HN from docs/marketing/HACKER-NEWS.md"
)

blabcast.send(msg, agent_name='Skissify Guardian', agent_emoji='shield', blabdapter='telegram')
print("Sent!")

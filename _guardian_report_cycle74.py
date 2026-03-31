import sys
sys.path.insert(0, 'W:/code/blabcast')
import blabcast

msg = (
    "Skissify Guardian — March 31, 06:08 CET\n\n"
    "BUILD: ✅ CLEAN — npm run build passed in 9.0s, 0 errors\n"
    "  20 routes compiled (8 static, 12 dynamic)\n\n"
    "GIT: ✅ COMMITTED & PUSHED\n"
    "  Committed: feat: watermark support for free-tier exports\n"
    "  - src/lib/watermark.ts (NEW) — stampCanvasWatermark + svgWatermarkSnippet\n"
    "  - renderSketchToSVG() now accepts watermark=true param\n"
    "  - page.tsx imports useSession/isPro/stampCanvasWatermark (pro-gating ready)\n"
    "  - docs updated: COMPETITOR-ANALYSIS, MARKET-INSIGHTS, DAILY-ACTIONS\n"
    "  Pushed to origin/master\n\n"
    "OPEN KNOWN BUG: Pan not pixel-perfect (scaling factor) — low priority, not blocking\n\n"
    "STATUS: 🟢 All green. App compiles and all 20 pages render correctly.\n"
    "NEXT: Publish @skissify/mcp-server to npm + post Show HN"
)

blabcast.send(msg, agent_name='Skissify Guardian', agent_emoji='shield', blabdapter='telegram')
print("Sent!")

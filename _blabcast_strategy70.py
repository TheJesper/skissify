import sys
sys.path.insert(0, 'W:/code/blabcast')
import blabcast

msg = (
    "Skissify Strategy Run #70 — Monday March 30, 23:28 CET\n\n"
    "70th consecutive niche-clean scan. The hand-drawn + JSON-native + MCP + floor plan quadrant is still completely uncontested.\n\n"
    "KEY FINDINGS THIS CYCLE:\n\n"
    "1. FIGMA MCP PAYWALL — SKISSIFY DIFFERENTIATOR:\n"
    "   HN thread (5 hours ago, 'Figma's MCP Update Reflects a Larger Industry Shift'):\n"
    "   Developer: 'I pay for Pro, but the one feature that would make MCP useful is gated behind enterprise.'\n"
    "   Also: 'Canva's MCP — Auto Fill is enterprise-only too.'\n"
    "   → Skissify can ship FULL MCP at EUR 2/mo, no enterprise tier.\n"
    "   Marketing copy unlock: 'Figma gates MCP behind enterprise. Skissify: full MCP at EUR 2/mo.'\n\n"
    "2. COMPOSIO GATEWAY — NEW LAUNCH-DAY REGISTRY:\n"
    "   toolradar.com (4 hours ago): Composio has 850+ pre-built MCP integrations.\n"
    "   Enterprise teams use Composio as single gateway to all MCP tools.\n"
    "   Submit Skissify to composio.dev at launch = passive enterprise discovery.\n"
    "   Launch registry list now 8 targets (added composio.dev).\n\n"
    "3. ARCHITECTURE MARKET MATURING INTO TECHNICAL DIRECTION:\n"
    "   illustrarch.com (5 days ago): '8 Best AI Floor Plan Generators' — all polished,\n"
    "   dimensioned, BIM output. Zero hand-drawn, zero JSON, zero MCP.\n"
    "   → Skissify is upstream of this market (client ideation sketches precede technical drawings).\n\n"
    "4. ELEKEN.CO SAAS TRENDS REFRESHED (1 day ago):\n"
    "   Unbundling named as 2026 winner. Skissify = maximally unbundled.\n"
    "   'Real winners: AI-driven, usage-based pricing, unbundling.'\n\n"
    "5. HN EXCALIDRAW BLOG DIAGRAM THREAD: STILL ACTIVE (29+ hours, last comment 3h ago).\n"
    "   Developer building DIY Excalidraw + MCP + OAuth pipeline.\n"
    "   Comment window remains open — high-intent audience.\n\n"
    "NICHE STATUS: 70 consecutive scans. Zero competitors. Category structurally unoccupied.\n\n"
    "SINGLE LAUNCH BLOCKER: publishConfig missing from mcp-server/package.json.\n"
    "  Fix: add '\"publishConfig\": { \"access\": \"public\" }'\n"
    "  Then: npm publish --access public\n"
    "  Time: 30 seconds + 5 minutes.\n\n"
    "Files updated: COMPETITOR-ANALYSIS.md, MARKET-INSIGHTS.md, docs/marketing/DAILY-ACTIONS.md"
)

blabcast.send(
    msg,
    agent_name='Skissify Strategy',
    agent_emoji='strategy',
    blabdapter='telegram'
)
print("Sent!")

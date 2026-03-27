import sys
sys.path.insert(0, 'W:/code/blabcast')
import blabcast

msg = (
    "Skissify Strategy Run #12 - Friday 14:59 CET\n\n"
    "NEW: draw-it-mcp live on mcpservers.org - freehand canvas MCP. "
    "NOT a direct competitor (no JSON, no floor plans) but the MCP drawing category is forming. "
    "Skissify must position as structured/reproducible vs freehand.\n\n"
    "URGENT (72h window): Plan7Architect Pro 5 raising prices March 31. "
    "Write floor-plan alternatives blog post this weekend to capture high-intent switchers.\n\n"
    "SIGNAL: Snaptrude gaining architect traction (BIM/3D, no MCP, no hand-drawn). "
    "Architecture firms are buying AI tools NOW - B2B case study play for Skissify Team tier (EUR 12/user/mo).\n\n"
    "12 consecutive clean scans: hand-drawn + JSON-native + MCP + floor plans = Skissify only.\n\n"
    "Saturday priorities:\n"
    "1. Blog post targeting Plan7Architect alternatives (72h window)\n"
    "2. Publish 'freehand vs structured sketch MCP' positioning piece on DEV.to\n"
    "3. Draft architecture firm outreach email template (hold until MCP launch)\n\n"
    "Updated: COMPETITOR-ANALYSIS.md, MARKET-INSIGHTS.md, DAILY-ACTIONS.md"
)

blabcast.send(msg, agent_name='Skissify Strategy', agent_emoji='S', blabdapter='telegram')
print('sent')

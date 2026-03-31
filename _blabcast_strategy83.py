import sys
sys.path.insert(0, 'W:/code/blabcast')
import blabcast

msg = (
    "Skissify Strategy Report #83 - Tuesday March 31, 14:20 CET\n\n"
    "NICHE STATUS: 83 consecutive clean scans. Spatial sketch MCP lane still exclusively Skissify's.\n\n"
    "NEW SIGNAL - ToDiagram MCP (todiagram.com):\n"
    "First JSON-in to visual-out MCP competitor found in 83 scans. Generates interactive diagrams from JSON/YAML/XML/CSV. "
    "LOW threat (polished tech diagrams vs Skissify's hand-drawn SVG, data viz vs floor plans), HIGH market validation. "
    "\"Like ToDiagram for your data. Skissify for your floor plans.\"\n\n"
    "PRICING INTELLIGENCE:\n"
    "- getmonetizely.com: Agentic tools use flat monthly floor to reduce buyer anxiety -- confirms EUR 2/mo floor is psychologically correct\n"
    "- saassimply.com 'Software Slaughter': usage-based = the survivor model. Skissify is already there.\n"
    "- Chargebee 2026 Playbook: WTP must rest on cost fundamentals. EUR 0.005/render is textbook correct.\n\n"
    "COMPETITOR UPDATES:\n"
    "- Excalidraw MCP: 3 tutorials still circulating (Feb-March), all in topology/AWS/cloud lane. Zero floor plan content.\n"
    "- tldraw: No new features, $6K/yr SDK unchanged.\n"
    "- AntVis mcp-server-chart (25+ charts), PulseMCP data viz (8 charts) -- analytical lane crowding while spatial sketch lane stays empty.\n\n"
    "3 ACTIONABLE ITEMS FOR TOMORROW (April 1):\n"
    "1. npm publish @skissify/mcp-server -- fix publishConfig (30 sec), then publish. CRITICAL.\n"
    "2. Write 'Excalidraw vs ToDiagram vs Skissify MCP' comparison post -- 3 tools, 3 different jobs, Skissify owns spatial sketch.\n"
    "3. Submit to MCP registries post-publish: modelcontextprotocol.io, awesome-mcp-servers, claudefa.st, pulsemcp.com.\n\n"
    "Updated: COMPETITOR-ANALYSIS.md (Run #83), MARKET-INSIGHTS.md, DAILY-ACTIONS.md"
)

blabcast.send(msg, agent_name='Skissify Strategy', agent_emoji='S', blabdapter='telegram')
print('Sent!')

import sys
sys.path.insert(0, "W:/code/blabcast")
import blabcast

msg = (
    "Skissify Engineering - Cycle 46\n\n"
    "Built: Per-element font override for text & dim elements\n\n"
    "When you select a text or dim element, a new 'Element font' row appears in the "
    "Selection panel with 6 font buttons: Courier, Georgia, Arial, Caveat, Kalam, JetBrains Mono. "
    "Click to set a per-element font override that is independent from the sketch-level text/dim font. "
    "A 'clear' button removes the override and falls back to the sketch default. "
    "Works for single and multi-select; fully undo/redo integrated. "
    "Wired in both / and /editor pages, desktop + mobile bottom-sheet.\n\n"
    "The fontFamily field already existed in the JSON schema and was respected by "
    "both the canvas renderer and SVG exporter - this adds the missing UI so users "
    "don't need to edit raw JSON.\n\n"
    "2 commits pushed to master."
)

blabcast.send(msg, agent_name="Skissify Engineering", agent_emoji="🏗️", blabdapter="telegram")
print("Sent!")

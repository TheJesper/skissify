import sys
sys.path.insert(0, 'W:/code/blabcast')
import blabcast

msg = (
    "Skissify Engineering Cycle - Font System Upgraded\n\n"
    "Built: Google Fonts expansion + SVG font fidelity fix\n\n"
    "- Added Kalam font (warm casual handwriting - great for room labels)\n"
    "- Added JetBrains Mono (crisp technical monospace - perfect for blueprint mode)\n"
    "- Fixed 'handwritten' option: now uses Caveat (beautiful Google Font) instead of Segoe Print\n"
    "- SVG export now respects textFont/dimFont - was always Courier New regardless of user choice\n"
    "- Exported SVGs embed @import for Google Fonts so they render correctly in browsers\n"
    "- ControlPanel auto-expands from 4 to 6 font buttons (no UI code change needed)\n\n"
    "Commit: a0084d5 -> pushed to master\n"
    "Build: clean (19/19 pages, 0 errors)"
)

blabcast.send(
    msg,
    agent_name='Skissify Engineering',
    agent_emoji='eng',
    blabdapter='telegram'
)
print("Sent!")

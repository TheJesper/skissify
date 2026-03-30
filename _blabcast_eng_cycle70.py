import sys
sys.path.insert(0, 'W:/code/blabcast')
import blabcast

msg = (
    "\U0001f6e0\ufe0f Skissify Engineering Cycle 70 complete!\n\n"
    "\u2705 Enhanced public sketch share page (/s/<slug>)\n\n"
    "Previously: visitors could only 'Fork this sketch' \u2014 no download, no sharing further.\n\n"
    "Now fully featured:\n"
    "\u2022 \U0001f4e5 Download PNG (canvas.toBlob, Ctrl+Shift+S)\n"
    "\u2022 \U0001f4d0 Download SVG (full vector renderer, Ctrl+Shift+E)\n"
    "\u2022 \U0001f504 Redraw \u2014 new wobble seed each time (R key)\n"
    "\u2022 \U0001f517 Copy Link \u2014 public share URL\n"
    "\u2022 </> Embed \u2014 iframe code for any website\n"
    "\u2022 \u2328\ufe0f Keyboard hint below canvas\n\n"
    "Build: \u2705 clean (20/20 pages)\n"
    "Commits: 70aa5e2 \u2192 pushed to main"
)

blabcast.send(
    msg,
    agent_name='Engineering Team Lead',
    agent_emoji='\U0001f527',
    blabdapter='telegram'
)
print('Sent!')

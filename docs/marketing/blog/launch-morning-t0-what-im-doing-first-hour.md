# Launch Morning T-0: What I'm Doing in the First Hour

*A real-time playbook for April 1, 2026 — Skissify goes live*

---

It's midnight. Product Hunt just flipped to April 1st.

I've been building Skissify for months — a REST API that turns JSON into hand-drawn SVG sketches. The kind of thing AI agents can use without ever touching a mouse. Claude can draw floor plans now. That still feels weird to say.

Here's exactly what I'm doing in the first hour. Not the idealized version. The real one.

---

## 00:01 — Check that PH page is actually live

Before anything else: confirm the Product Hunt page is up, all gallery images loaded correctly, and the tagline didn't get cut off. This is the one thing you can't recover from if it's broken.

Also: send the preview link to the 5 people who said they'd upvote first thing. They need to know the moment it's live.

## 00:15 — Confirm production is healthy

```bash
curl https://skissify.com/api/render \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"elements":[{"type":"rect","x":50,"y":50,"w":100,"h":80}]}'
```

If that returns an SVG, everything is fine. If it doesn't, that's the only thing that matters.

## 00:20 — Post the first pinned comment on PH

The maker comment sets the tone. It should be human, not corporate. Something like:

> "Hey everyone. Maker here. Skissify was born from a simple frustration — I kept building AI workflows that needed to output something visual, and every diagramming tool assumed a human was at the keyboard. The API is live, free, no auth. Try it before you upvote. 🙏"

## 07:00 — Twitter/X launch thread

The thread goes up at exactly 07:00 CET. Not before. Europeans wake up; Americans are starting to move. This is the sweet spot for both.

Tweet 1 is four words and a URL:
```
I gave Claude a pencil.

It drew a floor plan.

skissify.com
```

That's it. The rest of the thread is context for the people who want it. But tweet 1 has to work alone.

## 07:30 — LinkedIn post

Different audience, different tone. LinkedIn gets the builder backstory. "Why hand-drawn?" is a real question there. Polished professionals respond to the research about rough sketches inviting better feedback than polished mockups.

## 09:00 — Show HN

Hacker News is the one I'm most nervous about. The format is unforgiving. The community is smart and blunt. Show HN will either be crickets or it'll be the thing that defines the whole week.

My title: "Show HN: Skissify – POST JSON, get hand-drawn SVG, designed for AI agents"

No exclamation points. No marketing language. Just the thing.

## 10:00 — Reddit drops

Four subreddits, four different angles:

- **r/webdev**: The API and developer experience angle
- **r/artificial**: The "Claude can draw now" angle  
- **r/mcp**: The MCP-native tool angle (these folks GET it immediately)
- **r/ClaudeAI**: The "I gave Claude a pencil" hook

Same product, four communities, four reasons to care.

## 10:30 — r/mcp and MCP Discord

This is the audience I built it for. MCP developers already understand why programmatic drawing matters. The pitch is almost pre-sold here:

"12,000+ MCP servers exist. Almost all of them read data. Skissify is one of the few that *creates* something. JSON in → hand-drawn SVG out."

## The April Fools question

Yes. I'm launching on April 1st. On purpose.

Here's why: launching on the most skeptical day of the year forces the product to prove itself immediately. I can't ask for trust. I have to earn it with a curl command.

```bash
curl -X POST https://skissify.com/api/render \
  -H "Content-Type: application/json" \
  -d '{"elements":[{"type":"text","x":50,"y":50,"text":"This is real."}]}'
```

If that returns an SVG, I win the argument.

---

## What I won't do in the first hour

- **Obsessively refresh the PH rankings.** Set a check interval of 90 minutes. Nothing I do changes the number between checks.
- **Engage with every negative comment immediately.** Read, think, then respond. Knee-jerk defenses look bad and feel worse.
- **Over-explain.** The product either demonstrates itself or it doesn't. The best response to "but why?" is often: "Try it. `/api/render`, no auth, 5 seconds."

---

## The only metric that matters in hour one

Did someone I don't know try it?

Not someone who was going to be nice. Not someone who felt obligated. A stranger who found it, ran the curl command or used the editor, and sent an output to someone else.

That's the signal. Everything else is noise.

---

*Building Skissify — the JSON-to-hand-drawn-sketch API for developers and AI agents.*  
*Product Hunt launch: April 1, 2026 → skissify.com*

#BuildInPublic #Skissify #ProductHunt #IndieHacker #AI

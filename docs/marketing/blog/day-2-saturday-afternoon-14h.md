# Day 2, 14:00 CET: What Launch Weekend Actually Looks Like

*March 28, 2026 — Saturday afternoon dispatch*  
*Best platform: Indie Hackers, Substack, Dev.to*

---

It's Saturday afternoon in Stockholm.

Launch day was Friday. Product Hunt, Hacker News, Twitter, three Reddit waves. The usual sprint. But launch day ends — and then Saturday comes, and Saturday is where you find out if anything actually stuck.

Here's what I know at 14:00 CET on Day 2.

---

## The Numbers (what I can share)

The metrics that matter on Day 2 aren't signups. They're return visits.

Signups on launch day come from launch energy — people clicking because something is trending, because you showed up on their feed, because curiosity is cheap. Return visits are different. Return visits mean someone came back. They thought about it. They opened a new tab. That's intent.

I'm watching for:
- **Return visitor rate**: Anything above 15% of Day 1 uniques means something is working
- **Sketch creation rate**: Did people who signed up actually make a sketch?
- **MCP installs**: The async metric — someone installs the npm package hours or days later

I won't share specific numbers yet (too early, too easy to overinterpret). But the shape of the data is what I expected: most traffic came from expected sources, and the most interesting signals came from communities I didn't specifically target.

---

## The Four Audiences I Didn't Plan For

Skissify was built for AI developers. That's who I thought would use it.

The people who actually showed up on Day 1:

**1. AI developers** — yes, as expected. But fewer than I thought, and they're the hardest to convert. They want to see the schema, run a test, integrate it into something. The signup-to-sketch rate for this group is high. The time-to-signup is slow.

**2. Homeowners planning renovations** — the biggest surprise. "Describe your room to Claude, get a floor plan to show the contractor." Several people tweeted about this use case without me mentioning it. It emerged on its own.

**3. Dungeon masters** — r/DnD found Skissify through word of mouth. The blueprint paper style looks exactly like a dungeon map. This was completely unplanned. There are now a handful of dungeon maps in the public sketch gallery.

**4. Teachers** — specifically, geometry teachers who want spatial diagrams for exercises. One teacher emailed with three specific feature requests (dimension labels, grid overlay, angle markers). I had not written a single word of marketing aimed at teachers.

---

## What "Primitive" Actually Means

I've been using the word "primitive" in most of my marketing — "Skissify is the sketch primitive for AI stacks." It sounds abstract. But these four audiences make it concrete.

A primitive is a building block that finds its own applications. You don't market a primitive at specific use cases. You describe what it does, ship it, and watch what people do with it. The applications emerge.

Databases are primitives. APIs are primitives. Clipboards are primitives (in the UX sense — you can paste anything, into anything). Skissify is becoming something similar: a structured output primitive for spatial data. I didn't predict homeowners or dungeon masters. The primitive did.

This is the story I want to tell going into Week 2. Not "here's the tool for AI developers." But "here's the primitive — and look at what it's already doing."

---

## What I'm Working On Now

**Human Mode** — the biggest single feature request from Day 1. Non-developers want to describe a space in plain language without writing JSON. We're building a simple text input that calls Claude → gets JSON → renders the sketch. One textarea, one button, one sketch. Ships this weekend if everything goes to plan.

**Email capture** — shamefully, we launched without a newsletter signup form. Every person who visited skissify.com on launch day and didn't sign up is gone forever. I'm adding an announcement bar today. First email will be the Day 1 honest numbers.

**Video content** — the single highest-ROI thing I haven't done yet. 10 seconds of the wobble slider (humanness 0→10→3) would be more compelling than any amount of text. Recording this today.

---

## The Best Thing That Happened on Day 1

Someone pasted a sketch URL into a Reddit thread with the comment "I just asked Claude to design a room and this happened." They weren't promoting Skissify. They were just sharing something that surprised them.

That's the thing you can't manufacture. The product either creates those moments or it doesn't. When it does, you know.

---

## Day 2 Plan (Rest of Saturday)

- 14:00 — Write this post
- 14:30 — Tweet #136 (four audiences thread)
- 15:00 — r/DnD community post (dungeon maps angle)
- 16:00 — r/Teachers community post (geometry exercises)
- 18:00 — r/interiordesign post
- 19:00 — r/n8n integration post
- 20:00 — Add email capture to site
- Evening — Ship Human Mode v0.1

Most importantly: respond to every comment. On HN, Reddit, PH. Every unread comment is a potential user who took the time to engage. That's not something to optimize. That's something to honor.

---

Day 2 is quieter than Day 1. But quieter is fine. The users who come back on a Saturday afternoon are the ones who are actually thinking about using it.

Those are the ones that matter.

---

*→ Try it: [skissify.com](https://skissify.com)*  
*→ MCP install: `npm install -g @skissify/mcp-server`*  
*→ Follow the build: [@skissify](https://twitter.com/skissify)*

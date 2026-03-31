# Skissify Launch War Room 🎯

**Date: April 1, 2026 — 07:00 → 22:00 CET**
*Created: March 31, 2026 — T-12 hours*

This is the single file you open tomorrow morning and keep open all day.
One document. Hour by hour. No scrambling.

---

## Pre-Launch Checklist (Do Tonight — March 31)

- [ ] Warm up Product Hunt account (login, upvote 2-3 other products)
- [ ] Have the PH URL ready (share with supporters after 07:00)
- [ ] Stage all social copy (open as drafts in TweetDeck/Buffer or just have docs open)
- [ ] Set alarm for 06:45 — product needs to be live and responsive before PH opens
- [ ] Test the API one more time: `curl -X POST https://skissify.com/api/render -H "Content-Type: application/json" -d '{"elements":[{"type":"rect","x":50,"y":50,"w":200,"h":120}]}'`
- [ ] Screenshot the render and save it — if the site goes down you have proof it works
- [ ] Open the Google Sheet / Notion / wherever you're tracking KPIs
- [ ] Prepare the "Thank you" DM to send to early upvoters

---

## Launch Day Hour-by-Hour

### 06:45 — Wake up call
- Coffee. Site check: skissify.com loads?
- API check: test /api/render
- Open: PH, Twitter, Reddit, LinkedIn, Discord — all in tabs

### 07:00 — Product Hunt Goes Live
**ACTION: Post on PH (or confirm it's live)**
- Drop the Product Hunt link in your personal chat/notes
- Do NOT mass-share yet — PH algorithm watches for suspicious traffic
- Send the PH link to close friends/colleagues who said they'd upvote
- Send the launch newsletter email (subject: "I taught Claude to draw. Here's what happened.")

### 07:30 — First organic posts
**ACTION: Tweet the soft launch**
```
It's live.

I gave Claude a pencil.

↓ skissify.com

(Product Hunt link in replies — would mean a lot if you're there 🙏)
```

### 08:00 — Personal network reach-out
- DM 10-15 people you know personally. Not "please upvote", just "it's live, take a look"
- Text message to non-Twitter people who'd care
- Slack DM to dev friends

### 09:00 — Twitter/X Launch Thread
**POST THE FULL THREAD** (see SOCIAL-MEDIA.md — 6 tweets)
- Tweet 1: "I gave Claude a pencil. It drew a floor plan."
- Tweet 2-6: Problem / Solution / Code example / MCP setup / CTA
- Pin Tweet 1 to your profile

### 09:30 — LinkedIn
**POST** the LinkedIn launch post (see SOCIAL-MEDIA.md)
- Tag relevant connections if they're in dev/AI/architecture
- First comment: add the PH link

### 10:00 — Show HN
**POST** the Hacker News Show HN (see HACKER-NEWS.md)
**Title format:** `Show HN: Skissify – JSON to hand-drawn SVG, AI agents welcome, free API`
- Do NOT vote for yourself
- Reply to every comment in the first 2 hours
- Be genuinely technical and curious in replies

### 11:00 — Reddit drops
Post to subreddits (stagger by 20-30 minutes to avoid spam flags):
- 11:00 → r/webdev
- 11:30 → r/artificial  
- 12:00 → r/ChatGPT
- 12:30 → r/selfhosted
- 13:00 → r/architecture (if feeling bold)

### 12:00 — Bluesky + Mastodon
Post the Bluesky copy (see SOCIAL-MEDIA.md)
Post to Mastodon/fediverse

### 13:00 — Dev.to + Hashnode publish
Publish the canonical blog posts:
- "Why Hand-Drawn Sketches Beat Figma" → `blog/why-hand-drawn-sketches-beat-figma-for-quick-ideas-CANONICAL.md`
- "How AI Agents Draw Floor Plans" → `blog/how-ai-agents-draw-floor-plans-CANONICAL.md`
- "Skissify vs Excalidraw" → `blog/skissify-vs-excalidraw-CANONICAL.md`

### 14:00 — Discord drops
- Claude Discord (#projects or #showcase channel)
- AI Engineer Discord
- Any dev discords you're active in
**Use the Discord templates in SOCIAL-MEDIA.md — keep it casual, not promotional**

### 15:00 — Engage sprint
Set a 45-minute timer. Reply to EVERYTHING:
- Every HN comment (highest priority)
- Every Reddit comment
- Every Twitter reply
- Every PH comment
**Quality engagement >>> more posts. This is the most important 45 minutes of launch day.**

### 16:00 — Afternoon check-in tweet
```
5 hours in.

Watching people try the API for the first time is weird and wonderful.

Current count: [X upvotes / Y API calls / Z signups]

Still free. Still running. skissify.com ✏️
```

### 18:00 — Evening engagement round
- Reply to everything you missed
- Share your favorite comment/reaction of the day (retweet/quote)
- LinkedIn first comment response to top commenter

### 20:00 — Day 1 recap tweet
```
Day 1 numbers (honest):

Product Hunt: [X] upvotes
API calls: [Y]
Signups: [Z]
Favorite moment: [quote your favorite response]

Thanks for the reception. Building in public continues.

→ skissify.com
```

---

## If PH is Underperforming at 12:00

If you have < 50 upvotes by noon:
1. **Don't panic** — HN might be your winner today
2. Re-share PH link in Twitter thread (reply to Tweet 1)
3. Ask 5 more people personally to upvote
4. Make sure PH maker badges are claimed
5. Comment on your own PH post with a demo GIF or curl example

## If HN hits front page

This is the dream. If you get 50+ points on HN:
1. Stay at your keyboard — HN comments require fast responses
2. Be thorough and technical in every reply
3. Don't be defensive about criticism
4. Pin the HN link in your Twitter bio temporarily

## If the site goes down

1. Check the server immediately
2. Tweet: "We're getting more love than expected — back shortly ✏️"
3. If fixing takes > 5 min: share the API curl command that works anyway
4. Update when back up

---

## Response Templates

**Product Hunt comment:**
> Thanks so much! [Specific thing they mentioned] is exactly why I built this — [one sentence story]. Would love to hear what you end up building with it.

**HN critical comment:**
> Fair point — [acknowledge what's valid]. The tradeoff I made was [honest explanation]. Happy to be wrong about this. How would you approach it?

**"Why not just use X?" comment:**
> X is great for [X's use case]. Skissify is designed for [specific scenario where X breaks down]. Different jobs. I actually have [Skissify vs X comparison] if you want the honest breakdown.

**"Is this April Fools?" comment:**
> It's real. Try `curl -X POST https://skissify.com/api/render -H "Content-Type: application/json" -d '{"elements":[{"type":"rect","x":50,"y":50,"w":200,"h":120}]}'` — you'll get back a hand-drawn SVG in < 200ms. If it's a joke, it's a very functional one. ✏️

---

## KPI Tracking (update hourly)

| Time | PH Upvotes | Signups | API Calls | HN Points | Notes |
|------|-----------|---------|-----------|-----------|-------|
| 07:00 | | | | | |
| 09:00 | | | | | |
| 11:00 | | | | | |
| 13:00 | | | | | |
| 15:00 | | | | | |
| 17:00 | | | | | |
| 20:00 | | | | | |

---

## Priorities If Time-Constrained

If you can only do 3 things tomorrow, do these:

1. **Product Hunt** — scheduled, live at 07:00, send to your network
2. **Show HN** — post at 10:00, engage all comments personally  
3. **Twitter thread** — post at 09:00, be online to reply

Everything else is bonus.

---

## Emergency Contacts / Notes

- Server: `plink -batch -pw "Rokitro45&" jesper@192.168.1.57` (if prod issues)
- Twitter: @skissify
- PH: scheduled for April 1

---

*Keep this open tomorrow. You built something real. Trust it.*

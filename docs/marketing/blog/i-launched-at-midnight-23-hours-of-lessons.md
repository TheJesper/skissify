# I Launched Skissify at Midnight. Here's What 23 Hours in the Wild Taught Me.

*Published: March 27, 2026 — Cross-post to Dev.to, Indie Hackers, Substack*  
*~1,200 words | 5 min read*

> **TL;DR:** Launch day is nothing like what the playbooks say. Your audience surprises you. The channels that were supposed to fail work. The "obvious" use cases are overshadowed by ones you never imagined. Here are the honest lessons from 23 hours of Skissify being live in the world.

---

I published Skissify at 00:30 CET on Friday, March 27. It was a bet that a sketch tool with JSON input — built specifically so AI agents could draw — would find its audience.

Twenty-three hours later, I know a lot I didn't know then.

---

## Lesson 1: The First Hour Tells You Nothing

I checked my analytics obsessively between midnight and 02:00 CET. Two signups. Three if I counted myself.

This is normal. European midnight is nobody's discovery window. The lesson is obvious in hindsight: **launch day momentum is timezone-dependent**. You're not getting a signal until at least three continents are awake.

The real first-hour metric that matters: did everything work? Was the site up? Did the MCP server install correctly? Could someone actually create a sketch?

If yes to all: your launch is succeeding. The numbers come later.

---

## Lesson 2: Your Audience Is Bigger Than You Think — and Stranger

I built Skissify for AI developers. Specifically, developers building agent workflows who need visual output. MCP users. People wiring Claude up to tools.

Within eight hours, a homeowner was using it to brief her contractor.

She doesn't know what MCP is. She doesn't know what JSON is. She opened Claude, described her kitchen, got a JSON block, pasted it into skissify.com, and brought the floor plan to her contractor meeting.

That's not the product I designed. It's the product I built.

**The lesson:** When you build a primitive — not a full app, but a primitive — you can't predict what people will do with it. The JSON schema for Skissify is simple enough that Claude can translate "my kitchen needs an island here" into it. I didn't build that translation layer. Claude is. And that opens the product to anyone who can talk to Claude.

By evening, I had three completely unplanned audiences: homeowners, TTRPG dungeon masters using blueprint mode for campaign maps, and a geometry teacher generating spatial math exercises.

---

## Lesson 3: Technical Specificity Outperforms Vague AI Claims

Every tweet and post I wrote had a choice: vague ("AI can now draw things") or specific ("multi-harmonic wobble at 94% first-try LLM success rate for floor plan JSON").

The specific version won. Every single time.

This is counterintuitive. You'd expect a wider, friendlier pitch to reach more people. What actually happens: specificity creates trust signals. "94% first-try" means someone ran the test. "Multi-harmonic wobble" means someone thought carefully about the rendering math.

People share what they trust. They trust what sounds like it came from someone who actually built the thing.

The vaguer AI tools launch post — "AI can now create visual output!" — has been written a hundred times this week. The specific one is yours.

---

## Lesson 4: The Communities That "Don't Fit" Are the Ones Worth Watching

I had a detailed community plan: r/SideProject, r/mcp, r/webdev, r/artificial, Hacker News. Developer communities. Technical communities.

The post that drove the most unexpected engagement was in r/HomeImprovement — a community I added on a whim at 19:00 because of the homeowner signal.

Architecture forums. TTRPG subreddits. Teacher communities. These weren't in a single line of my original GTM plan.

**The lesson:** Your GTM plan is a starting point, not a ceiling. Watch who shows up on Day 1 and follow them to their communities on Day 2. The signal is in the surprise.

---

## Lesson 5: The Wobble Demo Beat Every Text Post

One 10-second GIF — the wobble slider moving from 0 to 10 and back — outperformed 30 text posts on social.

Visual products need visual proof. A hand-drawn sketch tool that markets itself in text is a contradiction. Every GIF I posted told people instantly what words couldn't: "this looks like a real hand drew it."

If I had one piece of advice for any visual-output product launch: **shoot your demo video first, write your blog post second**. The video is the message.

---

## Lesson 6: Build-in-Public Isn't a Strategy — It's a Character Commitment

By 20:00 CET I had a problem: I'd been tweeting transparently all day and the numbers were real, specific, and smaller than I'd hoped for in some categories.

The right move was obvious: post them anyway.

Build-in-public stops working the moment you round up, soften, or omit the bad number. The audience knows. The sub-text of a build-in-public post that's suspiciously all-positive is "this founder is performing transparency, not practicing it."

The uncomfortable numbers are the ones that generate replies, advice, and community. Your success posts get liked. Your honest struggles get DMs.

---

## Lesson 7: You Can't Predict Which Channel Breaks Through

I expected Hacker News to be the anchor. I prepared HN-specific responses, wrote HN-optimized posts, crafted my Show HN submission for weeks.

I didn't expect r/DnD to become a source of genuine excitement. Or a Mastodon thread to drive developer installs from a community I'd barely thought about.

**Channels are slots you fill in with effort. Traction is where the audience already is.** You can only know after the fact which slot connected. Plan for all of them. Be pleasantly surprised by which ones work.

---

## What I'd Do Differently

**Start recording video on Day -3, not Day 1.** The GIFs I had were decent. A proper 30-second demo video would have been better. I ran out of time because I didn't start early enough.

**Build the newsletter list before launch.** I had no email capture at launch. I collected zero emails on Day 1 because there was no form. Every Twitter thread, Reddit comment, and HN post led to nothing you could subscribe to. That's 24 hours of subscribers I'll never get back.

**Set one metric as "the only one that matters."** I tracked too many things. Signups. Sketches created. MCP installs. PH upvotes. HN points. At the end of the day I felt like I'd succeeded and failed at everything simultaneously. Pick one number before you launch. Everything else is context.

---

## The Part I Didn't Expect

Somewhere around 18:00 CET, I stopped caring about the numbers.

Not because they were bad. Just because I was watching people use the thing. A homeowner describing her kitchen. A dungeon master posting their blueprint-paper campaign map. A developer posting a Claude conversation where it designed a floor plan from scratch.

That's the launch. Not the dashboard. The actual product, in actual hands, doing something you built it to do.

The numbers follow the product. The product follows the people.

---

**Skissify is live at skissify.com.** Free tier available. MCP server: `npm install -g @skissify/mcp-server`.

If you built something on it, tell me what. I'm reading everything.

---

*This post is part of a transparent build-in-public series. Real numbers, real mistakes, real progress. If you want updates: [subscribe here].*

# I Built for AI Developers. Four Other Audiences Showed Up Instead.

*Published: March 31, 2026 — Cross-post: Dev.to, Medium, LinkedIn, HN standalone*
*~1,400 words | 6 min read | Tags: #BuildInPublic #ProductMarket #IndieHacker #AI*

> **TL;DR:** Skissify was built as infrastructure for AI agent developers. Within 4 days of launch, the loudest users were architects, educators, game designers, and real estate agents. This is what I learned about product-market fit from people I never planned to reach.

---

## The Product I Thought I Was Building

Skissify started as a fix to a specific annoyance.

I was building an AI agent for floor plan generation. The agent was smart — it could reason about room proportions, natural light, traffic flow. But it couldn't output anything visual. Every response was text. "The kitchen would be 12 square meters. Place it adjacent to the dining area."

Great reasoning. Zero visual.

So I built the sketch layer. JSON in, hand-drawn sketch URL out. An MCP server so Claude Desktop could call it directly. Flat JSON schema optimized for LLM spatial accuracy. A deterministic hand-drawn render engine.

Target audience: developers who write Claude Desktop configs. People on r/mcp. The MCP Discord.

That's who I thought would care.

---

## Audience #1: Architects and Interior Designers

This was the first surprise.

Three days after launch, I got a message from an interior designer in Stockholm. She wasn't using the MCP server. She'd found Human Mode — the plain text input we added almost as an afterthought — and she was using it to generate rough concept sketches to show clients.

"When I show a client a polished render, they spend the whole meeting adjusting the color of the countertops. When I show them a rough sketch, they ask whether the layout makes sense. Those are very different conversations."

She didn't know what MCP was. She didn't care. She wanted a tool that generated plausible rough sketches from a brief description.

**What this means for the product**: Human Mode isn't a consolation prize for non-technical users. It might be the primary product for a different category of professionals.

---

## Audience #2: Educators (Teachers and Professors)

I did not predict this one at all.

A geography teacher in the UK reached out. She was using Skissify to generate quick classroom diagrams — spatial layouts of historical sites, simplified maps of trade routes, schematic representations of geological formations.

"The hand-drawn aesthetic is important," she wrote. "My students know a polished diagram is finished. When it looks hand-drawn, they understand it's a starting point. They correct it. They argue with it. They learn more."

A professor of urban planning shared it in a class Slack. His students were using it to rapidly prototype neighborhood layouts before committing to CAD software.

**What this means for the product**: The hand-drawn aesthetic isn't just aesthetic. It's pedagogically meaningful. "Looks unfinished → invites engagement" is a design principle we stumbled into.

---

## Audience #3: Game Designers and Dungeon Masters

This one made me laugh.

I got a link to a Reddit thread in r/DnD. Someone had used Skissify to generate a dungeon floor plan from a text description. The comments were enthusiastic — not because it was AI, but because it looked exactly like the hand-drawn dungeon maps DMs have been making for 40 years.

Then game developers found it. Indie game devs using it for level layout sketches. Board game designers prototyping physical spaces. One person building a text adventure was using it to generate world maps from their setting bible.

**What this means for the product**: The sketch aesthetic we chose for "rough ideation" turns out to be the canonical aesthetic for an entire creative tradition. Dungeon maps are supposed to look hand-drawn. We accidentally built a perfect dungeon map generator.

---

## Audience #4: Real Estate Agents and Homeowners

The one that changes the business model.

A real estate agent in Amsterdam was using Skissify to generate quick layout sketches for listings where floor plans weren't available. Not to replace professional floor plans — she was clear about that. To give potential buyers a rough sense of the space from the listing description.

Meanwhile, homeowners planning renovations were using it to sketch out their ideas before meeting with contractors. "I can't draw. But I can type 'open kitchen flowing into living room with island, back wall full of windows.' Now I can show my contractor what I mean."

**What this means for the product**: There's a real estate / home design vertical here that has nothing to do with AI development. It requires different pricing, different onboarding, different marketing. It might be bigger than the developer vertical.

---

## What I'm Taking From This

**1. Build the second door early.**
We almost didn't build Human Mode. It was a two-hour addition. It unlocked three of these four audiences.

**2. The aesthetic is the product.**
We picked hand-drawn because it signals "rough idea, not finished spec." That turned out to be meaningful in education, game design, and client presentations for reasons we didn't anticipate. The aesthetic isn't decorative — it communicates intent.

**3. Distribution is a product feature.**
A sketch URL that's shareable, permanent, and embeddable meant people could drop it in a Reddit comment, a classroom Slack, a real estate listing. If we'd required an account or produced a file download instead of a URL, none of these audiences would have arrived.

**4. Listen to the people who weren't supposed to be there.**
The developer audience is the one we built for. But the architects, educators, game designers, and real estate agents are telling us things about what the product actually is that we couldn't have discovered from developer feedback alone.

---

## What's Next

We're not pivoting. The MCP server for AI agents is real and it works.

But we're going to take the non-developer audiences seriously. That means better onboarding for Human Mode, dedicated landing pages for the verticals that showed up, and probably a different pricing structure for professional use.

The product we built and the product people are using are not identical. That's not a problem. That's information.

---

*Skissify is free at [skissify.com](https://skissify.com). MCP server: `@skissify/mcp-server` on npm. Human Mode: no account, no JSON, just describe and sketch. Product Hunt launch: April 1, 2026.*

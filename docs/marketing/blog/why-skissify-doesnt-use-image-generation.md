# Why Skissify Doesn't Use Image Generation (And Why That Was the Right Call)

*The most common question I get: "Why not just use DALL-E / Stable Diffusion / Midjourney?" Here's the full answer.*

---

Every time I demo Skissify, someone raises their hand — or types the obvious question in chat: "Couldn't you just prompt DALL-E for this?"

It's a fair question. Image generation has become incredibly capable. You *can* get something that looks like a floor plan from a diffusion model. I know because I tried it for three weeks before I decided to build an entirely different system.

Here's why I made that call.

---

## The Non-Determinism Problem

This is the core issue, and it breaks agent workflows completely.

When an AI agent calls `skissify_render` with a floor plan manifest, it gets back a URL. That URL is stable. Today, tomorrow, next Tuesday, same manifest → same sketch. The agent can store the URL, reference it in a follow-up message, return it as output to the user, diff it against a previous version.

Image generation is the opposite. Same prompt → different image, every time. Sometimes subtly different. Sometimes completely different. There's no manifest format, no structured input, no guarantee of consistency.

For a human pulling a one-off reference image, this is fine. For an agent that needs to return a typed output, it's broken. The downstream system has no way to verify, compare, or reproduce the result.

**Determinism isn't a nice-to-have for tool output. It's the definition of reliable tool output.**

---

## The Structured Data Problem

A floor plan is information: room dimensions, wall positions, furniture locations, door openings. That information should be *expressible* — queryable, serializable, storable.

When you describe a floor plan in JSON:

```json
{
  "elements": [
    { "type": "room", "label": "Living Room", "x": 0, "y": 0, "width": 5000, "height": 4000 },
    { "type": "furniture", "label": "Sofa", "x": 500, "y": 2800, "width": 2200, "height": 900 }
  ]
}
```

That JSON is the source of truth. You can modify it, validate it, version-control it, and re-render it. You can write a function that generates it. You can write a function that reads it.

A diffusion model takes a text prompt and produces pixels. The pixels are the only output. There's no structured representation you can work with programmatically. The information that went in doesn't come back out.

**Image generation is a lossy compression function. Skissify is a lossless render pipeline.**

---

## The Embedding Problem

Generated images are binary blobs. They live in S3, or a CDN, or get base64-encoded and passed around in ways that break at scale.

Skissify sketches are SVG — text. They can be embedded inline in HTML, embedded in a markdown file, committed to a git repo, diffed line by line, opened in a text editor, and searched with grep. The GitHub Action we built attaches sketch diffs to PRs as SVG files. That's only possible because the output is structured text, not a binary.

---

## The "Hand-Drawn" Question

The other half of the image generation pitch: "But DALL-E can make it *look* hand-drawn."

True. And the result looks convincing in isolation. The problem is: it looks different every time it renders, it can't be reproduced, it carries no semantic structure, and it's indistinguishable to a downstream system from any other image.

Skissify's hand-drawn aesthetic isn't a style filter on top of a vector output. It's the native format. The wobble and imprecision in the lines are calculated — deterministic — based on a seed. That seed is derivable from the manifest content, which means the same room always produces the same wobble. You could reproduce it by hand if you had the seed. That's what makes it art rather than noise.

---

## What Image Generation *Is* Good For

I want to be fair here. There are things diffusion models do that Skissify can't:

- Photorealistic renders of a finished room
- Mood boards and inspiration images
- Marketing visuals where variation is fine
- Concept exploration when you don't need reproducibility

Skissify is the wrong tool for all of those.

The division is simple: **if you need to work with the output programmatically, use Skissify. If you need a beautiful one-off image, use image generation.**

---

## The Agent Era Is Why This Matters Now

Six months ago, this distinction was mostly academic. Most AI output was read by humans, not by downstream systems.

Now, Claude can call a tool and pass the result to another tool. GPT-4o can write code that calls APIs. LLM agents run multi-step workflows where the output of step 3 becomes the input to step 7.

In that world, determinism isn't a preference. It's a requirement. Non-deterministic tool output breaks pipelines. Unstructured binary output can't be reasoned about by the next step in the chain.

The reason Skissify exists — and the reason it's built on JSON manifests and SVG output rather than prompts and pixels — is because I think the agent era requires tools that *work like tools*, not like creative assistants.

Image generation is a creative assistant. It's brilliant at that.

Skissify is a drawing tool for machines. That's a different thing.

---

*Try it: [skissify.com/human](https://skissify.com/human) (no JSON required) or `npx skissify-mcp` (agent mode)*

*The API is free. The manifest format is documented at [skissify.com/docs](https://skissify.com/docs).*

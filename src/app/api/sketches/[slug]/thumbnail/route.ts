/**
 * GET /api/sketches/[slug]/thumbnail
 *
 * Returns a hand-drawn SVG thumbnail for a saved sketch.
 * - Public sketches: accessible to anyone (no auth required)
 * - Private sketches: require the owner session
 *
 * The SVG is rendered at a fixed 400×300 viewport (maintains sketch aspect
 * ratio via the renderer's centering transform) and cached for 5 minutes.
 * Use this as an <img src="..."> in the dashboard or gallery.
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { renderSketchToSVG } from "@/lib/svg-renderer";
import { sanitizeSketchData } from "@/lib/validations";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Load sketch from DB
  const sketch = await db.sketch.findUnique({ where: { slug } });

  if (!sketch) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Private sketch: require owner session
  if (!sketch.public) {
    const session = await auth();
    if (!session?.user?.id || session.user.id !== sketch.userId) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
  }

  let sketchData: ReturnType<typeof sanitizeSketchData>;
  try {
    const raw = JSON.parse(sketch.data);
    sketchData = sanitizeSketchData(raw);
  } catch {
    return NextResponse.json({ error: "Invalid sketch data" }, { status: 500 });
  }

  // Render with original sketch dimensions — the SVG will have the correct
  // aspect ratio via its viewBox. The <img> tag in the dashboard uses
  // object-contain CSS so it scales correctly without clipping elements.
  let svg: string;
  try {
    svg = renderSketchToSVG(sketchData);
  } catch (err) {
    console.error("[/api/sketches/thumbnail] render error:", err);
    return NextResponse.json({ error: "Render failed" }, { status: 500 });
  }

  return new NextResponse(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      // Cache thumbnail for 5 min at edge / 10 min at browser
      "Cache-Control": "public, max-age=600, s-maxage=300, stale-while-revalidate=300",
    },
  });
}

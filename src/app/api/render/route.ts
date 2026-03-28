/**
 * POST /api/render — Render a sketch manifest to SVG (or JSON with SVG string).
 *
 * This is the primary agent-facing render endpoint. Send a SketchData JSON
 * manifest and get back a hand-drawn SVG directly. No browser required.
 *
 * Request body:
 *   { data: SketchData, format?: "svg" | "json" }
 *
 * Returns:
 *   - format=svg (default): Content-Type: image/svg+xml, raw SVG string
 *   - format=json: Content-Type: application/json, { svg: string, width, height }
 *
 * For a save-and-share flow use POST /api/sketches instead, which persists the
 * sketch and returns a public URL.
 */

import { NextRequest, NextResponse } from "next/server";
import { sketchDataSchema, sanitizeSketchData } from "@/lib/validations";
import { renderSketchToSVG } from "@/lib/svg-renderer";
import { rateLimit } from "@/lib/rate-limit";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  const { success } = rateLimit(ip);
  if (!success) {
    return NextResponse.json(
      { error: "Rate limit exceeded" },
      { status: 429, headers: corsHeaders() }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400, headers: corsHeaders() }
    );
  }

  // Accept { data: SketchData, format?: "svg"|"json" }
  // or bare SketchData at top level for convenience
  let rawData: unknown;
  let format: string = "svg";

  if (
    body !== null &&
    typeof body === "object" &&
    "data" in (body as Record<string, unknown>)
  ) {
    rawData = (body as Record<string, unknown>).data;
    const fmt = (body as Record<string, unknown>).format;
    if (fmt === "json" || fmt === "svg") format = fmt;
  } else {
    // Bare SketchData — auto-detect by checking for required fields
    rawData = body;
  }

  // Also check query param ?format=
  const url = new URL(req.url);
  const qFmt = url.searchParams.get("format");
  if (qFmt === "json" || qFmt === "svg") format = qFmt;

  const parsed = sketchDataSchema.safeParse(rawData);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid sketch data",
        details: parsed.error.flatten(),
        hint: "See https://skissify.com/api/manifest for the full schema.",
      },
      { status: 400, headers: corsHeaders() }
    );
  }

  const sanitized = sanitizeSketchData(parsed.data);
  let svg: string;
  try {
    svg = renderSketchToSVG(sanitized);
  } catch (err) {
    console.error("[/api/render] SVG render error:", err);
    return NextResponse.json(
      { error: "Render failed", message: String(err) },
      { status: 500, headers: corsHeaders() }
    );
  }

  const width = sanitized.width ?? 1000;
  const height = sanitized.height ?? 750;

  if (format === "json") {
    return NextResponse.json(
      { svg, width, height },
      {
        status: 200,
        headers: {
          ...corsHeaders(),
          "Cache-Control": "no-store",
        },
      }
    );
  }

  // Default: raw SVG
  return new NextResponse(svg, {
    status: 200,
    headers: {
      ...corsHeaders(),
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Content-Disposition": 'inline; filename="skissify.svg"',
      "Cache-Control": "no-store",
    },
  });
}

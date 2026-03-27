import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { createSketchSchema, sanitizeSketchData } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limit";
import { generateSlug } from "@/lib/slug";

// CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

function corsHeaders() {
  return { "Access-Control-Allow-Origin": "*" };
}

// POST /api/sketches — save a sketch
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  const { success } = rateLimit(ip);
  if (!success) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const session = await auth();
  const body = await req.json();
  const parsed = createSketchSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid sketch data", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { title, data, public: isPublic } = parsed.data;
  const sanitized = sanitizeSketchData(data);

  // If not logged in, only public sketches are allowed
  if (!session?.user && isPublic === false) {
    return NextResponse.json(
      { error: "Sign in to save private sketches" },
      { status: 401 }
    );
  }

  const sketch = await db.sketch.create({
    data: {
      slug: generateSlug(),
      title: title ?? "Untitled",
      data: JSON.stringify(sanitized),
      public: isPublic ?? true,
      userId: session?.user?.id ?? null,
    },
  });

  return NextResponse.json({ slug: sketch.slug, id: sketch.id }, { status: 201, headers: corsHeaders() });
}

// GET /api/sketches — list user's sketches (requires auth)
export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sketches = await db.sketch.findMany({
    where: { userId: session.user.id },
    select: {
      id: true,
      slug: true,
      title: true,
      public: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(sketches);
}

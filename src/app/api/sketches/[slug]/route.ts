import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { updateSketchSchema, sanitizeSketchData } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limit";

// GET /api/sketches/[slug] — load a sketch
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const sketch = await db.sketch.findUnique({
    where: { slug },
    include: { user: { select: { name: true, image: true } } },
  });

  if (!sketch) {
    return NextResponse.json({ error: "Sketch not found" }, { status: 404 });
  }

  // Check access for private sketches
  if (!sketch.public) {
    const session = await auth();
    if (!session?.user?.id || session.user.id !== sketch.userId) {
      // Check shared access
      if (session?.user?.email) {
        const shared = await db.sharedAccess.findUnique({
          where: {
            sketchId_email: { sketchId: sketch.id, email: session.user.email },
          },
        });
        if (!shared) {
          return NextResponse.json({ error: "Not found" }, { status: 404 });
        }
      } else {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
    }
  }

  return NextResponse.json({
    ...sketch,
    data: JSON.parse(sketch.data),
  });
}

// PATCH /api/sketches/[slug] — update a sketch
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  const { success } = rateLimit(ip);
  if (!success) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const sketch = await db.sketch.findUnique({ where: { slug } });

  if (!sketch || sketch.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await req.json();
  const parsed = updateSketchSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const updateData: Record<string, unknown> = {};
  if (parsed.data.title !== undefined) updateData.title = parsed.data.title;
  if (parsed.data.public !== undefined) updateData.public = parsed.data.public;
  if (parsed.data.data !== undefined) {
    updateData.data = JSON.stringify(sanitizeSketchData(parsed.data.data));
  }

  const updated = await db.sketch.update({
    where: { slug },
    data: updateData,
  });

  return NextResponse.json({ slug: updated.slug });
}

// DELETE /api/sketches/[slug] — delete a sketch
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const sketch = await db.sketch.findUnique({ where: { slug } });

  if (!sketch || sketch.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await db.sketch.delete({ where: { slug } });

  return NextResponse.json({ success: true });
}

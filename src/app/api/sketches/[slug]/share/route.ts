import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { shareSketchSchema } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(
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
  const parsed = shareSketchSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const access = await db.sharedAccess.upsert({
    where: {
      sketchId_email: { sketchId: sketch.id, email: parsed.data.email },
    },
    update: { canEdit: parsed.data.canEdit ?? false },
    create: {
      sketchId: sketch.id,
      email: parsed.data.email,
      canEdit: parsed.data.canEdit ?? false,
    },
  });

  return NextResponse.json({ id: access.id }, { status: 201 });
}

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { isPro } from "@/lib/plan-check";

/**
 * GET /api/plan-status
 * Returns the current user's plan tier for client-side gating.
 * Used to determine whether to apply watermarks on export.
 */
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ plan: "free", pro: false });
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        stripePriceId: true,
        stripeSubscriptionId: true,
        stripeCurrentPeriodEnd: true,
      },
    });

    const pro = isPro(user);
    return NextResponse.json({ plan: pro ? "pro" : "free", pro });
  } catch {
    // On any error (e.g. no DB configured), default to free
    return NextResponse.json({ plan: "free", pro: false });
  }
}

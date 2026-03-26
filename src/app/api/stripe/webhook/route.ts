import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      if (!userId) break;

      const subscription = await getStripe().subscriptions.retrieve(
        session.subscription as string
      );
      const sub = subscription as unknown as Record<string, unknown>;

      await db.user.update({
        where: { id: userId },
        data: {
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: subscription.id,
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            (sub.current_period_end as number) * 1000
          ),
        },
      });
      break;
    }

    case "invoice.payment_succeeded": {
      const invoiceObj = event.data.object as unknown as Record<string, unknown>;
      const rawSub = invoiceObj.subscription;
      const subscriptionId =
        typeof rawSub === "string"
          ? rawSub
          : (rawSub as { id?: string } | null)?.id;
      if (!subscriptionId) break;

      const subscription =
        await getStripe().subscriptions.retrieve(subscriptionId);
      const sub = subscription as unknown as Record<string, unknown>;

      await db.user.updateMany({
        where: { stripeSubscriptionId: subscriptionId },
        data: {
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            (sub.current_period_end as number) * 1000
          ),
        },
      });
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await db.user.updateMany({
        where: { stripeSubscriptionId: subscription.id },
        data: {
          stripePriceId: null,
          stripeSubscriptionId: null,
          stripeCurrentPeriodEnd: null,
        },
      });
      break;
    }
  }

  return NextResponse.json({ received: true });
}

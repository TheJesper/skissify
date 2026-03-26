import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-03-25.dahlia",
      typescript: true,
    });
  }
  return _stripe;
}

export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    features: [
      "Unlimited public sketches",
      "All drawing tools",
      "All paper types",
      "Export to PNG",
      "Share via link",
    ],
  },
  pro: {
    name: "Pro",
    price: 2,
    priceId: process.env.STRIPE_PRICE_ID,
    features: [
      "Everything in Free",
      "Private sketches",
      "Priority support",
      "Custom paper sizes",
      "SVG export",
      "No watermark",
    ],
  },
} as const;

export async function createCheckoutSession(userId: string, email: string) {
  const session = await getStripe().checkout.sessions.create({
    customer_email: email,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    metadata: {
      userId,
    },
  });
  return session;
}

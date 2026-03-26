/**
 * Plan gate utilities.
 *
 * A user is "pro" when they have an active Stripe subscription
 * (i.e. stripeCurrentPeriodEnd is in the future).
 */

interface UserLike {
  stripePriceId?: string | null;
  stripeSubscriptionId?: string | null;
  stripeCurrentPeriodEnd?: Date | string | null;
}

export function isPro(user: UserLike | null | undefined): boolean {
  if (!user?.stripePriceId || !user.stripeCurrentPeriodEnd) return false;
  const end =
    typeof user.stripeCurrentPeriodEnd === "string"
      ? new Date(user.stripeCurrentPeriodEnd)
      : user.stripeCurrentPeriodEnd;
  return end.getTime() > Date.now();
}

export function canSavePrivate(user: UserLike | null | undefined): boolean {
  return isPro(user);
}

export function canShare(user: UserLike | null | undefined): boolean {
  return isPro(user);
}

/** Free users: 10 public sketches. Pro: unlimited. */
export function getSketchLimit(user: UserLike | null | undefined): number {
  return isPro(user) ? Infinity : 10;
}

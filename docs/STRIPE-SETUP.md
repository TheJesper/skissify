# Stripe Setup Guide

## 1. Create Product & Price

1. Go to [Stripe Dashboard](https://dashboard.stripe.com) (use **Test mode** first)
2. Products > Add product
   - Name: `Skissify Pro`
   - Description: `Private sketches, SVG export, no watermark`
3. Add a price:
   - Recurring, EUR 5.00/month
   - Copy the Price ID (starts with `price_`)

## 2. Set Up Webhooks

### Production
1. Developers > Webhooks > Add endpoint
2. Endpoint URL: `https://skissify.com/api/stripe/webhook`
3. Events to listen for:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `customer.subscription.deleted`
4. Copy the Webhook Signing Secret (starts with `whsec_`)

### Local Development
```bash
# Install Stripe CLI: https://stripe.com/docs/stripe-cli
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
```
The CLI prints a webhook signing secret -- use that for local `.env`.

## 3. Customer Portal

1. Settings > Billing > Customer portal
2. Enable: Cancel subscription, Update payment method
3. Save

## 4. Environment Variables

```env
# .env.local
STRIPE_SECRET_KEY=sk_test_...          # Secret key from Developers > API keys
STRIPE_WEBHOOK_SECRET=whsec_...        # From webhook setup above
STRIPE_PRICE_ID=price_...              # From step 1
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 5. Test Mode vs Live Mode

| Setting | Test | Live |
|---------|------|------|
| Secret key | `sk_test_...` | `sk_live_...` |
| Webhook secret | separate per environment | separate per environment |
| Price ID | create in test mode | create in live mode |
| Test card | `4242 4242 4242 4242` | real cards |

Use [Stripe test cards](https://stripe.com/docs/testing#cards) for development.

## 6. Going Live

1. Activate your Stripe account (verify identity/bank)
2. Create product + price in **live mode**
3. Add live webhook endpoint
4. Update env vars to `sk_live_`, new `whsec_`, new `price_`
5. Toggle off test mode

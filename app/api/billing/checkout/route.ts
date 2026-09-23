import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const { userId, orgId, orgSlug } = await auth();
  if (!userId || !orgId) {
    return NextResponse.json(
      { error: "You must be signed in with an organization to start checkout." },
      { status: 401 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const quantity = Math.max(1, Math.min(500, Number(body.rooftopCount) || 1));
  const interval = body.interval === "year" ? "year" : "month";
  const priceId =
    interval === "year"
      ? process.env.STRIPE_PRICE_ANNUAL
      : process.env.STRIPE_PRICE_MONTHLY;

  if (!priceId || !process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Pricing is not configured." },
      { status: 500 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const origin =
    req.headers.get("origin") || `https://${req.headers.get("host")}`;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity }],
    subscription_data: {
      trial_period_days: 7,
      metadata: { clerkOrgId: orgId },
    },
    metadata: { clerkOrgId: orgId, orgSlug: orgSlug || "" },
    success_url: `${origin}/train/sales?checkout=success`,
    cancel_url: `${origin}/pricing?checkout=cancelled`,
    allow_promotion_codes: true,
  });

  return NextResponse.json({ url: session.url });
}

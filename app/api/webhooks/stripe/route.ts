import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { updateOrgFromStripe } from "@/lib/org";

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Stripe webhook is not configured." },
      { status: 500 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig || "",
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch {
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const clerkOrgId = session.metadata?.clerkOrgId;
      if (clerkOrgId && session.subscription) {
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );
        const item = subscription.items.data[0];
        await updateOrgFromStripe({
          clerkOrgId,
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: subscription.id,
          status: subscription.status,
          rooftopCount: item?.quantity || 1,
          billingInterval:
            item?.price?.recurring?.interval === "year" ? "year" : "month",
        });
      }
    }

    if (
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted"
    ) {
      const subscription = event.data.object as Stripe.Subscription;
      const item = subscription.items.data[0];
      const clerkOrgId = subscription.metadata?.clerkOrgId;
      await updateOrgFromStripe({
        clerkOrgId,
        stripeCustomerId: subscription.customer as string,
        stripeSubscriptionId: subscription.id,
        status:
          event.type === "customer.subscription.deleted"
            ? "canceled"
            : subscription.status,
        rooftopCount: item?.quantity || 1,
        billingInterval:
          item?.price?.recurring?.interval === "year" ? "year" : "month",
      });
    }
  } catch (err) {
    console.error("Stripe webhook handling error", err);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}

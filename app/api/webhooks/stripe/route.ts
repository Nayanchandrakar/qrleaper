import { eq } from "drizzle-orm"
import type Stripe from "stripe"

import { updateQrCodeStatusWithSubscriptionChange } from "@/app/actions/helpers/subscription/utils"
import { db } from "@/database/db"
import { subscription as subscriptionTable } from "@/database/schema"
import { stripe } from "@/lib/stripe"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!signature || !webhookSecret) {
    return new Response("Missing webhook signature or secret", { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      webhookSecret
    )
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    return new Response(`Webhook Error: ${message}`, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    if (!session.subscription || !session.metadata?.userId) {
      return new Response("Invalid checkout session payload", { status: 400 })
    }

    if (typeof session.subscription !== "string") {
      return new Response("Invalid subscription reference", { status: 400 })
    }

    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription
    )

    // Update the user stripe into in our database.
    // Since this is the initial subscription, we need to update
    // the subscription id and customer id.
    await db
      ?.update(subscriptionTable)
      .set({
        stripeCurrentPeriodEnd: new Date(
          subscription.items.data[0].current_period_end * 1000
        ),
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeSubscriptionId: subscription.id
      })
      .where(eq(subscriptionTable.userId, session.metadata.userId))
  }

  if (event.type === "invoice.payment_succeeded") {
    const session = event.data.object as Stripe.Invoice

    // If the billing reason is not subscription_create, it means the customer has updated their subscription.
    // If it is subscription_create, we don't need to update the subscription id and it will handle by the checkout.session.completed event.
    if (session.billing_reason != "subscription_create") {
      const subscriptionId = session.parent?.subscription_details?.subscription

      if (!subscriptionId || typeof subscriptionId !== "string") {
        return new Response("Invalid invoice subscription reference", {
          status: 400
        })
      }

      // Retrieve the subscription details from Stripe.
      const subscription = await stripe.subscriptions.retrieve(subscriptionId)

      // Update the price id and set the new period end.

      const [updatedSubscriptionData] = await db
        ?.update(subscriptionTable)
        .set({
          stripeCurrentPeriodEnd: new Date(
            subscription.items.data[0].current_period_end * 1000
          ),
          stripePriceId: subscription.items.data[0].price.id
        })
        .where(eq(subscriptionTable.stripeSubscriptionId, subscription.id))
        .returning()

      // Need to change the status of qr codes after each update
      if (!updatedSubscriptionData) {
        return new Response("Subscription row not found", { status: 404 })
      }

      if (!updatedSubscriptionData.stripePriceId) {
        return new Response("Missing subscription price id", { status: 400 })
      }

      await updateQrCodeStatusWithSubscriptionChange(
        updatedSubscriptionData.userId,
        updatedSubscriptionData.stripePriceId
      )
    }
  }

  return new Response(null, { status: 200 })
}

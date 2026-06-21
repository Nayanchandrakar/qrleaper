import { eq } from "drizzle-orm"
import { headers } from "next/headers"
import type Stripe from "stripe"

import { updateQrCodeStatusWithSubscriptionChange } from "@/app/actions/helpers/subscription/utils"
import { db } from "@/database/db"
import { subscription as subscriptionTable } from "@/database/schema"
import { stripe } from "@/lib/stripe"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET! as string
    )
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    return new Response(`Webhook Error: ${message}`, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    // Update the user stripe into in our database.
    // Since this is the initial subscription, we need to update
    // the subscription id and customer id.
    await db
      ?.update(subscriptionTable)
      .set({
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeSubscriptionId: subscription.id
      })
      .where(eq(subscriptionTable.userId, session?.metadata?.userId!))
  }

  if (event.type === "invoice.payment_succeeded") {
    const session = event.data.object as Stripe.Invoice

    // If the billing reason is not subscription_create, it means the customer has updated their subscription.
    // If it is subscription_create, we don't need to update the subscription id and it will handle by the checkout.session.completed event.
    if (session.billing_reason != "subscription_create") {
      // Retrieve the subscription details from Stripe.
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      )

      // Update the price id and set the new period end.

      const [updatedSubscriptionData] = await db
        ?.update(subscriptionTable)
        .set({
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
          stripePriceId: subscription.items.data[0].price.id
        })
        .where(eq(subscriptionTable.stripeSubscriptionId, subscription.id!))
        .returning()

      // Need to change the status of qr codes after each update
      await updateQrCodeStatusWithSubscriptionChange(
        updatedSubscriptionData.userId,
        updatedSubscriptionData?.stripePriceId!
      )
    }
  }

  return new Response(null, { status: 200 })
}

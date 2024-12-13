"use server"

import { redirect } from "next/navigation"
import { flattenValidationErrors } from "next-safe-action"

import { stripe } from "@/lib/stripe"
import { absoluteUrl } from "@/utils"
import { isSubscriptionExpired } from "@/app/actions/helpers"
import { getSubscriptionByUserId } from "@/app/actions/utils"
import { authUserActionClient } from "@/lib/action/safe-action"
import { generateStripeSchema } from "@/zod/subscription/generate-stripe-schrma"

export const generateUserStripeAction = authUserActionClient
  .schema(generateStripeSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput, ctx }) => {
    let redirectUrl: string = ""
    const { optionalEndpoint, priceId } = parsedInput
    const { user } = ctx

    try {
      const billingUrl = absoluteUrl(optionalEndpoint ?? "/pricing")

      const subscriptionPlan = await getSubscriptionByUserId(user.id!)

      if (
        subscriptionPlan?.stripePriceId &&
        isSubscriptionExpired(subscriptionPlan.stripeCurrentPeriodEnd) &&
        subscriptionPlan?.stripeCustomerId
      ) {
        // User on Paid Plan - Create a portal session to manage subscription.
        const stripeSession = await stripe.billingPortal.sessions.create({
          customer: subscriptionPlan.stripeCustomerId,
          return_url: billingUrl,
        })

        redirectUrl = stripeSession.url as string
      } else {
        // User on Free Plan - Create a checkout session to upgrade.
        const stripeSession = await stripe.checkout.sessions.create({
          success_url: billingUrl,
          cancel_url: billingUrl,
          payment_method_types: ["card"],
          mode: "subscription",
          billing_address_collection: "auto",
          customer_email: user.email!,
          line_items: [
            {
              price: priceId,
              quantity: 1,
            },
          ],
          metadata: {
            userId: user.id!,
          },
        })

        redirectUrl = stripeSession.url as string
      }
    } catch (error) {
      console.log(error)
      throw new Error("Failed to generate user stripe session")
    }

    // no revalidatePath because redirect
    redirect(redirectUrl)
  })

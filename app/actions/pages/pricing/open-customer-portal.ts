"use server"

import { redirect } from "next/navigation"
import { flattenValidationErrors } from "next-safe-action"

import { stripe } from "@/lib/stripe"
import { absoluteUrl } from "@/utils"
import { idSchema } from "@/zod/utils"
import { authUserActionClient } from "@/lib/action/safe-action"

const billingUrl = absoluteUrl("/dashboard/billing")

export const openCustomerPortal = authUserActionClient
  .schema(idSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput }) => {
    let redirectUrl: string = ""
    const { id } = parsedInput

    try {
      if (id) {
        const stripeSession = await stripe.billingPortal.sessions.create({
          customer: id,
          return_url: billingUrl,
        })

        redirectUrl = stripeSession.url as string
      }
    } catch {
      throw new Error("Failed to generate user stripe session")
    }

    // no revalidatePath because redirect
    redirect(redirectUrl)
  })

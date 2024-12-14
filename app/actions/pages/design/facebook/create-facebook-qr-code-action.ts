"use server"

import { revalidatePath } from "next/cache"
import { flattenValidationErrors } from "next-safe-action"

import { authUserActionClient } from "@/lib/action/safe-action"
import { db } from "@/database/db"
import { qrCode, qrCodeStyle } from "@/database/schema"
import { qrFacebook } from "@/database/schema/qr-variations"
import { getEndpointURL } from "@/utils"
import { facebookFormSchema } from "@/zod/forms/facebook/facebook-form-schema"
import { throwSubscriptionError } from "@/lib/action/throw-subscription-error"
import { incrementQrSubscriptionCountByUserId } from "@/app/actions/helpers/subscription/utils"

export const createQrCodeFacebookAction = authUserActionClient
  .schema(facebookFormSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .use(throwSubscriptionError)
  .action(async ({ parsedInput, ctx }) => {
    const { facebookUrl, style, title } = parsedInput
    const { user } = ctx

    const qrCodeData = await db.transaction(async (tx) => {
      //  creating a qr code data
      const [data] = await tx
        .insert(qrCode)
        .values({
          title,
          type: "facebook",
          userId: user.id!,
          endpoint: facebookUrl,
        })
        .returning()

      await Promise.all([
        // create a desired form data
        tx.insert(qrFacebook).values({
          facebookUrl,
          qrCodeId: data.id,
        }),

        // insert qr code styling data with qrCode id
        tx.insert(qrCodeStyle).values({
          qrCodeId: data.id,
          color: style.color,
          hasFrame: !!style.hasFrame,
          shape: style.shape,
          ...(style.bottomInput && { bottomText: style.bottomInput }),
          ...(style.topInput && { topText: style.topInput }),
          ...(style.image && { logo: style.image }),
        }),
      ])

      incrementQrSubscriptionCountByUserId(ctx.user.id!)
      return data
    })

    revalidatePath("/dashboard/qr-codes")

    return { endpoint: getEndpointURL(qrCodeData.id) as string }
  })

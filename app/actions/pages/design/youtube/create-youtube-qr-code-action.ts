"use server"

import { revalidatePath } from "next/cache"
import { flattenValidationErrors } from "next-safe-action"

import { authUserActionClient } from "@/lib/action/safe-action"
import { db } from "@/database/db"
import { qrCode, qrCodeStyle } from "@/database/schema"
import { qrYoutube } from "@/database/schema/qr-variations"
import { getEndpointURL } from "@/utils"
import { youtubeFormSchema } from "@/zod/forms/youtube/youtube-form-schema"
import { incrementQrSubscriptionCountByUserId } from "@/app/actions/helpers/subscription/utils"
import { throwSubscriptionError } from "@/lib/action/throw-subscription-error"

export const createQrCodeYoutubeAction = authUserActionClient
  .schema(youtubeFormSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .use(throwSubscriptionError)
  .action(async ({ parsedInput, ctx }) => {
    const { youtubeUrl, style, title } = parsedInput
    const { user } = ctx

    const qrCodeData = await db.transaction(async (tx) => {
      //  creating a qr code data
      const [data] = await tx
        .insert(qrCode)
        .values({
          title,
          type: "youtube",
          userId: user.id!,
          endpoint: youtubeUrl,
        })
        .returning()

      await Promise.all([
        // create a desired form data
        tx.insert(qrYoutube).values({
          youtubeUrl,
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

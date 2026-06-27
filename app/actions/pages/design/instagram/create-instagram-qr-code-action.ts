"use server"

import { flattenValidationErrors } from "next-safe-action"
import { revalidatePath } from "next/cache"

import { incrementQrSubscriptionCountByUserId } from "@/app/actions/helpers/subscription/utils"
import { db } from "@/database/db"
import { qrCode, qrCodeStyle } from "@/database/schema"
import { qrInstagram } from "@/database/schema/qr-variations"
import { authUserActionClient } from "@/lib/action/safe-action"
import { throwSubscriptionError } from "@/lib/action/throw-subscription-error"
import type { colorType } from "@/types/type"
import { getEndpointURL, getInstagramDbEndpointURL } from "@/utils"
import { instagramFormSchema } from "@/zod/forms/instagram/instagram-form-schema"

export const createQrCodeInstagramAction = authUserActionClient
  .schema(instagramFormSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors
  })
  .use(throwSubscriptionError)
  .action(async ({ parsedInput, ctx }) => {
    const { instagram, style, title } = parsedInput
    const { user } = ctx

    const qrCodeData = await db.transaction(async (tx) => {
      //  creating a qr code data
      const [data] = await tx
        .insert(qrCode)
        .values({
          title,
          type: "instagram",
          userId: user.id!,
          endpoint: getInstagramDbEndpointURL(instagram)
        })
        .returning()

      await tx.insert(qrInstagram).values({
        instagramId: instagram,
        qrCodeId: data.id
      })

      // insert qr code styling data with qrCode id
      await tx.insert(qrCodeStyle).values({
        qrCodeId: data.id,
        colors: style.colors,
        colorType: style.colorType as colorType,
        rotation: style.rotation,
        hasFrame: !!style.hasFrame,
        shape: style.shape,
        ...(style.bottomInput && { bottomText: style.bottomInput }),
        ...(style.topInput && { topText: style.topInput }),
        ...(style.image && { logo: style.image })
      })

      return data
    })

    await incrementQrSubscriptionCountByUserId(ctx.user.id!)
    revalidatePath("/dashboard/qr-codes")

    return { endpoint: getEndpointURL(qrCodeData.id) as string }
  })

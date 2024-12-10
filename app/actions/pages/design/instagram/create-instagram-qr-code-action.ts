"use server"

import { flattenValidationErrors } from "next-safe-action"

import { authUserActionClient } from "@/lib/action/safe-action"
import { db } from "@/database/db"
import { qrCode, qrCodeStyle } from "@/database/schema"
import { qrInstagram } from "@/database/schema/qr-variations"
import { getEndpointURL, getInstagramDbEndpointURL } from "@/utils"
import { instagramFormSchema } from "@/zod/forms/instagram/instagram-form-schema"

export const createQrCodeInstagramAction = authUserActionClient
  .schema(instagramFormSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
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
          endpoint: getInstagramDbEndpointURL(instagram),
        })
        .returning()

      await Promise.all([
        // create a desired form data
        tx.insert(qrInstagram).values({
          instagramId: instagram,
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

      return data
    })

    return { endpoint: getEndpointURL(qrCodeData.id) as string }
  })

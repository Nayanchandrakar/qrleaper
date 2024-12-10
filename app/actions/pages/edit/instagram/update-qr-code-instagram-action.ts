"use server"

import { z } from "zod"
import { eq } from "drizzle-orm"
import { flattenValidationErrors } from "next-safe-action"

import { db } from "@/database/db"
import { qrCode, qrCodeStyle } from "@/database/schema"
import { qrInstagram } from "@/database/schema/qr-variations"
import { authUserActionClient } from "@/lib/action/safe-action"
import { getQrCodeByUserIdAndIdWithType } from "@/app/actions/utils"
import { instagramFormSchema } from "@/zod/forms/instagram/instagram-form-schema"
import { getInstagramDbEndpointURL } from "@/utils"

export const updateQrCodeInstagramAction = authUserActionClient
  .schema(
    instagramFormSchema.extend({
      id: z.string().min(10),
    }),
    {
      handleValidationErrorsShape: async (ve) =>
        flattenValidationErrors(ve).fieldErrors,
    }
  )
  .action(async ({ parsedInput, ctx }) => {
    const { instagram, style, title, id } = parsedInput
    const { user } = ctx

    const data = await getQrCodeByUserIdAndIdWithType(user.id!, id, "instagram")

    if (!data) {
      throw new Error("No QR Code found to update with this id")
    }

    await db.transaction(async (tx) => {
      Promise.all([
        // update a desired form data
        tx
          .update(qrCode)
          .set({ title, endpoint: getInstagramDbEndpointURL(instagram) })
          .where(eq(qrCode.id, id)),

        tx
          .update(qrInstagram)
          .set({ instagramId: instagram })
          .where(eq(qrInstagram.qrCodeId, id)),

        // update qr code styling data with qrCode id
        tx
          .update(qrCodeStyle)
          .set({
            color: style.color,
            hasFrame: !!style.hasFrame,
            shape: style.shape,
            ...(style.bottomInput && { bottomText: style.bottomInput }),
            ...(style.topInput && { topText: style.topInput }),
            ...(style.image && { logo: style.image }),
          })
          .where(eq(qrCodeStyle.qrCodeId, id)),
      ])
    })

    return { ok: true }
  })

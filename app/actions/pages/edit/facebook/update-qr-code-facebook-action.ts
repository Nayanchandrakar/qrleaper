"use server"

import { z } from "zod"
import { eq } from "drizzle-orm"
import { flattenValidationErrors } from "next-safe-action"

import { db } from "@/database/db"
import { qrCode, qrCodeStyle } from "@/database/schema"
import { qrFacebook } from "@/database/schema/qr-variations"
import { authUserActionClient } from "@/lib/action/safe-action"
import { getQrCodeByUserIdAndIdWithType } from "@/app/actions/utils"
import { facebookFormSchema } from "@/zod/forms/facebook/facebook-form-schema"

export const updateQrCodeFacebookAction = authUserActionClient
  .schema(
    facebookFormSchema.extend({
      id: z.string().min(10),
    }),
    {
      handleValidationErrorsShape: async (ve) =>
        flattenValidationErrors(ve).fieldErrors,
    }
  )
  .action(async ({ parsedInput, ctx }) => {
    const { facebookUrl, style, title, id } = parsedInput
    const { user } = ctx

    const data = await getQrCodeByUserIdAndIdWithType(user.id!, id, "facebook")

    if (!data) {
      throw new Error("No QR Code found to update with this id")
    }

    await db.transaction(async (tx) => {
      Promise.all([
        // update a desired form data
        tx
          .update(qrCode)
          .set({ title, endpoint: facebookUrl })
          .where(eq(qrCode.id, id)),

        tx
          .update(qrFacebook)
          .set({ facebookUrl })
          .where(eq(qrFacebook.qrCodeId, id)),

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

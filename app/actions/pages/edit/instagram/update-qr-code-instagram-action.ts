"use server"

import { z } from "zod"
import { eq } from "drizzle-orm"
import { flattenValidationErrors } from "next-safe-action"

import { db } from "@/database/db"
import { qrCode, qrCodeStyle } from "@/database/schema"
import { qrInstagram } from "@/database/schema/qr-variations"
import { authUserActionClient } from "@/lib/action/safe-action"
import { instagramFormSchema } from "@/zod/forms/instagram/instagram-form-schema"
import { getInstagramDbEndpointURL } from "@/utils"
import { throwSubscriptionEditError } from "@/lib/action/throw-subscription-error"
import { throwQrCodeNotFoundError } from "@/lib/action/throw-qr-code-error"

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
  .use(throwSubscriptionEditError)
  .use(async (client) =>
    throwQrCodeNotFoundError({ ...client, type: "instagram" })
  )
  .action(async ({ parsedInput }) => {
    const { instagram, style, title, id } = parsedInput

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

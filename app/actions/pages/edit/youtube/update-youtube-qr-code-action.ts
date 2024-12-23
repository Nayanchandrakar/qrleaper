"use server"

import { z } from "zod"
import { eq } from "drizzle-orm"
import { flattenValidationErrors } from "next-safe-action"

import { db } from "@/database/db"
import { qrCode, qrCodeStyle } from "@/database/schema"
import { qrLink, qrYoutube } from "@/database/schema/qr-variations"
import { authUserActionClient } from "@/lib/action/safe-action"
import { youtubeFormSchema } from "@/zod/forms/youtube/youtube-form-schema"
import { throwSubscriptionEditError } from "@/lib/action/throw-subscription-error"
import { throwQrCodeNotFoundError } from "@/lib/action/throw-qr-code-error"

export const updateQrCodeYoutubeAction = authUserActionClient
  .schema(
    youtubeFormSchema.extend({
      id: z.string().min(10),
    }),
    {
      handleValidationErrorsShape: async (ve) =>
        flattenValidationErrors(ve).fieldErrors,
    }
  )
  .use(throwSubscriptionEditError)
  .use(async (client) =>
    throwQrCodeNotFoundError({ ...client, type: "youtube" })
  )
  .action(async ({ parsedInput }) => {
    const { youtubeUrl, style, title, id } = parsedInput

    await db.transaction(async (tx) => {
      Promise.all([
        // update a desired form data
        tx
          .update(qrCode)
          .set({ title, endpoint: youtubeUrl })
          .where(eq(qrCode.id, id)),

        tx.update(qrYoutube).set({ youtubeUrl }).where(eq(qrLink.qrCodeId, id)),

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

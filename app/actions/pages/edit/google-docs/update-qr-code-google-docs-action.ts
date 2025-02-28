"use server"

import { z } from "zod"
import { eq } from "drizzle-orm"
import { flattenValidationErrors } from "next-safe-action"

import { db } from "@/database/db"
import { qrCode, qrCodeStyle } from "@/database/schema"
import { qrGoogleDoc } from "@/database/schema/qr-variations"
import { authUserActionClient } from "@/lib/action/safe-action"
import { googleDocsFormSchema } from "@/zod/forms/google-docs/google-docs-form-schema"
import { throwSubscriptionEditError } from "@/lib/action/throw-subscription-error"
import { throwQrCodeNotFoundError } from "@/lib/action/throw-qr-code-error"
import { colorType } from "@/types/type"

export const updateQrCodeGoogleDocsAction = authUserActionClient
  .schema(
    googleDocsFormSchema.extend({
      id: z.string().min(10),
    }),
    {
      handleValidationErrorsShape: async (ve) =>
        flattenValidationErrors(ve).fieldErrors,
    }
  )
  .use(throwSubscriptionEditError)
  .use(async (client) =>
    throwQrCodeNotFoundError({ ...client, type: "googleDoc" })
  )
  .action(async ({ parsedInput }) => {
    const { googleDocUrl, style, title, id } = parsedInput

    await db.transaction(async (tx) => {
      Promise.all([
        // update a desired form data
        tx
          .update(qrCode)
          .set({ title, endpoint: googleDocUrl })
          .where(eq(qrCode.id, id)),

        tx
          .update(qrGoogleDoc)
          .set({ googleDocUrl })
          .where(eq(qrGoogleDoc.qrCodeId, id)),

        // update qr code styling data with qrCode id
        tx
          .update(qrCodeStyle)
          .set({
            colors: style.colors,
            colorType: style.colorType as colorType,
            rotation: style.rotation,
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

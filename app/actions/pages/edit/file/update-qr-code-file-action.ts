"use server"

import { z } from "zod"
import { eq } from "drizzle-orm"
import { flattenValidationErrors } from "next-safe-action"

import { db } from "@/database/db"
import { qrCode, qrCodeStyle } from "@/database/schema"
import { qrFile } from "@/database/schema/qr-variations"
import { authUserActionClient } from "@/lib/action/safe-action"
import { fileFormSchema } from "@/zod/forms/file/file-form-schema"
import { getFileDbEndpointURL } from "@/utils"
import { throwSubscriptionEditError } from "@/lib/action/throw-subscription-error"
import { throwQrCodeNotFoundError } from "@/lib/action/throw-qr-code-error"

export const updateQrCodeFileAction = authUserActionClient
  .schema(
    fileFormSchema.extend({
      id: z.string().min(10),
    }),
    {
      handleValidationErrorsShape: async (ve) =>
        flattenValidationErrors(ve).fieldErrors,
    }
  )
  .use(throwSubscriptionEditError)
  .use(async (client) => throwQrCodeNotFoundError({ ...client, type: "file" }))
  .action(async ({ parsedInput }) => {
    const { fileName, style, title, id } = parsedInput

    await db.transaction(async (tx) => {
      Promise.all([
        // update a desired form data
        tx
          .update(qrCode)
          .set({ title, endpoint: getFileDbEndpointURL(fileName) })
          .where(eq(qrCode.id, id)),

        tx
          .update(qrFile)
          .set({ fileId: fileName })
          .where(eq(qrFile.qrCodeId, id)),

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

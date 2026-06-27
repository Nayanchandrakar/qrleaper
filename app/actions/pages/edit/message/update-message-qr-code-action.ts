"use server"

import { eq } from "drizzle-orm"
import { flattenValidationErrors } from "next-safe-action"
import { z } from "zod"

import { db } from "@/database/db"
import { qrCode, qrCodeStyle } from "@/database/schema"
import { qrMessage } from "@/database/schema/qr-variations"
import { authUserActionClient } from "@/lib/action/safe-action"
import { throwQrCodeNotFoundError } from "@/lib/action/throw-qr-code-error"
import { throwSubscriptionEditError } from "@/lib/action/throw-subscription-error"
import type { colorType } from "@/types/type"
import { getMessageDbEndpointURL } from "@/utils"
import { messageFormSchema } from "@/zod/forms/message/message-form-schema"

export const updateQrCodeMessageAction = authUserActionClient
  .schema(
    messageFormSchema.extend({
      id: z.string().min(10)
    }),
    {
      handleValidationErrorsShape: async (ve) =>
        flattenValidationErrors(ve).fieldErrors
    }
  )
  .use(throwSubscriptionEditError)
  .use(async (client) =>
    throwQrCodeNotFoundError({ ...client, type: "message" })
  )
  .action(async ({ parsedInput }) => {
    const { phoneNumber, message, style, title, id } = parsedInput

    await db.transaction(async (tx) => {
      await tx
        .update(qrCode)
        .set({
          title,
          endpoint: getMessageDbEndpointURL(phoneNumber, message)
        })
        .where(eq(qrCode.id, id))

      await tx
        .update(qrMessage)
        .set({ message, phoneNumber })
        .where(eq(qrMessage.qrCodeId, id))

      // update qr code styling data with qrCode id
      await tx
        .update(qrCodeStyle)
        .set({
          colors: style.colors,
          colorType: style.colorType as colorType,
          rotation: style.rotation,
          hasFrame: !!style.hasFrame,
          shape: style.shape,
          ...(style.bottomInput && { bottomText: style.bottomInput }),
          ...(style.topInput && { topText: style.topInput }),
          ...(style.image && { logo: style.image })
        })
        .where(eq(qrCodeStyle.qrCodeId, id))
    })

    return { ok: true }
  })

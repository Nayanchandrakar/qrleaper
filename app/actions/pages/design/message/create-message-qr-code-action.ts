"use server"

import { flattenValidationErrors } from "next-safe-action"

import { authUserActionClient } from "@/lib/action/safe-action"
import { db } from "@/database/db"
import { qrCode, qrCodeStyle } from "@/database/schema"
import { qrMessage } from "@/database/schema/qr-variations"
import { getEndpointURL, getMessageDbEndpointURL } from "@/utils"
import { messageFormSchema } from "@/zod/forms/message/message-form-schema"

export const createQrCodeMessageAction = authUserActionClient
  .schema(messageFormSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput, ctx }) => {
    const { phoneNumber, message, style, title } = parsedInput
    const { user } = ctx

    const qrCodeData = await db.transaction(async (tx) => {
      //  creating a qr code data
      const [data] = await tx
        .insert(qrCode)
        .values({
          title,
          type: "message",
          userId: user.id!,
          endpoint: getMessageDbEndpointURL(phoneNumber, message),
        })
        .returning()

      await Promise.all([
        // create a desired form data
        tx.insert(qrMessage).values({
          message,
          phoneNumber,
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

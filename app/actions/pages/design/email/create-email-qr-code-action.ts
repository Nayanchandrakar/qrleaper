"use server"

import { flattenValidationErrors } from "next-safe-action"

import { authUserActionClient } from "@/lib/action/safe-action"
import { db } from "@/database/db"
import { qrCode, qrCodeStyle } from "@/database/schema"
import { qrEmail } from "@/database/schema/qr-variations"
import { getEmailDbEndpointURL, getEndpointURL } from "@/utils"
import { emailFormSchema } from "@/zod/forms/email/email-form-schema"

export const createQrCodeEmailAction = authUserActionClient
  .schema(emailFormSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput, ctx }) => {
    const { email, subject, message, style, title } = parsedInput
    const { user } = ctx

    const qrCodeData = await db.transaction(async (tx) => {
      //  creating a qr code data
      const [data] = await tx
        .insert(qrCode)
        .values({
          title,
          type: "email",
          userId: user.id!,
          endpoint: getEmailDbEndpointURL(email, subject, message),
        })
        .returning()

      await Promise.all([
        // create a desired form data
        tx.insert(qrEmail).values({
          message,
          email,
          subject,
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

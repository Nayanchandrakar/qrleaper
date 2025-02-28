"use server"

import { revalidatePath } from "next/cache"
import { flattenValidationErrors } from "next-safe-action"

import { authUserActionClient } from "@/lib/action/safe-action"
import { db } from "@/database/db"
import { qrCode, qrCodeStyle } from "@/database/schema"
import { qrFile } from "@/database/schema/qr-variations"
import { getEndpointURL, getFileDbEndpointURL } from "@/utils"
import { fileFormSchema } from "@/zod/forms/file/file-form-schema"
import { throwSubscriptionError } from "@/lib/action/throw-subscription-error"
import { incrementQrSubscriptionCountByUserId } from "@/app/actions/helpers/subscription/utils"
import { colorType } from "@/types/type"

export const createFileQrCodeAction = authUserActionClient
  .schema(fileFormSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .use(throwSubscriptionError)
  .action(async ({ parsedInput, ctx }) => {
    const { fileName, style, title } = parsedInput
    const { user } = ctx

    const qrCodeData = await db.transaction(async (tx) => {
      //  creating a qr code data
      const [data] = await tx
        .insert(qrCode)
        .values({
          title,
          type: "file",
          userId: user.id!,
          endpoint: getFileDbEndpointURL(fileName),
        })
        .returning()

      await Promise.all([
        // create a desired form data
        tx.insert(qrFile).values({
          fileId: fileName,
          qrCodeId: data.id,
        }),

        // insert qr code styling data with qrCode id
        tx.insert(qrCodeStyle).values({
          qrCodeId: data.id,
          colors: style.colors,
          colorType: style.colorType as colorType,
          rotation: style.rotation,
          hasFrame: !!style.hasFrame,
          shape: style.shape,
          ...(style.bottomInput && { bottomText: style.bottomInput }),
          ...(style.topInput && { topText: style.topInput }),
          ...(style.image && { logo: style.image }),
        }),
      ])

      incrementQrSubscriptionCountByUserId(ctx.user.id!)
      return data
    })

    revalidatePath("/dashboard/qr-codes")

    return { endpoint: getEndpointURL(qrCodeData.id) as string }
  })

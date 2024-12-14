"use server"

import { revalidatePath } from "next/cache"
import { flattenValidationErrors } from "next-safe-action"

import { db } from "@/database/db"
import { getEndpointURL } from "@/utils"
import { qrCode, qrCodeStyle } from "@/database/schema"
import { qrLink } from "@/database/schema/qr-variations"
import { authUserActionClient } from "@/lib/action/safe-action"
import { designFormSchema } from "@/zod/forms/design/design-form-schema"
import { throwSubscriptionError } from "@/lib/action/throw-subscription-error"
import { incrementQrSubscriptionCountByUserId } from "@/app/actions/helpers/subscription/utils"

export const createQrCodeAction = authUserActionClient
  .schema(designFormSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .use(throwSubscriptionError)
  .action(async ({ parsedInput, ctx }) => {
    const { link, style, title } = parsedInput
    const { user } = ctx

    const qrCodeData = await db.transaction(async (tx) => {
      //  creating a qr code data
      const [data] = await tx
        .insert(qrCode)
        .values({
          title,
          type: "link",
          userId: user.id!,
          endpoint: link,
        })
        .returning()

      await Promise.all([
        // create a desired form data
        tx.insert(qrLink).values({
          link,
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
      incrementQrSubscriptionCountByUserId(ctx.user.id!)
      return data
    })

    revalidatePath("/dashboard/qr-codes")

    return { endpoint: getEndpointURL(qrCodeData.id) as string }
  })

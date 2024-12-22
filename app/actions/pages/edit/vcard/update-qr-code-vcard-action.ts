"use server"

import { eq } from "drizzle-orm"
import { flattenValidationErrors } from "next-safe-action"

import { db } from "@/database/db"
import { qrCode, qrCodeStyle } from "@/database/schema"
import { qrVirtualCard } from "@/database/schema/qr-variations"
import { authUserActionClient } from "@/lib/action/safe-action"
import { getQrCodeByUserIdAndIdWithType } from "@/app/actions/utils"
import { throwSubscriptionEditError } from "@/lib/action/throw-subscription-error"
import { vCardEditFormSchema } from "@/zod/pages/edit/vcard/vcard-edit-form-schema"

export const updateQrCodeVcardAction = authUserActionClient
  .schema(vCardEditFormSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .use(throwSubscriptionEditError)
  .action(async ({ parsedInput, ctx }) => {
    const { id, title, style, ...remainingInput } = parsedInput
    const { user } = ctx

    const data = await getQrCodeByUserIdAndIdWithType(user.id!, id, "vcard")

    if (!data) {
      throw new Error("No QR Code found to update with this id")
    }

    await db.transaction(async (tx) => {
      Promise.all([
        // update a desired form data
        tx.update(qrCode).set({ title }).where(eq(qrCode.id, id)),

        tx
          .update(qrVirtualCard)
          .set(remainingInput)
          .where(eq(qrVirtualCard.qrCodeId, id)),

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

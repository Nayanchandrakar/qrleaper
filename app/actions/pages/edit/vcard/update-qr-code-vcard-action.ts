"use server"

import { eq } from "drizzle-orm"

import { db } from "@/database/db"
import { updateFile } from "@/app/actions/file/utils"
import { qrCode, qrCodeStyle } from "@/database/schema"
import { qrVirtualCard } from "@/database/schema/qr-variations"
import { authUserActionClient } from "@/lib/action/safe-action"
import { getQrCodeByUserIdAndIdWithType } from "@/app/actions/utils"
import { throwSubscriptionEditError } from "@/lib/action/throw-subscription-error"
import { vCardEditFormSchema } from "@/zod/pages/edit/vcard/vcard-edit-form-schema"

export const updateQrCodeVcardAction = authUserActionClient
  .use(async ({ next, clientInput }) => {
    // @ts-ignore
    const { formData, ...inputData } = clientInput

    const { data, success } = vCardEditFormSchema.safeParse({
      profileImage: formData.get("profileImage"),
      ...inputData,
    })

    if (!success) throw new Error("Invalid Input Provided")

    return next({
      ctx: { parsedInput: data },
    })
  })
  .use(throwSubscriptionEditError)
  .action(async ({ ctx }) => {
    const { id, title, style, profileImage, ...remainingInput } =
      ctx.parsedInput

    const { user } = ctx

    const data = await getQrCodeByUserIdAndIdWithType(user.id!, id, "vcard")

    if (!data) {
      throw new Error("No QR Code found to update with this id")
    }

    let response = null

    // Only update profile image when a new Object file is provided
    if (typeof profileImage === "object") {
      const [oldImageSrc] = await db
        .select({ profileImage: qrVirtualCard.profileImage })
        .from(qrVirtualCard)
        .where(eq(qrVirtualCard.qrCodeId, data.id))

      if (oldImageSrc.profileImage) {
        response = await updateFile(oldImageSrc.profileImage, profileImage)
      }
    }

    await db.transaction(async (tx) => {
      Promise.all([
        tx.update(qrCode).set({ title }).where(eq(qrCode.id, id)),

        tx
          .update(qrVirtualCard)
          .set({
            ...(response?.newFileName && {
              profileImage: response.newFileName,
            }),
            ...remainingInput,
          })
          .where(eq(qrVirtualCard.qrCodeId, id)),

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

"use server"

import { eq } from "drizzle-orm"
import { db } from "@/database/db"
import {
  deleteBulkFiles,
  updateFile,
  uploadBulkFiles,
} from "@/app/actions/file/utils"
import { qrCode, qrCodeStyle } from "@/database/schema"
import { qrVirtualCard } from "@/database/schema/qr-variations"
import { authUserActionClient } from "@/lib/action/safe-action"
import { getVcardWithProfileImageAndImageByQrCodeId } from "@/app/actions/utils"
import { throwSubscriptionEditError } from "@/lib/action/throw-subscription-error"
import { vCardEditFormSchema } from "@/zod/pages/edit/vcard/vcard-edit-form-schema"
import { throwQrCodeNotFoundError } from "@/lib/action/throw-qr-code-error"
import { throwUserNameError } from "@/lib/action/throw-user-name-error"
import { colorType } from "@/types/type"

export const updateQrCodeVcardAction = authUserActionClient
  .use(async ({ next, clientInput }) => {
    // @ts-ignore
    const { formData, ...inputData } = clientInput

    // Validate form data using schema
    const { data: validatedData, success } = vCardEditFormSchema.safeParse({
      profileImage: formData.get("profileImage"),
      images: formData.getAll("images"),
      ...inputData,
    })

    if (!success) throw new Error("Invalid Input Provided")

    return next({
      ctx: { parsedInput: validatedData },
    })
  })
  .use(throwSubscriptionEditError)
  .use(async (client) => throwQrCodeNotFoundError({ ...client, type: "vcard" }))
  .use(async ({ next, ctx }) =>
    throwUserNameError({ next, ctx, isEditAction: true })
  )
  .action(async ({ ctx }) => {
    const { data, parsedInput } = ctx

    const { id, title, style, images, profileImage, ...otherFields } =
      parsedInput

    const vCardData = await getVcardWithProfileImageAndImageByQrCodeId(data.id)

    // Initialize variables for tracking changes
    let updatedProfileImage = vCardData.profileImage
    const existingImageUrls = new Set(vCardData.images || [])
    const updatedImageUrls = new Set(
      images.filter((item) => typeof item === "string")
    )
    const newFiles = images.filter((item) => typeof item === "object")
    const filesToDelete = [...existingImageUrls].filter(
      (url) => !updatedImageUrls.has(url)
    )

    // Update profile image if a new file is provided
    if (typeof profileImage === "object" && vCardData.profileImage) {
      const uploadResult = await updateFile(
        vCardData.profileImage,
        profileImage
      )
      updatedProfileImage = uploadResult.newFileName
    }

    // Upload new files and combine with existing URLs
    const uploadedFilePaths =
      newFiles.length > 0 ? await uploadBulkFiles(newFiles) : []
    const finalImageUrls = [...updatedImageUrls, ...uploadedFilePaths]

    await db.transaction(async (tx) => {
      await Promise.all([
        tx.update(qrCode).set({ title }).where(eq(qrCode.id, id)),

        tx
          .update(qrVirtualCard)
          .set({
            images: finalImageUrls,
            ...(updatedProfileImage && { profileImage: updatedProfileImage }),
            ...otherFields,
          })
          .where(eq(qrVirtualCard.qrCodeId, id)),

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

    // Delete obsolete files if any
    if (filesToDelete.length > 0) {
      await deleteBulkFiles(filesToDelete)
    }

    return { ok: true }
  })

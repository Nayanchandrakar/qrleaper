"use server"

import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { flattenValidationErrors } from "next-safe-action"

import { db } from "@/database/db"
import { idSchema } from "@/zod/utils"
import { qrCode } from "@/database/schema"
import type { qrType } from "@/types/db-types"
import { authUserActionClient } from "@/lib/action/safe-action"
import { decrementQrSubscriptionCountByUserId } from "@/app/actions/helpers/subscription/utils"
import { deleteFile } from "@/app/actions/file/deleteFile"
import {
  getQrCodeWithStyleByUserIdAndId,
  getQrFileByQrCodeId,
  getVCardFileDataByQrCodeId,
} from "@/app/actions/utils"

export const deleteQrCodeAction = authUserActionClient
  .schema(idSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput, ctx }) => {
    const data = await getQrCodeWithStyleByUserIdAndId(
      ctx.user.id!,
      parsedInput.id
    )

    if (!data) throw new Error("Invalid QR Code Id Provided!")

    const qrCodeId = data.qr_code.id
    const qrCodeType = data.qr_code.type
    const promises: Promise<unknown>[] = []
    const logoSrc = data.qr_code_style?.logo

    await handleFileDeletion(qrCodeType, qrCodeId, promises)

    if (logoSrc) promises.push(deleteFile(logoSrc))

    // Database related query
    promises.push(db.delete(qrCode).where(eq(qrCode.id, qrCodeId)))
    promises.push(decrementQrSubscriptionCountByUserId(ctx.user.id!))

    await Promise.all(promises)

    revalidatePath("/dashboard/qr-codes")

    return { ok: true }
  })

const handleFileDeletion = async (
  qrCodeType: qrType,
  qrCodeId: string,
  promises: Promise<unknown>[]
) => {
  if (qrCodeType === "file") {
    const files = await getQrFileByQrCodeId(qrCodeId)
    if (files?.fileId) promises.push(deleteFile(files.fileId))
  } else if (qrCodeType === "vcard") {
    const files = await getVCardFileDataByQrCodeId(qrCodeId)

    if (files) {
      const sourceUrl = [files.profileImage, ...(files.images || [])]
      if (sourceUrl.length > 0) {
        sourceUrl.forEach((src) => {
          promises.push(deleteFile(src))
        })
      }
    }
  }
}

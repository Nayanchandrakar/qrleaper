"use server"

import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { flattenValidationErrors } from "next-safe-action"

import { db } from "@/database/db"
import { idSchema } from "@/zod/utils"
import { qrCode } from "@/database/schema"
import { authUserActionClient } from "@/lib/action/safe-action"
import { decrementQrSubscriptionCountByUserId } from "@/app/actions/helpers/subscription/utils"
import { deleteFile } from "@/app/actions/file/deleteFile"
import {
  getQrCodeWithStyleByUserIdAndId,
  getQrFileByQrCodeId,
} from "@/app/actions/utils"

// Server action to remove QR Code
export const deleteQrCodeAction = authUserActionClient
  .schema(idSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput, ctx }) => {
    const { id } = parsedInput

    const data = await getQrCodeWithStyleByUserIdAndId(ctx.user.id!, id)

    if (!data) {
      throw new Error("Invalid QR Code Id Provided!")
    }

    const { qr_code, qr_code_style } = data

    // Delete the file from s3 bucket
    if (qr_code.type === "file") {
      const file = await getQrFileByQrCodeId(qr_code.id)
      await deleteFile(file?.fileId!)
    }

    // Delete the image file from the bucket
    if (qr_code_style?.logo) {
      await deleteFile(qr_code_style.logo)
    }

    await Promise.all([
      db
        .delete(qrCode)
        .where(and(eq(qrCode.userId, ctx.user.id!), eq(qrCode.id, id))),
      decrementQrSubscriptionCountByUserId(ctx.user.id!),
    ])

    revalidatePath("/dashboard/qr-codes")

    return { ok: true }
  })

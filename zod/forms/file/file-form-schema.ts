import { z } from "zod"

import { qrStyleSchema, qrTitleSchema } from "@/zod/utils"
import { max_file_upload_size } from "@/constants/qr/file"

export const fileUploadFormSchema = z.object({
  fileName: z.string().min(2).optional().nullable(),
  file: z
    .custom<File>((value) => value instanceof File, { message: "Invalid file" })
    .refine((file) => file.size <= max_file_upload_size, {
      message: "File size must not exceed 20MB",
    }),
})

export type fileUploadFormSchemaType = z.infer<typeof fileUploadFormSchema>

export const fileFormSchema = z.object({
  title: qrTitleSchema.shape.title,
  fileName: z
    .string()
    .min(1, {
      message: "Upload a file to proceed!",
    })
    .max(350),
  style: qrStyleSchema,
})

export type fileFormSchemaType = z.infer<typeof fileFormSchema>

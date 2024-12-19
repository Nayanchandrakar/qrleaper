import { z } from "zod"
import { idSchema } from "@/zod/utils"
import { max_logo_upload_size } from "@/constants/qr/file"

export const logoFileFormSchema = z.object({
  image: z.string().min(2).optional().nullable(),
  id: idSchema.shape.id.optional().nullable(),
  file: z
    .custom<File>((value) => value instanceof File, { message: "Invalid file" })
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/svg+xml"].includes(file.type),
      {
        message: "File must be a JPEG or PNG",
      }
    )
    .refine((file) => file.size <= max_logo_upload_size, {
      message: "File size must not exceed 2MB",
    }),
})

export type logoFileFormSchemaType = z.infer<typeof logoFileFormSchema>

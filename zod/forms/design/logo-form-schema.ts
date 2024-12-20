import { z } from "zod"

import { idSchema } from "@/zod/utils"
import { createFileSchema } from "@/zod/utils/file-utils"
import { logo_file_type } from "@/constants/qr/file-type"
import { max_logo_upload_size } from "@/constants/qr/file"

export const logoFileFormSchema = z.object({
  image: z.string().min(2).optional().nullable(),
  id: idSchema.shape.id.optional().nullable(),
  file: createFileSchema(logo_file_type, max_logo_upload_size),
})

export type logoFileFormSchemaType = z.infer<typeof logoFileFormSchema>

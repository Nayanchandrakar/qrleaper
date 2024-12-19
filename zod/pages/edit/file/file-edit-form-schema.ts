import { z } from "zod"

import { idSchema } from "@/zod/utils"
import { fileFormSchema } from "@/zod/forms/file/file-form-schema"

export const fileEditFormSchema = fileFormSchema.extend({
  id: idSchema.shape.id,
})

export type fileEditFormSchemaType = z.infer<typeof fileEditFormSchema>

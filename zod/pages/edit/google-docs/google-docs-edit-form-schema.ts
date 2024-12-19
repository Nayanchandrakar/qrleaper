import { z } from "zod"

import { googleDocsFormSchema } from "@/zod/forms/google-docs/google-docs-form-schema"
import { idSchema } from "@/zod/utils"

export const googleDocsEditFormSchema = googleDocsFormSchema.extend({
  id: idSchema.shape.id,
})

export type googleDocsEditFormSchemaType = z.infer<
  typeof googleDocsEditFormSchema
>

import { z } from "zod"

import { idSchema } from "@/zod/utils"
import { emailFormSchema } from "@/zod/forms/email/email-form-schema"

export const emailEditFormSchema = emailFormSchema.extend({
  id: idSchema.shape.id,
})

export type emailEditFormSchemaType = z.infer<typeof emailEditFormSchema>

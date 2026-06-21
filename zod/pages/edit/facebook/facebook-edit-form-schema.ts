import type { z } from "zod"

import { facebookFormSchema } from "@/zod/forms/facebook/facebook-form-schema"
import { idSchema } from "@/zod/utils"

export const facebookEditFormSchema = facebookFormSchema.extend({
  id: idSchema.shape.id
})

export type facebookEditFormSchemaType = z.infer<typeof facebookEditFormSchema>

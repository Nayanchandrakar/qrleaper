import { z } from "zod"

import { instagramFormSchema } from "@/zod/forms/instagram/instagram-form-schema"
import { idSchema } from "@/zod/utils"

export const instagramEditFormSchema = instagramFormSchema.extend({
  id: idSchema.shape.id,
})

export type instagramEditFormSchemaType = z.infer<
  typeof instagramEditFormSchema
>

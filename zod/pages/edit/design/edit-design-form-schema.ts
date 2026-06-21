import type { z } from "zod"

import { designFormSchema } from "@/zod/forms/design/design-form-schema"
import { idSchema } from "@/zod/utils"

export const editDesignFormSchema = designFormSchema.extend({
  id: idSchema.shape.id
})

export type editDesignFormSchemaType = z.infer<typeof editDesignFormSchema>

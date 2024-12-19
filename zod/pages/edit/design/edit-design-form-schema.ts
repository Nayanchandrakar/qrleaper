import { z } from "zod"

import { idSchema } from "@/zod/utils"
import { designFormSchema } from "@/zod/forms/design/design-form-schema"

export const editDesignFormSchema = designFormSchema.extend({
  id: idSchema.shape.id,
})

export type editDesignFormSchemaType = z.infer<typeof editDesignFormSchema>

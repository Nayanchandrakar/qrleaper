import { z } from "zod"

import { qrStyleSchema, qrTitleSchema } from "@/zod/utils"

export const designFormSchema = z.object({
  title: qrTitleSchema.shape.title,
  link: z.string().url().min(1).max(250),
  style: qrStyleSchema
})

export type designFormSchemaType = z.infer<typeof designFormSchema>

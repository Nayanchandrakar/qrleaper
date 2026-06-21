import { z } from "zod"

import { emailSchema, qrStyleSchema, qrTitleSchema } from "@/zod/utils"

export const emailFormSchema = z.object({
  title: qrTitleSchema.shape.title,
  email: emailSchema.shape.email,
  subject: z
    .string()
    .max(150, {
      message: "max 150 characters accpeted"
    })
    .optional(),
  message: z
    .string()
    .max(256, {
      message: "max 250 characters accepted"
    })
    .optional(),
  style: qrStyleSchema
})

export type emailFormSchemaType = z.infer<typeof emailFormSchema>

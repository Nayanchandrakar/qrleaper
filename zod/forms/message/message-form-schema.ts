import { z } from "zod"

import { regexPatterns } from "@/constants/regex/patterns"
import { qrStyleSchema, qrTitleSchema } from "@/zod/utils"

export const messageFormSchema = z.object({
  title: qrTitleSchema.shape.title,
  phoneNumber: z.string().regex(regexPatterns.phoneRegex, {
    message: "Invalid phone number provided"
  }),
  message: z
    .string()
    .max(256, {
      message: "max 250 characters accepted"
    })
    .optional(),
  style: qrStyleSchema
})

export type messageFormSchemaType = z.infer<typeof messageFormSchema>

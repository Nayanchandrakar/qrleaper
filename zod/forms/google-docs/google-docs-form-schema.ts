import { z } from "zod"

import { regexPatterns } from "@/constants/regex/patterns"
import { qrStyleSchema, qrTitleSchema } from "@/zod/utils"

export const googleDocsFormSchema = z.object({
  title: qrTitleSchema.shape.title,
  googleDocUrl: z.string().url().regex(regexPatterns.googleDocs, {
    message: "Invalid google docs URL provided"
  }),
  style: qrStyleSchema
})

export type googleDocsFormSchemaType = z.infer<typeof googleDocsFormSchema>

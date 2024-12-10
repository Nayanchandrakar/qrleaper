import { z } from "zod"
import { qrStyleSchema, qrTitleSchema } from "@/zod/utils"
import { regexPatterns } from "@/constants/regex/patterns"

export const instagramFormSchema = z.object({
  title: qrTitleSchema.shape.title,
  instagram: z
    .string()
    .min(4, {
      message: "minimum 4 characters required",
    })
    .max(20, {
      message: "max 20 characters long user name is accepted",
    })
    .regex(regexPatterns.instagram, {
      message: "please include @ in the username starting",
    }),
  style: qrStyleSchema,
})

export type instagramFormSchemaType = z.infer<typeof instagramFormSchema>

import { z } from "zod"
import { qrStyleSchema, qrTitleSchema } from "@/zod/utils"
import { regexPatterns } from "@/constants/regex/patterns"

export const youtubeFormSchema = z.object({
  title: qrTitleSchema.shape.title,
  youtubeUrl: z
    .string()
    .url({
      message: "Invalid youtube URL is provided",
    })
    .regex(regexPatterns.youtube, { message: "Invalid youtube URL provided" }),
  style: qrStyleSchema,
})

export type youtubeFormSchemaType = z.infer<typeof youtubeFormSchema>

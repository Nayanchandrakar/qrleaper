import { z } from "zod"
import { youtubeFormSchema } from "@/zod/forms/youtube/youtube-form-schema"
import { idSchema } from "@/zod/utils"

export const youtubeEditFormSchema = youtubeFormSchema.extend({
  id: idSchema.shape.id,
})

export type youtubeEditFormSchemaType = z.infer<typeof youtubeEditFormSchema>

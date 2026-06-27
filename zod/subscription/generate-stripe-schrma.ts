import { z } from "zod"

import { idSchema } from "@/zod/utils"

export const generateStripeSchema = z.object({
  priceId: idSchema.shape.id,
  optionalEndpoint: z.string().optional()
})

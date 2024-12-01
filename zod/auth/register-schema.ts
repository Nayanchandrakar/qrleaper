import { z } from "zod"
import { emailSchema, passwordSchema } from "@/zod/utils"

export const registerFormSchema = z.object({
  name: z.string().min(1).max(20),
  email: emailSchema.shape.email,
  password: passwordSchema.shape.password,
})

export type registerFormSchemaType = z.infer<typeof registerFormSchema>

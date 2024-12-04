import { z } from "zod"
import { passwordSchema } from "@/zod/utils"

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1),
    password: passwordSchema.shape.password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password must match password",
    path: ["confirmPassword"],
  })

export type resetPasswordSchemaType = z.infer<typeof resetPasswordSchema>

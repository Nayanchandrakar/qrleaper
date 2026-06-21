import { z } from "zod"

import { emailSchema, passwordSchema } from "@/zod/utils"

export const emailChangeSchema = z.object({
  currentPassword: passwordSchema.shape.password,
  newEmail: emailSchema.shape.email
})

export const verifyEmailChangeSchema = z.object({
  newEmail: emailSchema.shape.email,
  token: z.string().min(1).max(6)
})

export type emailChangeSchemaType = z.infer<typeof emailChangeSchema>
export type verifyEmailChangeSchemaType = z.infer<
  typeof verifyEmailChangeSchema
>

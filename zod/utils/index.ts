import { z } from "zod"
import { regexPatterns } from "@/constants/regex/patterns"

export const emailSchema = z.object({
  email: z.string().email({
    message: "Invalid Email address provided",
  }),
})

export const passwordSchema = z.object({
  password: z
    .string()
    .min(1, { message: "Must have at least 1 character" })
    .regex(regexPatterns.passwordRegex, {
      message: "Password: 8+ chars, 1 upper, 1 lower, 1 number, 1 special",
    })
    .max(12),
})

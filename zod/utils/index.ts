import { z } from "zod"
import { regexPatterns } from "@/constants/regex/patterns"
import { colorsList } from "@/constants/qr/colors"

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

export const qrTitleSchema = z.object({
  title: z.string().min(3).max(20),
})

export const idSchema = z.object({
  id: z.string().min(2).max(100),
})

export const qrStyleSchema = z.object({
  color: z.string().min(1).max(20).default(colorsList[0]),
  bottomInput: z.string().max(30).optional(),
  topInput: z.string().max(30).optional(),
  shape: z.string().min(3).max(20).default("square"),
  hasFrame: z.boolean().default(false).optional(),
  image: z.string().optional(),
})

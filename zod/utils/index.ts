import { z } from "zod";

import { colorsList } from "@/constants/qr/colors";
import { regexPatterns } from "@/constants/regex/patterns";

export const emailSchema = z.object({
	email: z.string().email({
		message: "Invalid Email address provided",
	}),
});

export const passwordSchema = z.object({
	password: z
		.string()
		.min(1, { message: "Must have at least 1 character" })
		.regex(regexPatterns.passwordRegex, {
			message: "Password: 8+ chars, 1 upper, 1 lower, 1 number, 1 special",
		})
		.max(12),
});

export const qrTitleSchema = z.object({
	title: z
		.string()
		.min(3, { message: "The QR title must be at least 3 characters long." })
		.max(20),
});

export const idSchema = z.object({
	id: z.string().min(2).max(100),
});

export const qrStyleSchema = z.object({
	colors: z.array(z.string().default(colorsList[0])).min(1).max(2),
	rotation: z.coerce.number().min(0).max(180).default(0),
	colorType: z.string().min(1).max(20).default("linear"),
	bottomInput: z.string().max(30).optional(),
	topInput: z.string().max(30).optional(),
	shape: z.string().min(3).max(20).default("square"),
	hasFrame: z.boolean().default(false).optional(),
	image: z.string().optional(),
});

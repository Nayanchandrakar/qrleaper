import { passwordSchema } from "@/zod/utils";
import { z } from "zod";

export const resetPasswordSchema = z
	.object({
		token: z.string().min(1),
		password: passwordSchema.shape.password,
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Confirm password must match password",
		path: ["confirmPassword"],
	});

export type resetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

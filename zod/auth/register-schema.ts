import { emailSchema, passwordSchema } from "@/zod/utils";
import { z } from "zod";

export const registerFormSchema = z.object({
	name: z.string().min(1).max(20),
	email: emailSchema.shape.email,
	password: passwordSchema.shape.password,
});

export type registerFormSchemaType = z.infer<typeof registerFormSchema>;

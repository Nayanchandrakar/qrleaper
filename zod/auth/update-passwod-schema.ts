import { passwordSchema } from "@/zod/utils";
import { z } from "zod";

export const updatePasswordSchema = z
	.object({
		currentPassword: passwordSchema.shape.password,
		newPassword: passwordSchema.shape.password,
	})
	.refine((data) => data.currentPassword !== data.newPassword, {
		message: "New password must not match current password",
		path: ["newPassword"],
	});

export type updatePasswordSchemaType = z.infer<typeof updatePasswordSchema>;

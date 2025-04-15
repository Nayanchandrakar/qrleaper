import { z } from "zod";

import { emailFormSchema } from "@/zod/forms/email/email-form-schema";
import { idSchema } from "@/zod/utils";

export const emailEditFormSchema = emailFormSchema.extend({
	id: idSchema.shape.id,
});

export type emailEditFormSchemaType = z.infer<typeof emailEditFormSchema>;

import { z } from "zod";

import { fileFormSchema } from "@/zod/forms/file/file-form-schema";
import { idSchema } from "@/zod/utils";

export const fileEditFormSchema = fileFormSchema.extend({
	id: idSchema.shape.id,
});

export type fileEditFormSchemaType = z.infer<typeof fileEditFormSchema>;

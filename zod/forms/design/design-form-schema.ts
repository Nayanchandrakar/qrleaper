import { qrStyleSchema, qrTitleSchema } from "@/zod/utils";
import { z } from "zod";

export const designFormSchema = z.object({
	title: qrTitleSchema.shape.title,
	link: z.string().url().min(1).max(250),
	style: qrStyleSchema,
});

export type designFormSchemaType = z.infer<typeof designFormSchema>;

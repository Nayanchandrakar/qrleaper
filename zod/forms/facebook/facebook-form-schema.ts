import { regexPatterns } from "@/constants/regex/patterns";
import { qrStyleSchema, qrTitleSchema } from "@/zod/utils";
import { z } from "zod";

export const facebookFormSchema = z.object({
	title: qrTitleSchema.shape.title,
	facebookUrl: z
		.string()
		.url({
			message: "Invalid URL provided",
		})
		.regex(regexPatterns.facebook, {
			message: "Invalid facebook URL provided",
		}),
	style: qrStyleSchema,
});

export type facebookFormSchemaType = z.infer<typeof facebookFormSchema>;

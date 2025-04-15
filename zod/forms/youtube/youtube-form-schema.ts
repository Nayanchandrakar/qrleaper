import { regexPatterns } from "@/constants/regex/patterns";
import { qrStyleSchema, qrTitleSchema } from "@/zod/utils";
import { z } from "zod";

export const youtubeFormSchema = z.object({
	title: qrTitleSchema.shape.title,
	youtubeUrl: z
		.string()
		.url({
			message: "Invalid youtube URL is provided",
		})
		.regex(regexPatterns.youtube, { message: "Invalid youtube URL provided" }),
	style: qrStyleSchema,
});

export type youtubeFormSchemaType = z.infer<typeof youtubeFormSchema>;

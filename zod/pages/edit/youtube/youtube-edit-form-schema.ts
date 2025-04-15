import { youtubeFormSchema } from "@/zod/forms/youtube/youtube-form-schema";
import { idSchema } from "@/zod/utils";
import { z } from "zod";

export const youtubeEditFormSchema = youtubeFormSchema.extend({
	id: idSchema.shape.id,
});

export type youtubeEditFormSchemaType = z.infer<typeof youtubeEditFormSchema>;

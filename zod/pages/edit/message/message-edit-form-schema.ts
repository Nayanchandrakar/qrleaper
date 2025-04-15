import { z } from "zod";

import { messageFormSchema } from "@/zod/forms/message/message-form-schema";
import { idSchema } from "@/zod/utils";

export const messageEditFormSchema = messageFormSchema.extend({
	id: idSchema.shape.id,
});

export type messageEditFormSchemaType = z.infer<typeof messageEditFormSchema>;

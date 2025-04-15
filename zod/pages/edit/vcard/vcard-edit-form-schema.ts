import { z } from "zod";

import {
	max_profile_image_upload_size,
	max_vcard_image_upload_size,
} from "@/constants/qr/file";
import { profile_image_type } from "@/constants/qr/file-type";
import { virtualCardFormSchema } from "@/zod/forms/vcard/virtual-card-form-schema";
import { idSchema } from "@/zod/utils";
import { createFileSchema } from "@/zod/utils/file-utils";

export const vCardEditFormSchema = virtualCardFormSchema.extend({
	id: idSchema.shape.id,
	profileImage: z.union([
		createFileSchema(profile_image_type, max_profile_image_upload_size),
		z.string().min(5).max(100).optional().or(z.literal("")),
	]),
	images: z
		.array(
			z.union([
				createFileSchema(profile_image_type, max_vcard_image_upload_size),
				z.string().min(5).max(100),
			]),
		)
		.optional()
		.default([]),
});

export type vCardEditFormSchemaType = z.infer<typeof vCardEditFormSchema>;

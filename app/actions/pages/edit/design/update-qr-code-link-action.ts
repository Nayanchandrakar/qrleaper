"use server";

import { eq } from "drizzle-orm";
import { flattenValidationErrors } from "next-safe-action";
import { z } from "zod";

import { db } from "@/database/db";
import { qrCode, qrCodeStyle } from "@/database/schema";
import { qrLink } from "@/database/schema/qr-variations";
import { authUserActionClient } from "@/lib/action/safe-action";
import { throwQrCodeNotFoundError } from "@/lib/action/throw-qr-code-error";
import { throwSubscriptionEditError } from "@/lib/action/throw-subscription-error";
import type { colorType } from "@/types/type";
import { designFormSchema } from "@/zod/forms/design/design-form-schema";

export const updateQrCodeLinkAction = authUserActionClient
	.schema(
		designFormSchema.extend({
			id: z.string().min(10),
		}),
		{
			handleValidationErrorsShape: async (ve) =>
				flattenValidationErrors(ve).fieldErrors,
		},
	)
	.use(throwSubscriptionEditError)
	.use(async (client) => throwQrCodeNotFoundError({ ...client, type: "link" }))
	.action(async ({ parsedInput }) => {
		const { link, style, title, id } = parsedInput;

		await db.transaction(async (tx) => {
			Promise.all([
				// update a desired form data
				tx
					.update(qrCode)
					.set({ title, endpoint: link })
					.where(eq(qrCode.id, id)),

				tx.update(qrLink).set({ link }).where(eq(qrLink.qrCodeId, id)),

				// update qr code styling data with qrCode id
				tx
					.update(qrCodeStyle)
					.set({
						colors: style.colors,
						colorType: style.colorType as colorType,
						rotation: style.rotation,
						hasFrame: !!style.hasFrame,
						shape: style.shape,
						...(style.bottomInput && { bottomText: style.bottomInput }),
						...(style.topInput && { topText: style.topInput }),
						...(style.image && { logo: style.image }),
					})
					.where(eq(qrCodeStyle.qrCodeId, id)),
			]);
		});

		return { ok: true };
	});

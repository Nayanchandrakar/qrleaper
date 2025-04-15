"use server";

import { eq } from "drizzle-orm";
import { flattenValidationErrors } from "next-safe-action";
import { z } from "zod";

import { db } from "@/database/db";
import { qrCode, qrCodeStyle } from "@/database/schema";
import { qrFacebook } from "@/database/schema/qr-variations";
import { authUserActionClient } from "@/lib/action/safe-action";
import { throwQrCodeNotFoundError } from "@/lib/action/throw-qr-code-error";
import { throwSubscriptionEditError } from "@/lib/action/throw-subscription-error";
import { colorType } from "@/types/type";
import { facebookFormSchema } from "@/zod/forms/facebook/facebook-form-schema";

export const updateQrCodeFacebookAction = authUserActionClient
	.schema(
		facebookFormSchema.extend({
			id: z.string().min(10),
		}),
		{
			handleValidationErrorsShape: async (ve) =>
				flattenValidationErrors(ve).fieldErrors,
		},
	)
	.use(throwSubscriptionEditError)
	.use(async (client) =>
		throwQrCodeNotFoundError({ ...client, type: "facebook" }),
	)
	.action(async ({ parsedInput }) => {
		const { facebookUrl, style, title, id } = parsedInput;

		await db.transaction(async (tx) => {
			Promise.all([
				// update a desired form data
				tx
					.update(qrCode)
					.set({ title, endpoint: facebookUrl })
					.where(eq(qrCode.id, id)),

				tx
					.update(qrFacebook)
					.set({ facebookUrl })
					.where(eq(qrFacebook.qrCodeId, id)),

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

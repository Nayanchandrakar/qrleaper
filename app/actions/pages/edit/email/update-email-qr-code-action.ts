"use server";

import { eq } from "drizzle-orm";
import { flattenValidationErrors } from "next-safe-action";
import { z } from "zod";

import { db } from "@/database/db";
import { qrCode, qrCodeStyle } from "@/database/schema";
import { qrEmail } from "@/database/schema/qr-variations";
import { authUserActionClient } from "@/lib/action/safe-action";
import { throwQrCodeNotFoundError } from "@/lib/action/throw-qr-code-error";
import { throwSubscriptionEditError } from "@/lib/action/throw-subscription-error";
import { colorType } from "@/types/type";
import { getEmailDbEndpointURL } from "@/utils";
import { emailFormSchema } from "@/zod/forms/email/email-form-schema";

export const updateQrCodeEmailAction = authUserActionClient
	.schema(
		emailFormSchema.extend({
			id: z.string().min(10),
		}),
		{
			handleValidationErrorsShape: async (ve) =>
				flattenValidationErrors(ve).fieldErrors,
		},
	)
	.use(throwSubscriptionEditError)
	.use(async (client) => throwQrCodeNotFoundError({ ...client, type: "email" }))
	.action(async ({ parsedInput }) => {
		const { email, subject, message, style, title, id } = parsedInput;

		await db.transaction(async (tx) => {
			Promise.all([
				// update a desired form data
				tx
					.update(qrCode)
					.set({
						title,
						endpoint: getEmailDbEndpointURL(email, subject, message),
					})
					.where(eq(qrCode.id, id)),

				tx
					.update(qrEmail)
					.set({ message, subject, email })
					.where(eq(qrEmail.qrCodeId, id)),

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
